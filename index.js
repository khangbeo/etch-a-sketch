import './style.css';

// convert to react
// these are state variables since they change
let currentColor = generateRandomColor();
let currentMode = 'color';
let currentSize = 16;

const container = document.querySelector('#container');
const colorPicker = document.querySelector('#color-picker');
const gridRange = document.querySelector('#grid-range');
const gridRangeOutput = document.querySelector('#grid-range-output');
const colorBtn = document.querySelector('#color');
const rainbowBtn = document.querySelector('#rainbow');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');

let isDown = false;
container.onmousedown = () => (isDown = true);
container.onmouseup = () => (isDown = false);

colorPicker.addEventListener('input', (e) => setNewColor(e.target.value));
gridRange.addEventListener('input', (e) => setNewSize(e.target.value));
colorBtn.addEventListener('click', () => setNewMode('color'));
rainbowBtn.addEventListener('click', () => setNewMode('rainbow'));
eraserBtn.addEventListener('click', () => setNewMode('eraser'));
clearBtn.addEventListener('click', () => clearGrid());

// these are used in jsx event handlers
const setNewColor = (newColor) => {
  currentColor = newColor;
};
const setNewMode = (newMode) => {
  if (newMode === 'color') {
    colorBtn.classList.add('active')
    rainbowBtn.classList.remove('active')
    eraserBtn.classList.remove('active')
  }
  
  if (newMode === 'rainbow') {
    colorBtn.classList.remove('active')
    rainbowBtn.classList.add('active')
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
    colorBtn.classList.remove('active')
    rainbowBtn.classList.remove('active')
  }
  currentMode = newMode;
};
const setNewSize = (newSize) => {
  gridRangeOutput.innerHTML = `${newSize} x ${newSize}`;
  clearGrid();
  createGrid(newSize);
};

function createGrid(cells = 16) {
  container.style.setProperty('--grid-rows', cells);
  container.style.setProperty('--grid-cols', cells);
  for (let i = 0; i < cells ** 2; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('mouseover', sketch);
    cell.addEventListener('mousedown', sketch);
    container.appendChild(cell);
  }
}

function sketch({ type, target }) {
  if (type === 'mouseover' && !isDown) return;

  let modes = {
    color: currentColor,
    rainbow: generateRandomColor(),
    eraser: '',
  };
  target.style.backgroundColor = modes[currentMode];
}

function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase()}`;
}

function clearGrid() {
  // loop, checks for first child of container and remove until there's no children
  while (container.firstChild && container.removeChild(container.firstChild));
  createGrid(currentSize);
}

function load() {
  colorPicker.value = currentColor;
  gridRange.value = currentSize
  gridRangeOutput.innerHTML = `${currentSize} x ${currentSize}`
  createGrid(currentSize);
}

load();
