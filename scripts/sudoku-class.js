import { timer } from "./timer.js";
import { renderHighscores } from "./highscores.js";
import { mySudokuSolver } from "./mySudokuSolver.js";

class Sudoku {
  board;
  emptyTileSet = [
      '---------',
      '---------',
      '---------',
      '---------',
      '---------',
      '---------',
      '---------',
      '---------',
      '---------'
    ];
  initialTileSet;
  tileSet;
  solution;
  selectedDifficulty;
  numberSelected;
  tileSelected;
  checkErrors = false;
  eligibleForHighscore = true;
  playHistory = [];

  constructor() {
    this.generateBoard(this.emptyTileSet);
    this.generateNumberSelector();
  }

  generateBoard(tileSet) {
    const board = document.getElementById('board')
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let tile = document.createElement("div");
        tile.id = `tile-${i}-${j}`;
        tile.innerText = tileSet[i][j];
        if (tileSet[i][j] === '-') {
          tile.classList.add('tile-empty');
        } else if (!this.initialTileSet || this.initialTileSet[i][j] !== '-') {
          tile.classList.add('tile-set');
        }
        tile = this.addTileBorders(tile, i, 'row');
        tile = this.addTileBorders(tile, j, 'column')
        tile.addEventListener('click', () => this.clickTile(tile))
        board.append(tile)
      };
    };
    this.board = board;
    this.generateTileSet();
  };
  addTileBorders(tile, directionId, className) {
    if ([2, 5].includes(directionId)) {
      tile.classList.add(`${className}-block-divider`);
    } else if ([0, 1, 3, 4, 6, 7].includes(directionId)) {
      tile.classList.add(`${className}-divider`);
    };
    return tile;
  };
  generateNumberSelector() {
    const numberSelector = document.getElementById('number-selector');
    for (let i = 1; i <= 9; i++) {
      let numberId = document.createElement('div');
      numberId.id = i;
      numberId.innerText = i;
      numberId.classList.add('number-selector')
      numberId.addEventListener('click', () => this.selectNumber(numberId))
      numberSelector.append(numberId);
    }
  }

  setNewGame() {
    this.selectedDifficulty = document.querySelector(".difficulty-toggled").innerText.toLowerCase();
    this.generateNewPuzzle();
    document.getElementById('board').innerText = ''
    this.generateBoard(this.initialTileSet)
    this.eligibleForHighscore = true;
    document.getElementById("show-errors-toggle").checked = "";
    this.checkErrors = false;
    this.displayErrors();
  }
  generateNewPuzzle() {
    console.log(this.selectedDifficulty);
    const nDifficulty = this.selectedDifficulty === 'easy' 
      ? 36 : this.selectedDifficulty === 'normal' 
      ? 47 : 58;
    const generatedSudoku = new mySudokuSolver(nDifficulty)
    this.initialTileSet = generatedSudoku.tileSet;
    this.solution = generatedSudoku.solution;
  }

  selectNumber(numberId) {
    if (this.numberSelected) {
      this.numberSelected.classList.remove('selected-number');
    }
    this.numberSelected = numberId;
    this.numberSelected.classList.add('selected-number');
  }
  clickTile(tile) {
    if (this.tileSelected) {
      this.tileSelected.classList.remove('selected-tile');
    }
    this.tileSelected = tile;
    this.tileSelected.classList.add('selected-tile');
    if (this.numberSelected && this.initialTileSet) {
      this.tileSelected.innerText = this.numberSelected.innerText;
      this.tileSelected.classList.remove('tile-empty')
      const coords = this.tileSelected.id.match(/\d/g);
      if (this.solution[coords[0]][coords[1]] == this.numberSelected.innerText) {
        this.tileSelected.classList.remove('tile-incorrect')
        this.tileSelected.classList.add('tile-correct')
      } else {
        this.tileSelected.classList.remove('tile-correct')
        this.tileSelected.classList.add('tile-incorrect')
      }
      this.addToPlayHistory();
      this.generateTileSet();
      this.checkSolution();
      this.displayErrors();
    }
  }
  resetBoard() {
    document.getElementById('board').innerText = '';
    this.generateBoard(this.initialTileSet);
    this.playHistory = [];
  }
  displayErrors() {
    if (this.checkErrors) {
      const incorrectTiles = document.querySelectorAll('.tile-incorrect');
      incorrectTiles.forEach((tile) => {
        tile.classList.remove('tile-incorrect');
        tile.classList.add('tile-show-incorrect');
      });
    } else {
      const incorrectTiles = document.querySelectorAll('.tile-show-incorrect');
      incorrectTiles.forEach((tile) => {
        tile.classList.remove('tile-show-incorrect');
        tile.classList.add('tile-incorrect');
      });
    };
  }
  generateTileSet() {
    let row = '';
    this.tileSet = [];
    this.board.childNodes.forEach(tile => {
      row += tile.innerText;
      if (row.length === 9) {
        this.tileSet = [...this.tileSet, row];
        row = '';
      };
    });
  }
  checkSolution() {
    if (this.tileSet.every((item, index) => item === this.solution[index])) {
      timer.stopTimer();
      console.log('The puzzle is solved!');
      if (this.eligibleForHighscore) {
        this.addTimeToHighscores();
      };
    };
  }
  addToPlayHistory() {
    this.playHistory = [...this.playHistory, this.tileSet]
  }
  undoPlay() {
    if (this.playHistory.length > 0) {
      document.getElementById('board').innerText = '';
      this.generateBoard(this.playHistory[this.playHistory.length-1]);
      this.playHistory.pop();
    };
  }
  addTimeToHighscores() {
    let highscoreList = JSON.parse(localStorage.getItem("highscores"));
    let difficultyHighscore = highscoreList[this.selectedDifficulty];
    const time = timer.timerElement.innerText;
    for (let i = 0; i < 5; i++) {
      if (time < difficultyHighscore[i] || difficultyHighscore[i] === "00:00") {
        difficultyHighscore.pop();
        difficultyHighscore.splice(i, 0, time);
        localStorage.setItem("highscores", JSON.stringify(highscoreList));
        renderHighscores();
        break;
      }
    }
  }
  showSolution() {
    if (this.initialTileSet) {
      document.getElementById('board').innerText = '';
      timer.stopTimer();
      this.generateBoard(this.solution);
      this.playHistory = [];
      this.eligibleForHighscore = false;
    };
  }
};

export const sudoku = new Sudoku();