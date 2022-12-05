// Import stylesheets
import './style.css';

// Write Javascript code!
// const appDiv = document.getElementById('app');
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

const container = document.getElementById('container');
const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', (e) => {
  let userInput = Number.parseInt(prompt(), 10);
  try {
    if (userInput <= 100) {
      reset(userInput);
    } else if (!userInput) {
      throw new Error("You can't have an empty input!");
    } else {
      throw new Error("You can't have more than 100 squares!");
    }
  } catch (e) {
    alert(e);
  }
});

function createSquares(numberOfSquares = 16) {
  container.style.setProperty('--grid-rows', numberOfSquares);
  container.style.setProperty('--grid-cols', numberOfSquares);
  for (let i = 0; i < numberOfSquares ** 2; i++) {
    const squareDiv = document.createElement('div');
    container.appendChild(squareDiv);
    sketch(squareDiv);
  }
}

function sketch(element) {
  element.addEventListener('mouseenter', (e) => {
    element.classList.add('square-hover');
  });
}

createSquares(16);

function reset(userInput) {
  container.innerHTML = '';
  createSquares(userInput);
}
