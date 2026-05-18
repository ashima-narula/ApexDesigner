# MedFile Prototype

DECO3800/7380 exhibit artefact (Semester 1 2026). A three-role mobile web app where a prescription travels between GP / Patient / Pharmacist phones as a QR-encoded FHIR `MedicationRequest`. No backend, no accounts. Everything in `localStorage`.

See `~/.claude/plans/mossy-coalescing-dawn.md` for the full design spec.

## Run it locally

The cameras (QR scan + viewfinder) require a **secure context** — `https://` or `http://localhost`. Plain HTTP on a LAN IP will fail on iOS Safari and recent Chromium.

### Option A — desktop only (works on `localhost`)

```sh
cd prototype
python3 -m http.server 8000
# then open http://localhost:8000 on the same machine
```

Useful for quick desktop sanity checks. Camera permission must still be granted.

### Option B — phones on your Wi-Fi (HTTPS via tunnel)

Use a tunnel so phones get a real HTTPS URL:

```sh
cd prototype
python3 -m http.server 8000 &
# in another shell, expose it
cloudflared tunnel --url http://localhost:8000   # or: ngrok http 8000
```

Open the tunnel URL on each phone. Three phones, three roles: `index.html` lets you pick.

### Option C — deploy to GitHub Pages

This subfolder is plain static files. From the repo root:

1. Commit `prototype/` and push.
2. In the repo settings, enable **Pages → Deploy from a branch → main → /prototype**.
3. Open the published URL on each phone.

This is the recommended exhibit setup — fully offline once each phone has loaded once.

## Demo flow at exhibit

1. **GP phone** (`gp.html`) → pick Sarah Chen → pick med (try Amoxicillin to trigger the penicillin warning, or Paracetamol for a clean run) → set dose → **Issue** → QR appears.
2. **Patient phone** (`patient.html`) → **Scan new script** → point at GP's QR → script appears in list → tap it → see detail screen (with any warnings) → **Take dose** → camera opens → tap the pill thumbnail → dose logged.
3. **Pharmacist phone** (`pharmacist.html`) → **Scan patient script** → patient shows the QR from their script-detail screen → pharmacist reviews and taps **Dispense** → confirmation QR appears.
4. Patient taps **Scan pharmacist confirmation** → points at pharmacist's QR → script status flips to "Dispensed."
5. Each phone has a **Reset** button in the top bar to clear state between visitors.

## Pre-exhibit checklist

- [ ] Open each role page on real exhibit hardware (one iPhone Safari + one Android Chrome at minimum)
- [ ] Grant camera permission once per role per phone
- [ ] Confirm full 3-act loop works
- [ ] Confirm penicillin allergy warning fires when issuing Amoxicillin
- [ ] Confirm Reset button restores clean state
- [ ] Disable Wi-Fi after initial load and re-run loop (catches accidental network deps)

## Out of scope (loud no's)

No backend. No auth. No real FHIR server. No real ML. No real NFC. Five meds. One patient. The novelty is the *interaction*, not the architecture.

## File map

```
prototype/
  index.html              role chooser
  gp.html / patient.html / pharmacist.html
  js/
    app.js                shared: storage, FHIR helpers, safety checks
    qr.js                 thin wrappers over qrcodejs + html5-qrcode
    scenes-gp.js          GP flow: patient picker, med picker, Issue, QR display
    scenes-patient.js     Patient flow: scripts list, detail, scan, take-dose camera
    scenes-pharmacist.js  Pharmacist flow: scan, review, dispense, confirmation QR
  css/styles.css
  data/meds.json          5-med catalog
  data/patient-sarah.json Sarah Chen fixture (penicillin allergy)
  img/*.svg               pill imagery (placeholder, distinct shapes/colors)
```
