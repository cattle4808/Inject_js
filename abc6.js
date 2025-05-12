await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');

const Z = 2 ** 31 - 1;
let start, box;

document.addEventListener('mousedown', e => {
  start = [e.clientX, e.clientY];
  box = document.createElement('div');
  box.style = `position:fixed; border:2px dashed red; z-index:${Z}; pointer-events:none`;
  document.body.append(box);
});

document.addEventListener('mousemove', e => {
  if (!start) return;
  const [x1, y1] = [Math.min(start[0], e.clientX), Math.min(start[1], e.clientY)];
  const [w, h] = [Math.abs(e.clientX - start[0]), Math.abs(e.clientY - start[1])];
  Object.assign(box.style, {
    left: `${x1}px`, top: `${y1}px`,
    width: `${w}px`, height: `${h}px`
  });
});

document.addEventListener('mouseup', async e => {
  if (!start) return;
  const [x1, y1] = [Math.min(start[0], e.clientX), Math.min(start[1], e.clientY)];
  const [w, h] = [Math.abs(e.clientX - start[0]), Math.abs(e.clientY - start[1])];

  const canvas = await html2canvas(document.body, {
    x: x1, y: y1, width: w, height: h,
    useCORS: true, removeContainer: true
  });

  const img = new Image();
  img.src = canvas.toDataURL();
  img.style = `position:fixed; left:${x1}px; top:${y1}px; max-width:30%; z-index:${Z}; border:2px solid green`;
  document.body.append(img);

  setTimeout(() => img.remove(), 3000);
  box.remove();
  start = null;
});
