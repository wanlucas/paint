const colorPaletteHTML = document.getElementById('colors');
const display = document.getElementById('display');
const coordinatesHTML = document.getElementById('cursor-coordinates');

const canvas = display.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = display.offsetWidth;
canvas.height = display.offsetHeight;

const config = {
  pencilType: 1,
  pencilColor: 'black'
};

const initialColors = ['black', 'red', 'green', 'blue', 'yellow', 'brown', 'orange'];
var clicking;

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

  config.pencilColor = color;
  colorPaletteHTML.querySelectorAll('.color').forEach((colorElement) => 
    colorElement.classList = 'color'
  );
  colorElement.classList.add('selected');
}

function mouseMoving(e) {
  if(clicking) paintPixel(e);
  coordinatesHTML.innerText = `${e.offsetX}, ${e.offsetY}px`;
}

function paintPixel(e) {
  c.strokeStyle = config.pencilColor;
  c.lineWidth = 10;
  c.lineCap = 'round';
  
  c.lineTo(e.offsetX, e.offsetY);
  c.stroke();
}

function createInputEvents() {
  canvas.addEventListener('mousedown', (e) => {
    clicking = true;
    paintPixel(e);
  });

  window.addEventListener('mouseup', () => {
    clicking = false;
    c.beginPath();
  }); 
  
  canvas.addEventListener('mousemove', mouseMoving);
}

window.addEventListener('load', () => {
  createColorPalette();
  createInputEvents();
});