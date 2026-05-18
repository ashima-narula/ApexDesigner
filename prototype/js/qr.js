// MedFile prototype — QR encode + decode helpers.
// Wraps the two CDN libraries (qrcodejs, html5-qrcode) in a tiny interface.

const QR = {
  // Render a QR code containing `payload` (object) into a target element.
  // Uses qrcodejs (loaded via CDN). Clears the target first.
  render(targetEl, payload, { size = 320, level = 'M' } = {}) {
    targetEl.innerHTML = '';
    const wrap = document.createElement('div');
    targetEl.appendChild(wrap);
    const text = typeof payload === 'string' ? payload : JSON.stringify(payload);
    new QRCode(wrap, {
      text,
      width: size,
      height: size,
      correctLevel: QRCode.CorrectLevel[level] || QRCode.CorrectLevel.M,
    });
    return text.length;
  },

  // Start scanning. Calls onResult(parsedPayload, rawText) once on success, then stops.
  // Returns a cleanup fn the caller MUST call to release the camera.
  scan(targetElId, onResult, onError) {
    const reader = new Html5Qrcode(targetElId);
    const config = { fps: 10, qrbox: { width: 240, height: 240 } };
    let stopped = false;

    const stop = async () => {
      if (stopped) return;
      stopped = true;
      try { await reader.stop(); } catch (_) {}
      try { reader.clear(); } catch (_) {}
    };

    reader.start(
      { facingMode: 'environment' },
      config,
      (decoded) => {
        if (stopped) return;
        let parsed = decoded;
        try { parsed = JSON.parse(decoded); } catch (_) {}
        stop().then(() => onResult(parsed, decoded));
      },
      (err) => { /* per-frame decode errors, ignore */ }
    ).catch((err) => {
      stopped = true;
      if (onError) onError(err);
      else console.warn('[QR.scan] start failed', err);
    });

    return stop;
  },
};
