function createPainting(width, height) {
  const paintingHTML = document.getElementById('painting');
  const painting = document.createElement('table');

  painting.classList.add('painting');

  for(let line = 0 ; line < height ; line++) {
    painting.appendChild(document.createElement('tr'));
    
    for(let col = 0 ; col < width ; col++) {
      const pixel = document.createElement('div');

      pixel.classList.add('pixel');
      pixel.style.width = paintingHTML.offsetWidth / width + 'px';
      pixel.style.height = paintingHTML.offsetHeight / height + 'px';

      painting.lastChild.appendChild(pixel);
    };
  };

  paintingHTML.appendChild(painting);
}

window.addEventListener('load', () => {
  createPainting(100,100);
});