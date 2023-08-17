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

function debounce(func, delay = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

function initialize() {
  setupEventListeners();
  loadInitialValues();
}

function setupEventListeners() {
  container.onmousedown = () => (isDown = true);
  container.onmouseup = () => (isDown = false);

  colorPicker.addEventListener('input', handleColorPicker);
  gridRange.addEventListener(
    'input',
    debounce((e) => updateSize(e.target.value))
  );
  clearBtn.addEventListener('click', clearGrid);

  modeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      updateMode(this.innerHTML.toLowerCase());
    });
  });
}

function handleColorPicker(e) {
  updateMode('color');
  updateColor(e.target.value);
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
  adjustGridSize(newSize);
  currentSize = newSize;
}

function deactivateAllButtons() {
  modeButtons.forEach((button) => button.classList.remove('active'));
}

function activateButton(button) {
  button.classList.add('active');
}

function adjustGridSize(newSize) {
  const currentTotalCells = container.children.length;
  const requiredTotalCells = newSize * newSize;

  // If newSize is greater, add more cells
  while (currentTotalCells < requiredTotalCells) {
    const cell = document.createElement('div');
    cell.addEventListener('mouseover', sketch);
    cell.addEventListener('mousedown', sketch);
    container.append(cell);
  }

  // If newSize is smaller, remove extra cells
  while (currentTotalCells > requiredTotalCells) {
    container.lastChild.remove();
  }

  Array.from(container.children).forEach((cell) => {
    cell.style.backgroundColor = '';
  });

  container.style.setProperty('--grid-rows', newSize);
  container.style.setProperty('--grid-cols', newSize);
}

function clearGrid() {
  container.innerHTML = '';
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
  adjustGridSize(currentSize);
}

// Load the application
initialize();
