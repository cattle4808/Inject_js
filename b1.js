await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
const html2canvas = window.html2canvas;

let isCapturing = false, startPos = null, selectionFrame = null;
const Z = 2147483647;

const reset = () => {
  isCapturing = false;
  startPos = null;
  selectionFrame?.remove();
  selectionFrame = null;
};
window.resetCapture = reset;

document.addEventListener('mousedown', e => {
  isCapturing = true;
  startPos = [e.clientX, e.clientY];

  selectionFrame = document.createElement('div');
  selectionFrame.style = `
    position:fixed;
    left:${startPos[0]}px;
    top:${startPos[1]}px;
    width:0;height:0;
    border:2px dashed #ff1744;
    background:rgba(255,23,68,0.05);
    pointer-events:none;
    z-index:${Z};
  `;
  document.body.append(selectionFrame);
});

document.addEventListener('mousemove', e => {
  if (!isCapturing || !selectionFrame) return;

  const [x1, y1] = startPos;
  const x2 = e.clientX;
  const y2 = e.clientY;

  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  Object.assign(selectionFrame.style, {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  });
});

document.addEventListener('mouseup', async e => {
  if (!isCapturing || !startPos) return;
  isCapturing = false;

  const [x1, y1] = startPos;
  const x2 = e.clientX;
  const y2 = e.clientY;

  const [left, top] = [Math.min(x1, x2), Math.min(y1, y2)];
  const [width, height] = [Math.abs(x2 - x1), Math.abs(y2 - y1)];

  try {
    const canvas = await html2canvas(document.body, {
      x: left,
      y: top,
      width,
      height,
      useCORS: true,
      removeContainer: true,
      ignoreElements: el =>
        el.src?.startsWith('https://www.google.com/recaptcha')
    });

    const img = Object.assign(new Image(), {
      src: canvas.toDataURL('image/png'),
      style: `
        position:fixed;left:${left}px;top:${top}px;
        max-width:30%;
        border:2px solid #00e676;
        box-shadow:0 0 10px #000;
        z-index:${Z};
      `
    });
    document.body.append(img);
    setTimeout(() => img.remove(), 3000);
  } catch (err) {
    console.error('Screenshot failed:', err);
  }

  reset();
});

document.addEventListener('keydown', e => e.key === 'Escape' && reset());
