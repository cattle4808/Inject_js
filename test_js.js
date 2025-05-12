// document.body.insertAdjacentHTML('beforeend', '<div style="position:fixed;top:10px;left:10px;z-index:9999;background:black;color:white;padding:10px;font-size:20px;">Привет от внешнего JS!</div>');

(async () => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  script.onload = async () => {
    await new Promise(r => setTimeout(r, 500));

    const canvas = await html2canvas(document.body, { useCORS: true });
    const dataUrl = canvas.toDataURL();

    const container = document.createElement('div');
    container.style = `
      position:fixed;
      top:10px;
      left:10px;
      z-index:9999;
      background:black;
      color:white;
      padding:10px;
      font-size:14px;
      border:2px solid white;
      border-radius:8px;
    `;

    container.innerHTML = `
      <div>Привет от JS!<br><small>Слежение за мышью:</small></div>
      <img src="${dataUrl}" style="display:block;margin-top:10px;max-width:300px;border:1px solid white;">
      <div id="coords" style="margin-top:8px;color:lime;font-family:monospace;"></div>
    `;

    document.body.appendChild(container);

    const coords = container.querySelector('#coords');
    document.addEventListener('mousemove', e => {
      coords.textContent = `x: ${e.clientX}, y: ${e.clientY}`;
    });
  };
  document.body.appendChild(script);
})();
