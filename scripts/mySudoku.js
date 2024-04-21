import { sudoku } from "./sudoku-class.js"
import { timer } from "./timer.js";
import { renderDifficulty } from "./difficulty.js"
import { renderHighscores } from "./highscores.js";
import { renderGameControls } from "./game-controls.js";

renderDifficulty();
renderHighscores();
renderGameControls(sudoku, timer);
