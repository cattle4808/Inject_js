(async () => {
  await import('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');

  document.addEventListener('dblclick', async () => {
    try {
      const canvas = await html2canvas(document.body, {
        ignoreElements: el =>
          el.src && el.src.startsWith('https://www.google.com/recaptcha'),
        removeContainer: true
      });

      const img = new Image();
      img.src = canvas.toDataURL('image/png');
      Object.assign(img.style, {
        position: 'fixed',
        left: 10 + 'px',
        top: 10 + 'px',
        maxWidth: '30%',
        border: '2px solid red',
        zIndex: 9999,
        boxShadow: '0 0 10px black'
      });
      document.body.append(img);
      setTimeout(() => img.remove(), 3000);
    } catch (e) {
      console.error('Скрин не получился:', e);
    }
  });
})();
