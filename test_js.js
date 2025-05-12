// document.body.insertAdjacentHTML('beforeend', '<div style="position:fixed;top:10px;left:10px;z-index:9999;background:black;color:white;padding:10px;font-size:20px;">Привет от внешнего JS!</div>');

(async () => {
  // Загружаем html2canvas
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  script.onload = async () => {
    // Делаем скриншот всей body
    const canvas = await html2canvas(document.body);
    const dataUrl = canvas.toDataURL();

    // Вставляем превью прямо на страницу
    document.body.insertAdjacentHTML('beforeend', `
      <div style="position:fixed;top:10px;left:10px;z-index:9999;background:black;color:white;padding:10px;font-size:16px;">
        Снимок страницы:<br>
        <img src="${dataUrl}" style="max-width:300px;max-height:300px;margin-top:10px;border:2px solid white;">
      </div>
    `);
  };
  document.body.appendChild(script);
})();
