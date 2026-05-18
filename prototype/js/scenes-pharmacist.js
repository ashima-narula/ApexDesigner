// MedFile prototype — Pharmacist role scenes.
// Flow: scan patient script -> review -> Dispense -> show return QR for patient to scan.

const Pharmacist = (() => {
  const screen = () => document.getElementById('screen');
  const state = {
    meds: [],
    queue: [],       // recently scanned scripts
    scanning: null,  // active scanner cleanup
    pharmacyName: 'Lucky Pharmacy, Toowong',
  };

  async function bootstrap() {
    state.meds = await loadMeds();
    state.queue = Storage.load(Storage.keys.pharmaQueue, []);
    renderHome();
  }

  function saveQueue() {
    Storage.save(Storage.keys.pharmaQueue, state.queue);
  }

  function renderHome() {
    const el = screen();
    el.innerHTML = `
      <h1>Dispense queue</h1>
      <p class="muted">${state.queue.length === 0 ? 'No scripts scanned yet.' : `${state.queue.length} script${state.queue.length === 1 ? '' : 's'} in queue.`}</p>
      <button class="btn pharmacist" id="scan">Scan patient script</button>

      <h3 style="margin-top:24px">Recent</h3>
      ${state.queue.length === 0 ? `<p class="muted">Patient phones present a QR on the script detail screen &mdash; scan it here to dispense.</p>` :
        state.queue.map((entry, idx) => `
          <div class="card tappable" data-idx="${idx}">
            <div class="row">
              <div class="grow">
                <div class="title">${entry.rx.medicationReference.display}</div>
                <div class="subtitle">For ${entry.rx.subject.display}</div>
                <div class="subtitle"><span class="badge ${entry.dispensed ? 'dispensed' : 'issued'}">${entry.dispensed ? 'dispensed' : 'pending'}</span>
                  &middot; ${fmtTime(entry.scannedAt)}</div>
              </div>
              <div>&rsaquo;</div>
            </div>
          </div>
        `).join('')
      }
    `;
    document.getElementById('scan').addEventListener('click', openScanner);
    el.querySelectorAll('[data-idx]').forEach(card => {
      card.addEventListener('click', () => renderReview(parseInt(card.dataset.idx)));
    });
  }

  function openScanner() {
    const overlay = makeViewfinder('Scan patient script');
    document.body.appendChild(overlay);
    const onClose = () => {
      if (state.scanning) { state.scanning(); state.scanning = null; }
      overlay.remove();
    };
    overlay.querySelector('.vf-close').addEventListener('click', onClose);
    state.scanning = QR.scan('qr-reader', (payload) => {
      onClose();
      handleScannedScript(payload);
    }, (err) => {
      console.warn('Scanner failed:', err);
      toast('Camera unavailable. Allow camera access and try again.');
      onClose();
    });
  }

  function handleScannedScript(payload) {
    if (!payload || payload.resourceType !== 'MedicationRequest') {
      toast('That QR isn’t a prescription.');
      return;
    }
    const existingIdx = state.queue.findIndex(e => e.rx.id === payload.id);
    let idx;
    if (existingIdx >= 0) {
      idx = existingIdx;
      state.queue[idx].rx = payload;
      state.queue[idx].scannedAt = new Date().toISOString();
    } else {
      state.queue.unshift({
        rx: payload,
        scannedAt: new Date().toISOString(),
        dispensed: false,
      });
      idx = 0;
    }
    saveQueue();
    renderReview(idx);
  }

  function renderReview(idx) {
    const el = screen();
    const entry = state.queue[idx];
    if (!entry) { renderHome(); return; }
    const rx = entry.rx;
    el.innerHTML = `
      <button class="btn secondary" id="back">&lsaquo; Back to queue</button>
      <h1>${rx.medicationReference.display}</h1>
      <p class="muted">For ${rx.subject.display} &middot; issued by ${rx.requester.display}</p>

      <div class="card">
        <h3>Dose</h3>
        <p>${rx.dosageInstruction[0].text}</p>
        ${rx.dispenseRequest?.quantity ? `<p class="muted">Quantity: ${rx.dispenseRequest.quantity.value} ${rx.dispenseRequest.quantity.unit}</p>` : ''}
        ${rx.note?.[0]?.text ? `<p class="muted">Note: ${rx.note[0].text}</p>` : ''}
        <p class="muted">Issued ${fmtTime(rx.authoredOn)}</p>
      </div>

      ${entry.dispensed ? `
        <div class="card">
          <h3>Confirmation QR</h3>
          <p class="muted">Have the patient scan this on their phone (Patient &rarr; Scan pharmacist confirmation).</p>
          <div class="qr-frame" id="confirm-qr"></div>
          <p class="muted">Dispensed ${fmtTime(entry.dispensedAt)} at ${state.pharmacyName}</p>
        </div>
        <button class="btn secondary" id="back2">Done</button>
      ` : `
        <label>Pharmacy</label>
        <input type="text" id="pharmacy-name" value="${state.pharmacyName}">
        <div class="spacer"></div>
        <button class="btn pharmacist" id="dispense">Dispense</button>
      `}
    `;
    document.getElementById('back').addEventListener('click', renderHome);
    if (entry.dispensed) {
      const confirmPayload = {
        type: 'dispense',
        rxId: rx.id,
        dispensedAt: entry.dispensedAt,
        pharmacist: entry.pharmacist || state.pharmacyName,
      };
      QR.render(document.getElementById('confirm-qr'), confirmPayload, { size: 260, level: 'M' });
      document.getElementById('back2').addEventListener('click', renderHome);
    } else {
      document.getElementById('dispense').addEventListener('click', () => {
        state.pharmacyName = document.getElementById('pharmacy-name').value.trim() || state.pharmacyName;
        entry.dispensed = true;
        entry.dispensedAt = new Date().toISOString();
        entry.pharmacist = state.pharmacyName;
        saveQueue();
        toast('Dispensed. Show confirmation QR to patient.');
        renderReview(idx);
      });
    }
  }

  // Reuse the patient-style viewfinder
  function makeViewfinder(title) {
    const wrap = document.createElement('div');
    wrap.className = 'viewfinder';
    wrap.innerHTML = `
      <div class="vf-hud">
        <div class="vf-title">${title}</div>
        <button class="vf-close">Close</button>
      </div>
      <div id="qr-reader"></div>
      <div class="vf-ring"></div>
      <div class="vf-hint">Hold the patient&rsquo;s QR inside the frame</div>
    `;
    return wrap;
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
  return { bootstrap };
})();
