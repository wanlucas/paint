const colorPaletteHTML = document.getElementById('colors');
const display = document.getElementById('display');
const coordinatesHTML = document.getElementById('cursor-coordinates');

const canvas = display.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = display.offsetWidth;
canvas.height = display.offsetHeight;

const config = {
  pencilColor: 'black',
  actualTool: 'pencil',
  lineWidth: 2,
  initialColors : [
    'black', 'red', 'green', 'blue',
    'yellow', 'brown', 'orange', 'snow'
  ],
};

var clicking = false;

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
  clicking = true;
  c.lineWidth = config.lineWidth;
  c.strokeStyle = config.pencilColor;
  c.lineCap = 'round';

  paintPixel(e);
}

function stopDrawing() {
  clicking = false;
  c.beginPath();
}

function mouseMoving(e) {
  coordinatesHTML.innerText = `${e.offsetX}, ${e.offsetY}px`;

  if(!clicking) return;

  switch(config.actualTool) {
    case 'pencil': paintPixel(e);
    break;

    case 'eraser': erasePixel(e);
    break;
  };
}

function paintPixel(e) {
  c.lineTo(e.offsetX, e.offsetY);
  c.stroke();
}

function erasePixel(e) {
  c.clearRect(
    e.offsetX, e.offsetY, 
    config.lineWidth * 5,
    config.lineWidth * 5
  );
}

function createInputEvents() {
  canvas.addEventListener('mousedown', startDrawing);
  window.addEventListener('mouseup', stopDrawing); 
  canvas.addEventListener('mousemove', mouseMoving);

  document.querySelector('.tools').addEventListener('click', ()=> {
    config.actualTool = document.getElementById('pencil').checked ?  'pencil' : 'eraser';
  });
}

window.addEventListener('load', () => {
  createColorPalette();
  createInputEvents();
});