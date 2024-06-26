export class SudokuSolver {
  initialArray = [...Array(9).keys()].map(value => value+1);
  emptyGrid = Array(9).fill("---------");
  grid;
  valueSequence = {};
  subGrid;
  nRemoveTiles;
  tileSet;
  solution;

  constructor(nRemoveTiles) {
    this.nRemoveTiles = nRemoveTiles;
    this.initializeSudoku();
    this.createSudoku();
  }

  initializeSudoku() {
    this.grid = [...this.emptyGrid];
    this.grid[0] = this.randomizeArray(this.initialArray).join().replaceAll(",","");
  }
  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    };
    return array;
  }
  checkRow(row, value) {
    if (this.grid[row].includes(value)) return false;
    return true;
  }
  checkColumn(column, value) {
    for (let row = 0; row < 9; row++) {
      if (this.grid[row][column] === value) return false;
    };
    return true;
  }
  checkSubGrid(row, column, value) {
    this.generateSubGrid(row, column);
    if (this.subGrid.includes(value)) return false;
    return true;
  }
  generateSubGrid(row, column) {
    const rowId = Math.floor(row / 3) * 3;
    const columnId = Math.floor(column / 3) * 3;
    this.subGrid = this.grid[rowId].slice(columnId, columnId+3) + 
      this.grid[rowId+1].slice(columnId, columnId+3) + 
      this.grid[rowId+2].slice(columnId, columnId+3);
  }
  solveSudoku() {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (!this.valueSequence[`${row}${column}`]) {
          this.valueSequence[`${row}${column}`] = this.randomizeArray(this.initialArray).join().replaceAll(",","");
        };
        if (this.grid[row][column] === "-") {
          for (let i = 0; i < 9; i++) {
            const value = this.valueSequence[`${row}${column}`][i]
            if (this.checkRow(row, value) && this.checkColumn(column, value) && this.checkSubGrid(row, column, value)) {
              this.grid[row] = `${this.grid[row].substring(0, column)}${value}${this.grid[row].substring(column+1)}`;
              if (this.solveSudoku()) return true;
              this.grid[row] = `${this.grid[row].substring(0, column)}-${this.grid[row].substring(column+1)}`;
            };
          };
          return false;
        };
      };
    };
    return true;
  }
  removeValues() {
    let i = 0;
    while (i < this.nRemoveTiles) {
      const row = Math.floor(Math.random() * 9);
      const column = Math.floor(Math.random() * 9);
      if (this.grid[row][column] !== "-") {
        this.grid[row] = `${this.grid[row].substring(0, column)}-${this.grid[row].substring(column+1)}`;
        i++;
      };
    };
  }
  createSudoku() {
    this.solveSudoku();
    this.solution = [...this.grid];
    this.removeValues();
    this.tileSet = [...this.grid];
    this.solveSudoku();
    if (!this.grid.every((item, index) => item === this.solution[index])) {
      console.log('The puzzle is not yet solvable!')
      this.initializeSudoku();
      this.createSudoku();
    };
    console.log('The puzzle is solvable!');
  }
};