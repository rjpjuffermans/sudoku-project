
export function renderDifficulty() {
  const difficulties = ["easy", "normal", "hard"]
  const headerElement = document.querySelector(".header")
  for (const difficulty of difficulties) {
    let button = document.createElement("button");
    button.id = `${difficulty}-button`;
    button.innerText = `${difficulty[0].toUpperCase()}${difficulty.slice(1)}`;
    button.classList.add("difficulty-button");
    if (difficulty === "normal") {
      button.classList.add('difficulty-toggled');
    }
    button.addEventListener("click", () => {
      document.querySelector(".difficulty-toggled")
        .classList.remove("difficulty-toggled")
      button.classList.add('difficulty-toggled');
    })
    headerElement.append(button)
  };
};