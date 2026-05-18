// MedFile prototype — Patient role scenes.
// Flow: home (script list) -> scan new -> detail (allergy/interaction warning) -> take dose (camera + thumbnails) -> dose logged.
// Also: scan pharmacist return-QR to flip status to "dispensed".

const Patient = (() => {
  const screen = () => document.getElementById('screen');
  const state = {
    meds: [],
    profile: null,
    scripts: [],   // array of wrapped { rx, dispenseStatus, doseLog }
    selectedRxId: null,
    cleanup: null, // stop fn returned by QR.scan
  };

  async function ensureProfile() {
    let profile = Storage.load(Storage.keys.profile);
    if (!profile) {
      profile = await loadPatientFixture();
      Storage.save(Storage.keys.profile, profile);
    }
    return profile;
  }

  async function bootstrap() {
    state.meds = await loadMeds();
    state.profile = await ensureProfile();
    state.scripts = Storage.load(Storage.keys.scripts, []);
    const nameBadge = document.getElementById('patient-name-badge');
    if (nameBadge) nameBadge.textContent = state.profile.name;
    renderHome();
  }

  function saveScripts() {
    Storage.save(Storage.keys.scripts, state.scripts);
  }

  function renderHome() {
    state.selectedRxId = null;
    const el = screen();
    const active = state.scripts;
    el.innerHTML = `
      <h1>${state.profile.name.split(' ')[0]}&rsquo;s medications</h1>
      <p class="muted">${active.length === 0 ? 'No active prescriptions yet.' : `${active.length} active prescription${active.length === 1 ? '' : 's'}.`}</p>

      <button class="btn patient" id="scan-new">Scan new script</button>
      <button class="btn secondary" id="scan-dispense">Scan pharmacist confirmation</button>

      <h3 style="margin-top:24px">Active scripts</h3>
      ${active.length === 0 ? `<p class="muted">Once a GP issues you a prescription, it&rsquo;ll appear here.</p>` :
        active.map(s => {
          const m = findMed(state.meds, s.rx.medicationReference.id);
          const warnings = checkSafety(s.rx, state.profile, state.meds, active.filter(o => o.rx.id !== s.rx.id));
          const danger = warnings.some(w => w.severity === 'danger');
          return `
            <div class="card tappable" data-rxid="${s.rx.id}">
              <div class="row">
                <div class="grow">
                  <div class="title">${s.rx.medicationReference.display}</div>
                  <div class="subtitle">${s.rx.dosageInstruction[0].text}</div>
                  <div class="subtitle">
                    <span class="badge ${s.dispenseStatus === 'dispensed' ? 'dispensed' : 'issued'}">${s.dispenseStatus}</span>
                    ${danger ? `<span class="badge danger">Warning</span>` : ''}
                    &middot; ${s.rx.requester.display}
                  </div>
                </div>
                <div>&rsaquo;</div>
              </div>
            </div>
          `;
        }).join('')
      }

      <div class="spacer"></div>
      <p class="muted" style="font-size:12px">Profile: ${state.profile.name} &middot; allergies: ${state.profile.allergies.join(', ') || 'none'}.</p>
    `;
    document.getElementById('scan-new').addEventListener('click', () => openScanner('script'));
    document.getElementById('scan-dispense').addEventListener('click', () => openScanner('dispense'));
    el.querySelectorAll('[data-rxid]').forEach(card => {
      card.addEventListener('click', () => {
        state.selectedRxId = card.dataset.rxid;
        renderDetail();
      });
    });
  }

  function openScanner(kind) {
    const overlay = makeViewfinder(kind === 'script' ? 'Scan prescription QR' : 'Scan pharmacist confirmation');
    document.body.appendChild(overlay);
    const onClose = () => {
      if (state.cleanup) { state.cleanup(); state.cleanup = null; }
      overlay.remove();
    };
    overlay.querySelector('.vf-close').addEventListener('click', onClose);
    state.cleanup = QR.scan('qr-reader', (payload) => {
      onClose();
      if (kind === 'script') handleNewScript(payload);
      else handleDispense(payload);
    }, (err) => {
      console.warn('Scanner failed:', err);
      toast('Camera unavailable. Allow camera access and try again.');
      onClose();
    });
  }

  function handleNewScript(payload) {
    if (!payload || payload.resourceType !== 'MedicationRequest') {
      toast('That QR doesn’t look like a prescription.');
      return;
    }
    if (state.scripts.some(s => s.rx.id === payload.id)) {
      toast('That prescription is already on this phone.');
      return;
    }
    state.scripts.unshift(wrapPrescription(payload));
    saveScripts();
    toast('Prescription received.');
    state.selectedRxId = payload.id;
    renderDetail();
  }

  function handleDispense(payload) {
    if (!payload || payload.type !== 'dispense') {
      toast('That QR isn’t a pharmacist confirmation.');
      return;
    }
    const script = state.scripts.find(s => s.rx.id === payload.rxId);
    if (!script) {
      toast('No matching prescription on this phone.');
      return;
    }
    script.dispenseStatus = 'dispensed';
    script.dispensedAt = payload.dispensedAt;
    script.pharmacist = payload.pharmacist;
    saveScripts();
    toast(`Dispensed at ${payload.pharmacist || 'pharmacy'}.`);
    state.selectedRxId = script.rx.id;
    renderDetail();
  }

  function renderDetail() {
    const el = screen();
    const s = state.scripts.find(x => x.rx.id === state.selectedRxId);
    if (!s) { renderHome(); return; }
    const m = findMed(state.meds, s.rx.medicationReference.id);
    const warnings = checkSafety(s.rx, state.profile, state.meds,
      state.scripts.filter(o => o.rx.id !== s.rx.id));
    el.innerHTML = `
      <button class="btn secondary" id="back">&lsaquo; Back to medications</button>
      <h1>${s.rx.medicationReference.display}</h1>
      <p class="muted">Issued ${fmtTime(s.rx.authoredOn)} &middot; ${s.rx.requester.display}</p>

      ${warnings.map(w => `
        <div class="warning">
          <div class="w-title">${w.title}</div>
          ${w.message}
        </div>`).join('')}

      <div class="card">
        <h3>Dosage</h3>
        <p>${s.rx.dosageInstruction[0].text}</p>
        ${s.rx.dispenseRequest?.quantity ? `<p class="muted">Quantity: ${s.rx.dispenseRequest.quantity.value} ${s.rx.dispenseRequest.quantity.unit}</p>` : ''}
        ${s.rx.note?.[0]?.text ? `<p class="muted">Note: ${s.rx.note[0].text}</p>` : ''}
      </div>

      <div class="card">
        <h3>Status</h3>
        <p><span class="badge ${s.dispenseStatus === 'dispensed' ? 'dispensed' : 'issued'}">${s.dispenseStatus}</span>
        ${s.dispenseStatus === 'dispensed' ? `&middot; ${s.pharmacist || ''} ${s.dispensedAt ? '&middot; ' + fmtTime(s.dispensedAt) : ''}` : '&middot; awaiting pharmacy'}</p>
      </div>

      <div class="card">
        <h3>Share with pharmacist</h3>
        <p class="muted">Have the pharmacist tap <strong>Scan patient script</strong> and point at this QR.</p>
        <div class="qr-frame" id="rx-qr"></div>
      </div>

      <div class="card">
        <h3>Dose log</h3>
        ${s.doseLog.length === 0 ? `<p class="muted">No doses recorded yet.</p>` :
          s.doseLog.map(d => `<p>&bull; ${fmtTime(d.ts)}</p>`).join('')}
      </div>

      <button class="btn patient" id="take">Take dose</button>
    `;
    QR.render(document.getElementById('rx-qr'), s.rx, { size: 240, level: 'M' });
    document.getElementById('back').addEventListener('click', renderHome);
    document.getElementById('take').addEventListener('click', () => startTakeDose(s));
  }

  // ---- Take Dose (camera + thumbnail "recognition") ----

  function startTakeDose(script) {
    const med = findMed(state.meds, script.rx.medicationReference.id);
    if (!med) { toast('Unknown medication'); return; }
    const activeMeds = state.scripts
      .map(s => findMed(state.meds, s.rx.medicationReference.id))
      .filter(Boolean);
    // De-duplicate by id
    const uniqueById = Array.from(new Map(activeMeds.map(m => [m.id, m])).values());

    const overlay = makeViewfinder('Point at your medication', { cameraOnly: true });
    document.body.appendChild(overlay);

    const onClose = () => {
      stopCameraStream(overlay);
      overlay.remove();
    };
    overlay.querySelector('.vf-close').addEventListener('click', onClose);

    // Show a real camera feed using getUserMedia (no QR decode).
    startCameraStream(overlay).catch(err => {
      console.warn('Camera failed:', err);
      toast('Camera unavailable.');
    });

    // Thumbnail sheet
    const sheet = document.createElement('div');
    sheet.className = 'thumb-sheet';
    sheet.innerHTML = `
      <div class="sheet-title">Confirm what you&rsquo;re holding</div>
      <div class="thumb-list">
        ${uniqueById.map(m => `
          <div class="thumb" data-mid="${m.id}">
            <img src="${m.image}" alt="${m.name}" onerror="this.style.display='none'">
            <div class="thumb-name">${m.name}</div>
            <div class="thumb-strength">${m.strength}</div>
          </div>
        `).join('')}
      </div>
    `;
    overlay.appendChild(sheet);

    sheet.querySelectorAll('.thumb').forEach(t => {
      t.addEventListener('click', () => {
        const picked = uniqueById.find(m => m.id === t.dataset.mid);
        runConfidence(overlay, picked, script, onClose);
      });
    });
  }

  function runConfidence(overlay, med, script, onClose) {
    // Hide thumbnails, show confidence bar
    overlay.querySelector('.thumb-sheet')?.remove();
    const conf = document.createElement('div');
    conf.className = 'confidence';
    conf.innerHTML = `
      <div class="label">Identifying ${med.name}&hellip;</div>
      <div class="bar"><div class="bar-fill"></div></div>
    `;
    overlay.appendChild(conf);
    requestAnimationFrame(() => {
      conf.querySelector('.bar-fill').style.width = '97%';
    });
    setTimeout(() => {
      // Log dose to the right script
      if (script.rx.medicationReference.id === med.id) {
        script.doseLog.unshift({ ts: new Date().toISOString(), medId: med.id });
        saveScripts();
        toast(`Recognised: ${med.name} ${med.strength}. Dose logged.`);
      } else {
        toast(`Recognised ${med.name} but it doesn’t match this script.`);
      }
      onClose();
      renderDetail();
    }, 900);
  }

  // ---- Camera viewfinder helpers ----

  function makeViewfinder(title, { cameraOnly = false } = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'viewfinder';
    wrap.innerHTML = `
      <div class="vf-hud">
        <div class="vf-title">${title}</div>
        <button class="vf-close">Close</button>
      </div>
      ${cameraOnly
        ? '<video autoplay playsinline muted></video>'
        : '<div id="qr-reader"></div>'}
      <div class="vf-ring"></div>
      <div class="vf-hint">${cameraOnly ? 'Choose the medication you’re holding' : 'Hold the QR code inside the frame'}</div>
    `;
    return wrap;
  }

  async function startCameraStream(overlay) {
    const video = overlay.querySelector('video');
    if (!video) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    });
    video.srcObject = stream;
    overlay._stream = stream;
  }

  function stopCameraStream(overlay) {
    if (overlay._stream) {
      overlay._stream.getTracks().forEach(t => t.stop());
      overlay._stream = null;
    }
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
  return { bootstrap };
})();
