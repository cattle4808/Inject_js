await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
const html2canvas = window.html2canvas;  

let p1 = null, p2 = null, marker, frame;
const Z = 2147483647;                   
const reset = () => { p1 = p2 = null; marker?.remove(); frame?.remove(); };
window.resetCapture = reset;             

document.addEventListener('click', async e => {
  if (!p1) {
    p1 = [e.clientX, e.clientY];

    marker = Object.assign(document.createElement('div'), {
      style: `
        position:fixed;left:${p1[0]}px;top:${p1[1]}px;
        width:8px;height:8px;border-radius:50%;
        background:#ff1744;pointer-events:none;z-index:${Z}
      `
    });
    document.body.append(marker);
    return;
  }

  p2 = [e.clientX, e.clientY];
  const [x1, y1] = [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1])];
  const [x2, y2] = [Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1])];
  const [w,  h ] = [x2 - x1, y2 - y1];

  frame = Object.assign(document.createElement('div'), {
    style: `
      position:fixed;left:${x1}px;top:${y1}px;
      width:${w}px;height:${h}px;pointer-events:none;
      border:2px dashed #ff1744;z-index:${Z}
    `
  });
  document.body.append(frame);

  try {
    const canvas = await html2canvas(document.body, {
      x: x1, y: y1, width: w, height: h,
      useCORS: true, removeContainer: true,
      ignoreElements: el =>
        el.src?.startsWith('https://www.google.com/recaptcha')
    });

    const img = Object.assign(new Image(), {
      src: canvas.toDataURL('image/png'),
      style: `
        position:fixed;left:${x1}px;top:${y1}px;max-width:30%;
        border:2px solid #00e676;box-shadow:0 0 10px #000;
        z-index:${Z}
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
