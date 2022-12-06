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
const clearBtn = document.querySelector('#clear');

let isDown = false;
container.onmousedown = () => (isDown = true);
container.onmouseup = () => (isDown = false);

colorPicker.addEventListener('input', (e) => setNewColor(e.target.value));
gridRange.addEventListener('input', (e) => setNewSize(e.target.value));
clearBtn.addEventListener('click', () => clearGrid());

// grabbing all buttons then removing clear button
const allButtons = document.querySelectorAll('button');
const modeButtons = [...allButtons].filter(
  (button) => button.innerHTML !== 'Clear'
);
// looping through each, add event listener
modeButtons.forEach((button, idx) => {
  const mode = button.innerHTML.toLowerCase();

  button.addEventListener('click', () => {
    toggleActive(button, idx);
    setNewMode(mode);
  });
});
// handle active css state
function toggleActive(el, index) {
  el.classList.add('active');
  modeButtons.forEach(
    (item, idx) => idx !== index && item.classList.remove('active')
  );
}

const setNewColor = (newColor) => (currentColor = newColor);
const setNewMode = (newMode) => (currentMode = newMode);
const setNewSize = (newSize) => {
  gridRangeOutput.innerHTML = `${newSize} x ${newSize}`;
  currentSize = newSize
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
  container.innerHTML = ''
  while (container.firstChild && container.removeChild(container.firstChild));
  createGrid(currentSize);
}

function load() {
  colorPicker.value = currentColor;
  gridRange.value = currentSize;
  gridRangeOutput.innerHTML = `${currentSize} x ${currentSize}`;
  createGrid(currentSize);
}

load();
