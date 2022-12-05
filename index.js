// Import stylesheets
import './style.css';

// Write Javascript code!
// const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

// convert to react
// these are state variables since they change
let currentColor = '#333333';
let currentMode = 'color';
let currentSize = 16;

let isDown = false;
document.body.onmousedown = () => (isDown = true);
document.body.onmouseup = () => (isDown = false);

const container = document.getElementById('container');
const resetBtn = document.querySelector('#reset');
const colorPicker = document.querySelector('#color-picker');
const colorBtn = document.querySelector('#color');
const rainbowBtn = document.querySelector('#rainbow');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');

colorPicker.addEventListener('change', (e) => setNewColor(e.target.value));
colorBtn.addEventListener('click', () => setNewMode('color'));
rainbowBtn.addEventListener('click', () => setNewMode('rainbow'));
eraserBtn.addEventListener('click', () => setNewMode('eraser'));
clearBtn.addEventListener('click', () => clearGrid());
resetBtn.addEventListener('click', () => getUserInput());

// these are used in jsx event handlers
const setNewColor = (newColor) => (currentColor = newColor);
const setNewMode = (newMode) => (currentMode = newMode);
const setNewSize = (newSize) => (currentSize = newSize);
const getUserInput = () => {
  let userInput = Number.parseInt(prompt(), 10);
  try {
    if (userInput <= 100) {
      setNewSize(userInput);
      clearGrid();
    } else if (!userInput) {
      throw new Error("You can't have an empty input!");
    } else {
      throw new Error("You can't have more than 100 squares!");
    }
  } catch (e) {
    console.error(e)
    alert(e);
  }
};

function createGrid(numberOfSquares = 16) {
  container.style.setProperty('--grid-rows', numberOfSquares);
  container.style.setProperty('--grid-cols', numberOfSquares);
  for (let i = 0; i < numberOfSquares ** 2; i++) {
    const squareDiv = document.createElement('div');
    squareDiv.addEventListener('mouseover', sketch);
    squareDiv.addEventListener('mousedown', sketch);
    container.appendChild(squareDiv);
  }
}

function sketch({ type, target }) {
  if (type === 'mouseover' && !isDown) return;

  let modes = {
    color: currentColor,
    rainbow: generateRandomColor(),
    eraser: '#fefefe',
  };
  target.style.backgroundColor = modes[currentMode];
}

function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

function clearGrid() {
  container.innerHTML = '';
  createGrid(currentSize);
}

function load() {
  createGrid(currentSize);
}

load()



