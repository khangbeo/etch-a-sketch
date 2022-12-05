// Import stylesheets
import './style.css';

// Write Javascript code!
// const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

// convert to react
// these are state variables since they change
let currentColor = '333333';
let currentMode = 'black';
let currentSize = 16;

let isDown = false;
document.body.onmousedown = () => (isDown = true);
document.body.onmouseup = () => (isDown = false);

const container = document.getElementById('container');
const resetBtn = document.querySelector('#reset');
const blackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');

blackBtn.addEventListener('click', () => setNewMode('black'));
rainbowBtn.addEventListener('click', () => setNewMode('rainbow'));
eraserBtn.addEventListener('click', () => setNewMode('eraser'));
clearBtn.addEventListener('click', () => clearGrid());
resetBtn.addEventListener('click', () => getUserInput());

// these are used in jsx event handlers
const setNewMode = (newMode) => (currentMode = newMode);
const setNewSize = (newSize) => (currentSize = newSize);
const getUserInput = () => {
  let userInput = Number.parseInt(prompt(), 10);
  try {
    if (userInput <= 100) {
      setNewSize(userInput);
      reset(userInput);
    } else if (!userInput) {
      throw new Error("You can't have an empty input!");
    } else {
      throw new Error("You can't have more than 100 squares!");
    }
  } catch (e) {
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
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  let modes = {
    black: `#${currentColor}`,
    rainbow: `#${randomColor}`,
    eraser: `#fefefe`,
  };
  target.style.backgroundColor = modes[currentMode];
}

function reset() {
  clearGrid();
}

function clearGrid() {
  container.innerHTML = '';
  createGrid(currentSize);
}

createGrid(currentSize);
