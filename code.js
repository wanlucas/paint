var clicking, actualColor;

function createPainting(width, height) {
  const paintingHTML = document.getElementById('painting');
  const painting = document.createElement('table');

  for(let line = 0 ; line < height ; line++) {
    painting.appendChild(document.createElement('tr'));

    for(let col = 0 ; col < width ; col++) {
      const pixel = document.createElement('td');

      pixel.classList.add('pixel');
      painting.lastChild.appendChild(pixel);
    };
  };
  paintingHTML.appendChild(painting);
}

function paintPixel(pixel) {
  if(clicking) {
    pixel.style.backgroundColor = 'black'; 
  }
}

function createInputEvents() {
  const painting = document.getElementById('painting');

  painting.addEventListener('mousedown', ({ path }) => {
    clicking = true;
    paintPixel(path[0]);
  });

  painting.addEventListener('mouseup', () => clicking = false); 
  
  painting.addEventListener('mousemove', ({ path }) =>
    paintPixel(path[0]
  ));
}

window.addEventListener('load', () => {
  createPainting(100,50);
  createInputEvents();
});