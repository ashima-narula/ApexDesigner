// MedFile prototype — shared app utilities
// All state lives in localStorage. Three roles share helpers but never share state.

const Storage = {
  keys: {
    profile: 'medfile.patient.profile',
    scripts: 'medfile.patient.scripts',
    gpDraft: 'medfile.gp.draft',
    pharmaQueue: 'medfile.pharmacist.queue',
  },

  load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn('[Storage.load] parse failed for', key, e);
      return fallback;
    }
  },

  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  resetAll() {
    Object.values(this.keys).forEach(k => localStorage.removeItem(k));
  },
};

// Fetch the shipped meds catalog. Cached for the session.
let _medsCache = null;
async function loadMeds() {
  if (_medsCache) return _medsCache;
  const res = await fetch('data/meds.json');
  _medsCache = await res.json();
  return _medsCache;
}

// Fetch the patient fixture
async function loadPatientFixture() {
  const res = await fetch('data/patient-sarah.json');
  return await res.json();
}

// FHIR-shaped MedicationRequest builder
function buildPrescription({ med, patient, prescriber, note, schedule }) {
  return {
    resourceType: 'MedicationRequest',
    id: 'rx-' + crypto.randomUUID(),
    status: 'active',
    intent: 'order',
    medicationReference: { id: med.id, display: `${med.name} ${med.strength}` },
    subject: { id: patient.id, display: patient.name },
    authoredOn: new Date().toISOString(),
    requester: { display: prescriber },
    dosageInstruction: [{ text: schedule || med.defaultSchedule }],
    dispenseRequest: { quantity: med.quantity },
    note: note ? [{ text: note }] : [],
  };
}

// Wrap a prescription in patient-side state (not in the QR)
function wrapPrescription(rx) {
  return {
    rx,
    dispenseStatus: 'issued',
    doseLog: [],
  };
}

// Find a med in the catalog by id
function findMed(meds, id) {
  return meds.find(m => m.id === id);
}

// Allergy / interaction check given a script and patient + catalog
function checkSafety(rx, patient, meds, activeScripts = []) {
  const warnings = [];
  const med = findMed(meds, rx.medicationReference.id);
  if (!med) return warnings;

  // Allergy class match
  for (const allergy of (patient.allergies || [])) {
    if (med.class && med.class.includes(allergy.toLowerCase())) {
      warnings.push({
        severity: 'danger',
        type: 'allergy',
        title: `Allergy: ${allergy}`,
        message: `${med.name} belongs to the ${allergy} class. Patient is recorded as allergic.`,
      });
    }
  }

  // Interaction with existing active meds
  for (const script of activeScripts) {
    const otherId = script.rx?.medicationReference?.id;
    if (!otherId || otherId === med.id) continue;
    const other = findMed(meds, otherId);
    if (med.interactsWith && med.interactsWith.includes(otherId)) {
      warnings.push({
        severity: 'danger',
        type: 'interaction',
        title: `Interaction with ${other?.name || otherId}`,
        message: `${med.name} interacts with ${other?.name || otherId}. Review before dispensing.`,
      });
    }
  }

  return warnings;
}

// Format an ISO timestamp short
function fmtTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: 'short', day: '2-digit', month: 'short',
    hour: '2-digit', minute: '2-digit',
  });
}

// Toast helper
function toast(msg, ms = 2200) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), ms);
}

// Wire the role-shell top bar reset button
function wireResetButton() {
  const btn = document.querySelector('[data-action="reset"]');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!confirm('Reset demo state on this phone?')) return;
    Storage.resetAll();
    location.reload();
  });
}

// Provide a single hook each role page can call after DOMContentLoaded
function initShell() {
  wireResetButton();
}

document.addEventListener('DOMContentLoaded', initShell);
