// MedFile prototype — GP role scenes.
// Flow: pick patient -> pick med -> set dose -> Issue -> show QR.

const GP = (() => {
  const screen = () => document.getElementById('screen');
  const state = {
    meds: [],
    patients: [],
    selectedPatient: null,
    selectedMed: null,
    draft: null,
  };

  // Static patient roster (the demo only has Sarah, but we show this as a list).
  const PATIENT_ROSTER = [
    { id: 'patient-sarah-chen', name: 'Sarah Chen', dob: '1989-03-14', sex: 'F', allergies: ['penicillin'] },
  ];

  async function bootstrap() {
    state.meds = await loadMeds();
    state.patients = PATIENT_ROSTER;
    state.draft = Storage.load(Storage.keys.gpDraft);
    renderPatientList();
  }

  function renderPatientList() {
    state.selectedPatient = null;
    state.selectedMed = null;
    const el = screen();
    el.innerHTML = `
      <h1>Issue a prescription</h1>
      <p class="muted">Choose a patient to write a script for.</p>
      <h3>Patients</h3>
      ${state.patients.map(p => `
        <div class="card tappable" data-pid="${p.id}">
          <div class="row">
            <div class="grow">
              <div class="title">${p.name}</div>
              <div class="subtitle">DOB ${p.dob} &middot; ${p.sex || ''}</div>
              ${p.allergies?.length ? `<div class="subtitle"><span class="badge danger">Allergy</span> ${p.allergies.join(', ')}</div>` : ''}
            </div>
            <div>&rsaquo;</div>
          </div>
        </div>
      `).join('')}
    `;
    el.querySelectorAll('[data-pid]').forEach(card => {
      card.addEventListener('click', () => {
        state.selectedPatient = state.patients.find(p => p.id === card.dataset.pid);
        renderMedPicker();
      });
    });
  }

  function renderMedPicker() {
    const el = screen();
    const p = state.selectedPatient;
    el.innerHTML = `
      <button class="btn secondary" id="back">&lsaquo; Back to patients</button>
      <h1>Choose a medication</h1>
      <p class="muted">Issuing to <strong>${p.name}</strong>.</p>
      <h3>Catalog</h3>
      ${state.meds.map(m => `
        <div class="card tappable" data-mid="${m.id}">
          <div class="row">
            <div class="grow">
              <div class="title">${m.name} ${m.strength}</div>
              <div class="subtitle">${m.form} &middot; ${m.defaultSchedule}</div>
              ${p.allergies?.some(a => m.class?.includes(a.toLowerCase()))
                ? `<div class="subtitle"><span class="badge danger">Allergy match</span></div>` : ''}
            </div>
            <div>&rsaquo;</div>
          </div>
        </div>
      `).join('')}
    `;
    document.getElementById('back').addEventListener('click', renderPatientList);
    el.querySelectorAll('[data-mid]').forEach(card => {
      card.addEventListener('click', () => {
        state.selectedMed = state.meds.find(m => m.id === card.dataset.mid);
        renderDraftForm();
      });
    });
  }

  function renderDraftForm() {
    const el = screen();
    const m = state.selectedMed;
    const p = state.selectedPatient;
    const allergyMatch = p.allergies?.some(a => m.class?.includes(a.toLowerCase()));
    el.innerHTML = `
      <button class="btn secondary" id="back">&lsaquo; Back to medications</button>
      <h1>${m.name} ${m.strength}</h1>
      <p class="muted">For <strong>${p.name}</strong>.</p>
      ${allergyMatch ? `
        <div class="warning">
          <div class="w-title">Allergy on record</div>
          ${p.name} is recorded as allergic to ${m.class.join(', ')}. Confirm before issuing.
        </div>` : ''}
      <label>Prescriber</label>
      <input type="text" id="prescriber" value="Dr. Lin, GP">
      <label>Dose &amp; schedule</label>
      <input type="text" id="schedule" value="${m.defaultSchedule}">
      <label>Clinical note (optional)</label>
      <textarea id="note" placeholder="e.g. for sinus infection"></textarea>
      <div class="spacer"></div>
      <button class="btn gp" id="issue">Issue prescription</button>
    `;
    document.getElementById('back').addEventListener('click', renderMedPicker);
    document.getElementById('issue').addEventListener('click', () => {
      const prescriber = document.getElementById('prescriber').value.trim() || 'Dr. Lin, GP';
      const schedule = document.getElementById('schedule').value.trim() || m.defaultSchedule;
      const note = document.getElementById('note').value.trim();
      const rx = buildPrescription({
        med: m,
        patient: p,
        prescriber,
        note,
        schedule,
      });
      Storage.save(Storage.keys.gpDraft, { rx, issuedAt: rx.authoredOn });
      renderIssued(rx);
    });
  }

  function renderIssued(rx) {
    const el = screen();
    const m = findMed(state.meds, rx.medicationReference.id);
    el.innerHTML = `
      <h1>Prescription ready</h1>
      <p class="muted">Have the patient open MedFile &rarr; <strong>Scan new script</strong> and point their camera here.</p>
      <div class="card">
        <div class="title">${rx.medicationReference.display}</div>
        <div class="subtitle">For ${rx.subject.display}</div>
        <div class="subtitle">${rx.dosageInstruction[0].text}</div>
        <div class="subtitle">Quantity: ${rx.dispenseRequest?.quantity?.value} ${rx.dispenseRequest?.quantity?.unit}</div>
        <div class="subtitle">${fmtTime(rx.authoredOn)} &middot; ${rx.requester.display}</div>
      </div>
      <div class="qr-frame" id="qr"></div>
      <button class="btn secondary" id="again">Issue another prescription</button>
    `;
    const len = QR.render(document.getElementById('qr'), rx, { size: 300, level: 'M' });
    console.log('[GP] QR payload length:', len, 'bytes');
    document.getElementById('again').addEventListener('click', () => {
      Storage.remove(Storage.keys.gpDraft);
      renderPatientList();
    });
  }

  document.addEventListener('DOMContentLoaded', bootstrap);

  return { bootstrap };
})();
