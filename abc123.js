// document.body.insertAdjacentHTML('beforeend', '<div style="position:fixed;top:10px;left:10px;z-index:9999;background:black;color:white;padding:10px;font-size:20px;">Привет от внешнего JS!</div>');

// (async () => {
//   const script = document.createElement('script');
//   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
//   script.onload = async () => {
//     await new Promise(r => setTimeout(r, 500));
//     const canvas = await html2canvas(document.body, { useCORS: true });

//     const container = document.createElement('div');
//     container.style = `
//       position:fixed;
//       top:10px;
//       left:10px;
//       z-index:9999;
//       background:black;
//       color:white;
//       padding:10px;
//       font-size:14px;
//       border:2px solid white;
//       border-radius:8px;
//     `;

//     const wrapper = document.createElement('div');
//     wrapper.style = 'position:relative; display:inline-block;';

//     const img = document.createElement('img');
//     img.src = canvas.toDataURL();
//     img.style = 'max-width:300px; display:block; border:1px solid white;';

//     const dot = document.createElement('div');
//     dot.style = `
//       position:absolute;
//       width:8px;
//       height:8px;
//       background:red;
//       border-radius:50%;
//       pointer-events:none;
//       transform:translate(-50%,-50%);
//     `;

//     wrapper.appendChild(img);
//     wrapper.appendChild(dot);
//     container.innerHTML = '<div>Привет от JS!<br><small>Трек мыши на скрине:</small></div>';
//     container.appendChild(wrapper);
//     document.body.appendChild(container);

//     document.addEventListener('mousemove', (e) => {
//       const scale = img.clientWidth / window.innerWidth;
//       const x = e.clientX * scale;
//       const y = e.clientY * scale;
//       dot.style.left = `${x}px`;
//       dot.style.top = `${y}px`;
//     });
//   };
//   document.body.appendChild(script);





(async () => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  script.onload = () => {
    let clicks = [];
    let lastClickTime = 0;

    document.addEventListener('click', async (e) => {
      const now = Date.now();

      if (now - lastClickTime < 500) {
        clicks.push([e.clientX, e.clientY]);

        if (clicks.length === 2) {
          const [p1, p2] = clicks;
          const [x1, y1] = [Math.min(p1[0], p2[0]), Math.min(p1[1], p2[1])];
          const [x2, y2] = [Math.max(p1[0], p2[0]), Math.max(p1[1], p2[1])];

          const canvas = await html2canvas(document.body, {
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
            useCORS: true
          });

          const img = document.createElement('img');
          img.src = canvas.toDataURL();
          img.style = `
            position: fixed;
            left: ${x1}px;
            top: ${y1}px;
            border: 2px solid red;
            z-index: 9999;
            max-width: 300px;
            box-shadow: 0 0 10px black;
          `;
          document.body.appendChild(img);

          setTimeout(() => img.remove(), 3000);
          clicks = [];
        }
      } else {
        clicks = [[e.clientX, e.clientY]];
      }

      lastClickTime = now;
    });
  };
  document.body.appendChild(script);
})();

