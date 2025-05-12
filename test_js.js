// document.body.insertAdjacentHTML('beforeend', '<div style="position:fixed;top:10px;left:10px;z-index:9999;background:black;color:white;padding:10px;font-size:20px;">Привет от внешнего JS!</div>');

(async () => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  script.onload = async () => {
    const canvas = await html2canvas(document.body);
    const dataUrl = canvas.toDataURL();
    
    document.body.insertAdjacentHTML('beforeend', `
      <div style="position:fixed;top:10px;left:10px;z-index:9999;background:black;color:white;padding:10px;font-size:20px;">
        Привет от внешнего JS!<br>
        <img src="${dataUrl}" style="max-width:300px;border:2px solid white;margin-top:10px;">
      </div>
    `);
  };
  document.body.appendChild(script);
})();
