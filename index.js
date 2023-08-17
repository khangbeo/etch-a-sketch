import './style.css';

// State variables
let currentColor = generateRandomColor();
let currentMode = 'color';
let currentSize = 16;
let isDown = false;

// DOM elements
const container = document.querySelector('#container');
const colorPicker = document.querySelector('#color-picker');
const gridRange = document.querySelector('#grid-range');
const gridRangeOutput = document.querySelector('#grid-range-output');
const clearBtn = document.querySelector('#clear');
const modeButtons = getModeButtons();

function getModeButtons() {
  const allButtons = document.querySelectorAll('button');
  return [...allButtons].filter((button) => button.innerHTML !== 'Clear');
}

// Initialization
function initialize() {
  setupEventListeners();
  loadInitialValues();
}

function setupEventListeners() {
  container.onmousedown = () => (isDown = true);
  container.onmouseup = () => (isDown = false);

  colorPicker.addEventListener('input', (e) => updateColor(e.target.value));
  gridRange.addEventListener('input', (e) => updateSize(e.target.value));
  clearBtn.addEventListener('click', clearGrid);

  modeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      updateMode(this.innerHTML.toLowerCase());
    });
  });
}

function updateColor(newColor) {
  currentColor = newColor;
}

function updateMode(newMode) {
  deactivateAllButtons();
  currentMode = newMode;
  activateButton(document.querySelector(`#${newMode}`));
}

function updateSize(newSize) {
  gridRangeOutput.textContent = `${newSize} x ${newSize}`;
  currentSize = newSize;
  recreateGrid();
}

function deactivateAllButtons() {
  modeButtons.forEach((button) => button.classList.remove('active'));
}

function activateButton(button) {
  button.classList.add('active');
}

function recreateGrid() {
  clearGrid();
  createGrid(currentSize);
}

function clearGrid() {
  container.innerHTML = '';
}

function createGrid(cells = 16) {
  container.style.setProperty('--grid-rows', cells);
  container.style.setProperty('--grid-cols', cells);

  for (let i = 0; i < cells ** 2; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('mouseover', sketch);
    cell.addEventListener('mousedown', sketch);
    container.append(cell);
  }
}

function sketch({ type, target }) {
  if (type === 'mouseover' && !isDown) return;

  const modes = {
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

function loadInitialValues() {
  colorPicker.value = currentColor;
  gridRange.value = currentSize;
  gridRangeOutput.innerHTML = `${currentSize} x ${currentSize}`;
  createGrid(currentSize);
}

// Load the application
initialize();
