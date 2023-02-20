const items = ["A", "B", "C", "D", "E", "F", "G", "J"];
const usedCardIndices = [];
let firstValue = null;
let activeCard = null;

const gameCards = document.querySelectorAll("td");
const gameBoard = document.querySelector(".game-board");

gameBoard.addEventListener("click", checkMatch);

for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < 2; j++) {
    let randomNum;

    do {
      randomNum = Math.floor(Math.random() * 16);
    } while (usedCardIndices.includes(randomNum));

    usedCardIndices.push(randomNum);
    gameCards[randomNum].innerText = items[i];
  }
}

setTimeout(() => {
  gameCards.forEach((el) => {
    el.classList.add("hidden");
  });
}, 3000);

function checkMatch(e) {
  if (!firstValue) {
    firstValue = e.target.innerText;
    activeCard = e.target;
    activeCard.classList.remove("hidden");
  } else if (e.target.innerText === firstValue) {
    e.target.classList.remove("hidden");
    setTimeout(() => {
      firstValue = null;
      activeCard.innerText = "";
      activeCard.style = "background: yellow";
      activeCard = null;
      e.target.innerText = "";
      e.target.style = "background: yellow";
    }, 2000);
  } else {
    e.target.classList.remove("hidden");
    setTimeout(() => {
      e.target.classList.add("hidden");
      activeCard.classList.add("hidden");
      activeCard = null;
      firstValue = null;
    }, 2000);
  }
}
