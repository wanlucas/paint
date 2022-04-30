var clicking;

function createPainting(width, height) {
  const paintingHTML = document.getElementById('painting');
  const painting = document.createElement('table');

  for(let line = 0 ; line < height ; line++) {
    painting.appendChild(document.createElement('tr'));
    
    for(let col = 0 ; col < width ; col++) {
      const pixel = document.createElement('td');

      pixel.classList.add('pixel');
      pixel.addEventListener('mouseover', ({ path }) => paintPixel(pixel));
    
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

window.addEventListener('load', () => {
  createPainting(100,50);
  window.addEventListener('mousedown', () => clicking = true);
  window.addEventListener('mouseup', () => clicking = false); 
});