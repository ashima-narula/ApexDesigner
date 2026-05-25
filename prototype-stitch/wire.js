// MedFile demo wiring — turns Stitch mockups into a clickable prototype.
// Routes clicks by (1) explicit [data-link], (2) bottom-nav icon name,
// (3) top-bar notifications icon, (4) text content of horizontal nav links.
(function () {
  const ICON_TO_SCREEN = {
    folder: 'records_home',
    folder_open: 'records_home',
    folder_shared: 'records_home',
    home: 'dashboard',
    person: 'profile_home',
    badge: 'medical_id',
    prescriptions: 'prescriptions_home',
    medication: 'prescription_history',
    vaccines: 'immunisations',
    note_alt: 'health_notes',
    clinical_notes: 'clinical_records',
    description: 'medical_record_detail',
    biotech: 'medical_record_detail',
    local_hospital: 'hospital_id_card',
    qr_code_2: 'hospital_id_card',
    qr_code: 'hospital_id_card',
    sticky_note_2: 'health_notes',
    notifications: 'notifications',
    event_note: 'health_notes',
    warning: 'prescription_history',
    mail: 'notifications',
  };

  const TEXT_TO_SCREEN = {
    records: 'records_home',
    home: 'dashboard',
    profile: 'profile_home',
  };

  function currentScreen() {
    const parts = location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 2] || '';
  }

  function go(screen) {
    if (!screen || screen === currentScreen()) return;
    location.href = `../${screen}/code.html`;
  }

  function iconName(el) {
    if (!el) return null;
    if (el.dataset && el.dataset.icon) return el.dataset.icon;
    if (el.classList && el.classList.contains('material-symbols-outlined')) {
      return el.textContent.trim().split(/\s+/)[0];
    }
    return null;
  }

  document.addEventListener(
    'click',
    (e) => {
      // 1. Explicit data-link wins
      const linked = e.target.closest('[data-link]');
      if (linked) {
        e.preventDefault();
        go(linked.dataset.link);
        return;
      }

      // 2. Bottom nav (button or anchor with material symbol)
      const clickable = e.target.closest('a, button');
      if (!clickable) return;

      // Skip form submits that already navigate via data-link handler above
      if (clickable.matches('a[href^="http"], a[href^="tel:"], a[href^="mailto:"]')) return;

      // Try icon on element itself or inside it
      let icon = iconName(clickable);
      if (!icon) {
        const child = clickable.querySelector('.material-symbols-outlined, [data-icon]');
        icon = iconName(child);
      }
      if (icon && ICON_TO_SCREEN[icon]) {
        e.preventDefault();
        go(ICON_TO_SCREEN[icon]);
        return;
      }

      // 3. Text-content nav (prescription_history desktop tabs etc.)
      const txt = (clickable.textContent || '').trim().toLowerCase();
      if (clickable.tagName === 'A' && TEXT_TO_SCREEN[txt]) {
        e.preventDefault();
        go(TEXT_TO_SCREEN[txt]);
      }
    },
    true
  );

  // Presenter chrome — small pill that returns to the demo index.
  document.addEventListener('DOMContentLoaded', () => {
    const pill = document.createElement('a');
    pill.href = '../index.html';
    pill.textContent = '← Demo Index';
    pill.setAttribute('data-wire-chrome', '');
    pill.style.cssText = [
      'position:fixed', 'top:8px', 'left:8px',
      'background:rgba(0,0,0,0.72)', 'color:#fff',
      'padding:6px 12px', 'border-radius:999px',
      'font:600 11px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
      'letter-spacing:0.02em', 'z-index:9999',
      'text-decoration:none', 'backdrop-filter:blur(6px)',
      'box-shadow:0 2px 8px rgba(0,0,0,0.2)',
    ].join(';');
    document.body.appendChild(pill);
  });
})();
