<script type="module">
import 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

let p1 = null, p2 = null, marker1, marker2, frame;

const reset = () => {
  p1 = p2 = null;
  marker1?.remove(); marker2?.remove(); frame?.remove();
};

document.addEventListener('click', async (e) => {
  if (!p1) {                 // первая точка
    p1 = [e.clientX, e.clientY];

    marker1 = document.createElement('div');
    Object.assign(marker1.style, {
      position: 'fixed',
      left: p1[0] + 'px',
      top:  p1[1] + 'px',
      width: '6px',
      height: '6px',
      background: 'red',
      borderRadius: '50%',
      zIndex: 1e4
    });
    document.body.append(marker1);
    return;
  }

  // вторая точка
  p2 = [e.clientX, e.clientY];

  const [x1, y1] = [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1])];
  const [x2, y2] = [Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1])];
  const w = x2 - x1, h = y2 - y1;

  // визуальная рамка
  frame = document.createElement('div');
  Object.assign(frame.style, {
    position: 'fixed',
    left: x1 + 'px',
    top:  y1 + 'px',
    width: w + 'px',
    height: h + 'px',
    border: '2px dashed red',
    zIndex: 1e4,
    pointerEvents: 'none'
  });
  document.body.append(frame);

  try {
    const canvas = await html2canvas(document.body, {
      x: x1, y: y1, width: w, height: h,
      ignoreElements: el =>
        el.src && el.src.startsWith('https://www.google.com/recaptcha'),
      removeContainer: true
    });

    const img = new Image();
    img.src = canvas.toDataURL('image/png');
    Object.assign(img.style, {
      position: 'fixed',
      left: x1 + 'px',
      top:  y1 + 'px',
      maxWidth: '30%',
      border: '2px solid #00e676',
      boxShadow: '0 0 10px #000',
      zIndex: 1e4
    });
    document.body.append(img);
    setTimeout(() => img.remove(), 3000);
  } catch (err) {
    console.error('Скрин не получился:', err);
  }

  reset(); // готово к следующему выделению
});

// по ESC сбрасываем выделение
document.addEventListener('keydown', (e) => e.key === 'Escape' && reset());
</script>
