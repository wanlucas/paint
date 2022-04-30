const initialColors = ['red', 'green', 'blue', 'yellow', 'black', 'brown'];

var clicking, actualColor;

function createColorPalette() {
  const colorPaletteHTML = document.getElementById('colors');

  initialColors.forEach((colorValue) => {
    const color = document.createElement('li');

    color.classList.add('color');
    color.style.backgroundColor = colorValue;
    color.addEventListener('click', ({ path }) => 
      changePencilColor(path[0])
      ); 
      
    colorPaletteHTML.appendChild(color);
  });
}

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

function changePencilColor(colorElement) {
  const color = colorElement.style.backgroundColor;

  actualColor =  color;
  colorElement.classList.toggle('selected');
}

function paintPixel(pixel) {
  if(clicking) {
    pixel.style.backgroundColor = actualColor; 
  }
}

function createInputEvents() {
  const painting = document.getElementById('painting');

  painting.addEventListener('mousedown', ({ path }) => {
    clicking = true;
    paintPixel(path[0]);
  });
  window.addEventListener('mouseup', () => clicking = false); 

  painting.addEventListener('mousemove', ({ path }) =>
    paintPixel(path[0]
  ));
}

window.addEventListener('load', () => {
  createColorPalette();
  createPainting(100,50);
  createInputEvents();
});