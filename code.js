const colorPaletteHTML = document.getElementById('colors');
const display = document.getElementById('display');
const canvas = display.querySelector('canvas');
const c = canvas.getContext('2d');

const initialColors = ['black', 'red', 'green', 'blue', 'yellow', 'brown', 'orange'];
var clicking, actualColor;

canvas.width = display.offsetWidth;
canvas.height = display.offsetHeight;

function createColorPalette() {
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

function changePencilColor(colorElement) {
  const color = colorElement.style.backgroundColor;

  actualColor = color;
  colorPaletteHTML.querySelectorAll('.color').forEach((colorElement) => 
    colorElement.classList = 'color'
  );
  colorElement.classList.add('selected');
}

function paintPixel(x,y) {
  if(clicking) {
    c.beginPath();
    c.fillStyle = actualColor;
    c.arc(x, y, 1, 0, Math.PI * 2);
    c.fill();
    c.closePath();
  }
}

function createInputEvents() {
  canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
    clicking = true;
    paintPixel(offsetX, offsetY);
  });
  window.addEventListener('mouseup', () => clicking = false); 

  canvas.addEventListener('mousemove', ({ offsetX, offsetY }) =>
    paintPixel(offsetX, offsetY)
  );
}

window.addEventListener('load', () => {
  createColorPalette();
  createInputEvents();
  actualColor = 'black';
});