
export function renderHighscores() {
  const highscoreList = initializeHighscores();
  const difficulties = ["easy", "normal", "hard"];
  const highscoresElement = document.getElementById("highscores");
  highscoresElement.innerHTML = "";
  for (const difficulty of difficulties) {
    let highscore = document.createElement("div");
    let highscoreDifficulty = document.createElement("div");
    highscoreDifficulty.id = `${difficulty}-highscores`;
    // highscoreDifficulty.classList.add(`highscore-${difficulty}`);
    highscoreDifficulty.innerText = `${difficulty[0].toUpperCase()}${difficulty.slice(1)}`;
    highscore.append(highscoreDifficulty);
    for (let i=1; i <= 5; i++) {
      const highscoreTime = document.createElement("div");
      highscoreTime.id = `${difficulty}-${i}`;
      highscoreTime.classList.add(`highscore-${difficulty}`);
      highscoreTime.innerText = `${highscoreList[difficulty][i-1]}`;
      highscore.append(highscoreTime);
    }
    highscoresElement.append(highscore);
  };
};

function initializeHighscores() {
  let highscoreList = JSON.parse(localStorage.getItem("highscores"));
  if (!highscoreList) {
    highscoreList = {
      easy: Array(5).fill('00:00'),
      normal: Array(5).fill('00:00'),
      hard: Array(5).fill('00:00')
    };
    localStorage.setItem("highscores", JSON.stringify(highscoreList));
  };
  return highscoreList;
};