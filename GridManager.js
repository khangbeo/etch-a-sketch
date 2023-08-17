class GridManager {
  constructor(container) {
    this.container = container;
    this.currentSize = 16; // default grid size
  }

  adjustSize(newSize) {
    const currentTotalCells = this.container.children.length;
    const requiredTotalCells = newSize * newSize;

    while (this.container.children.length < requiredTotalCells) {
      const cell = document.createElement('div');
      cell.addEventListener('mouseover', this.sketch);
      cell.addEventListener('mousedown', this.sketch);
      this.container.append(cell);
    }

    while (this.container.children.length > requiredTotalCells) {
      this.container.lastChild.remove();
    }

    Array.from(this.container.children).forEach((cell) => {
      cell.style.backgroundColor = '';
    });

    this.container.style.setProperty('--grid-rows', newSize);
    this.container.style.setProperty('--grid-cols', newSize);
    this.currentSize = newSize;
  }

  clear() {
    this.container.innerHTML = '';
  }

  sketch({ type, target }, currentColor, currentMode) {
    if (type === 'mouseover' && !isDown) return;

    const modes = {
      color: currentColor,
      rainbow: this.generateRandomColor(),
      eraser: '',
    };

    target.style.backgroundColor = modes[currentMode];
  }
}
