
export function renderGameControls(sudoku, timer) {
  const gameControls = ["new-game", "show-solution", "undo", "show-errors", "reset"];
  for (const controlElement of gameControls) {
    let button = document.createElement("button");
    button.id = `${controlElement}-button`;
    button.innerText = `${controlElement[0].toUpperCase()}${controlElement.slice(1).replace("-", " ")}`;
    button.classList.add(`${controlElement}-button`);
    if (controlElement === "new-game") {
      button.addEventListener("click", () => {
        timer.startTimer();
        sudoku.setNewGame();
      });
      document.querySelector(".middle-new-game-section")
        .append(button);
    } else if (controlElement === "show-solution") {
      button.addEventListener("click", () => {
        sudoku.showSolution();
      })
      const rightSectionList = document.querySelector(".right-section");
      rightSectionList.insertBefore(button, rightSectionList.children[0]);
    } else if (controlElement === "show-errors") {
      renderToggleButton();
      const toggleSwitch = document.getElementById("show-errors-toggle");
      toggleSwitch.addEventListener("click", () => {
        if (toggleSwitch.checked) {
          sudoku.checkErrors = true;
          sudoku.eligibleForHighscore = false;
          sudoku.displayErrors();
        }
        else {
          sudoku.checkErrors = false;
          sudoku.displayErrors();
        };
      });
    } else {
      const gameControlElements = document.getElementById("game-controls")
      if (controlElement === "undo") {
        button.addEventListener("click", () => {
          sudoku.undoPlay();
        });
      } else if (controlElement === "reset") {
        button.addEventListener("click", () => {
          if (sudoku.initialTileSet) {
            sudoku.resetBoard();
          };
        });
      };
      gameControlElements.append(button);
    };
  };
};

function renderToggleButton() {
  let textToggleSwitch = document.createElement("div");
  textToggleSwitch.classList.add("toggle-switch-text");
  textToggleSwitch.innerText = "Show errors"

  let toggleLabel = document.createElement("label");
  toggleLabel.htmlFor = "show-errors-toggle"
  let toggleSwitch = document.createElement("input");
  toggleSwitch.type = "checkbox";
  toggleSwitch.id = "show-errors-toggle";

  const rightSectionList = document.querySelector(".right-new-game-section");
  rightSectionList.insertBefore(toggleLabel, rightSectionList.children[0]);
  rightSectionList.insertBefore(toggleSwitch, rightSectionList.children[0]);
  rightSectionList.insertBefore(textToggleSwitch, rightSectionList.children[0]);
};