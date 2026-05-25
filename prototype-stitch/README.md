# MedFile — Stitch Clickable Prototype

High-fidelity, fully clickable mobile mockup of the MedFile patient app. Used as the exhibit demo artefact for DECO3800 Final Presentation (27 May 2026).

## Run

No build, no server. Open `index.html` in any modern browser.

```bash
open index.html
```

Cameras / QR features are not used — works offline once the page loads (fonts + Tailwind CDN need a first-load network hit).

## What's wired

- 16 mobile screens (`*/code.html`) sourced from Google Stitch, design-system documented in `vital_ledger/DESIGN.md` (Material 3 tokens, Hanken Grotesk, 8px baseline).
- Shared `wire.js` routes clicks via:
  1. `[data-link]` attribute on any element (explicit destination)
  2. Material Symbol icon name on bottom-nav buttons (folder → records, home → dashboard, person → profile, plus others)
  3. Text content of horizontal nav links (Records / Home / Profile)
- Every screen has a **← Demo Index** pill (top-left) back to `index.html`.

## Demo spine — Prescription handoff

Open `index.html`, follow the numbered tiles:

1. **Onboarding** → 7-step carousel, final step routes to Sign in
2. **Sign in / Sign up** → submit button routes to Dashboard
3. **Dashboard** → tap the red "Alert" bento card (prescription runs out)
4. **Prescriptions** → tap "Check Status" or the + FAB
5. **Prescription history** → cross-provider view, "Request Refill" / primary CTA
6. **Add medicine** → manual entry flow, "Done" returns to Prescriptions

Alt entry points: every screen tile in the index is independently reachable.

## File layout

```
index.html              # demo landing page
wire.js                 # shared click router (loaded by every code.html)
<screen>/code.html      # individual mockup (16 total)
<screen>/screen.png     # static preview used by the index grid
vital_ledger/DESIGN.md  # design-system source of truth
```

## Editing

- Keep M3 token names from `vital_ledger/DESIGN.md` — don't add raw hex.
- To wire a new clickable element: add `data-link="<screen_dir_name>"` on the element. Done — no JS change needed.
- To add a new screen: drop `new_screen/code.html` (and ideally `screen.png`), add `<script src="../wire.js"></script>` before `</body>`, register it in `index.html`'s `SCREENS` array.

## Status

Exhibit artefact, not production. No backend, no real FHIR server, no account system. The interaction story is the novelty; the architecture is intentionally minimal.
