function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.state = this.defineTheState();
    this.statistic = 0;
  }

  defineTheState() {
    return floor(random(2));
  }

  renderCell() {
    let x = this.i * resolution;
    let y = this.j * resolution;
    if (this.state === 0) {
      fill(70);
      stroke(25);
      rect(x, y, resolution - 1, resolution - 1);
    } else if (this.state === 1) {
      fill(222);
      stroke(255);
      rect(x, y, resolution - 1, resolution - 1);
    }
  }

  renderDeadCell() {
    let x = this.i * resolution;
    let y = this.j * resolution;
    fill(255, 51, 102);
    stroke(25);
    rect(x, y, resolution - 1, resolution - 1);
  }

  renderNewCell() {
    let x = this.i * resolution;
    let y = this.j * resolution;
    fill(0, 0, 255);
    stroke(25);
    rect(x, y, resolution - 1, resolution - 1);
  }
}

let grid;
let cols;
let rows;
let generation = 0;
let resolution = 20;
let godMode;

function setup() {
  createCanvas(800, 400);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  document.querySelector(".god-mod").addEventListener("change", () => {
    godMode = document.querySelector(".god-mod").checked;
  });
}

function draw() {
  background(0);
  frameRate(120);

  let newI = Math.ceil(mouseX / resolution);
  let newJ = Math.ceil(mouseY / resolution);

  if (mouseIsPressed) {
    if (newI <= cols && newJ <= rows && newI > 0 && newJ > 0)
      grid[newI - 1][newJ - 1].state = 1;
  }
  if (godMode) {
    if (newI <= cols && newJ <= rows && newI > 0 && newJ > 0)
      grid[newI - 1][newJ - 1].state = 1;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].renderCell();
    }
  }

  // Rules:
  // 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
  // 2. Any live cell with two or three live neighbors lives on to the next generation.
  // 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
  // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j].state;

      // Count live neighbors
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        grid[i][j].newState = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        grid[i][j].newState = 0;
      } else {
        grid[i][j].newState = state;
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].state != grid[i][j].newState) {
        grid[i][j].statistic++; // Statistic about cell state changes
      }

      if (grid[i][j].state > grid[i][j].newState) {
        grid[i][j].renderDeadCell();
      } else if (grid[i][j].state < grid[i][j].newState) {
        grid[i][j].renderNewCell();
      }

      grid[i][j].state = grid[i][j].newState;
    }
  }
  document.querySelector(
    ".generation"
  ).textContent = `Generation: ${generation++}`;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue;
      } else {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row].state;
      }
    }
  }
  return sum;
}
