const colorPaletteHTML = document.getElementById('colors');
const display = document.getElementById('display');
const coordinatesHTML = document.getElementById('cursor-coordinates');

const canvas = display.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = display.offsetWidth;
canvas.height = display.offsetHeight;

const config = {
  pencilColor: 'black',
  lineWidth: 1,
  initialColors : [
    'black', 'red', 'green', 'blue',
    'yellow', 'brown', 'orange', 'snow'
  ],
};

var drawing = false;

function createColorPalette() {
  config.initialColors.forEach((color) => {
    const colorElement = document.createElement('li');

    colorElement.classList.add('color');
    colorElement.style.backgroundColor = color;
    colorElement.addEventListener('click', ({ path }) => 
      changePencilColor(path[0])
    ); 

    colorPaletteHTML.appendChild(colorElement);
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

function startDrawing(e) {
  drawing = true;
  c.lineWidth = config.lineWidth;
  c.strokeStyle = config.pencilColor;
  c.lineCap = 'round';

  paintPixel(e);
}

function stopDrawing() {
  drawing = false;
  c.beginPath();
}

function mouseMoving(e) {
  if(drawing) paintPixel(e);
  coordinatesHTML.innerText = `${e.offsetX}, ${e.offsetY}px`;
}

function paintPixel(e) {
  c.lineTo(e.offsetX, e.offsetY);
  c.stroke();
}

function createInputEvents() {
  canvas.addEventListener('mousedown', startDrawing);
  window.addEventListener('mouseup', stopDrawing); 
  canvas.addEventListener('mousemove', mouseMoving);
}

window.addEventListener('load', () => {
  createColorPalette();
  createInputEvents();
});