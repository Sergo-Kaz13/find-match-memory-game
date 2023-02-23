const items = [
  "./images/22221cat_98748.png",
  "./images/22251rat_98787.png",
  "./images/animal_elephant_2739.png",
  "./images/pet_aquarium_fishbowl_fish_icon_124628.png",
  "./images/pet_rat_mouse_11098.png",
  "./images/pet-animal-pets-fish-gold_108547.png",
  "./images/pet-animal-pets-paw-dog-cat-paws_108559.png",
  "/images/russel_dog_animal_15954.png",
];
let startTime = 0;
const usedCardIndices = [];
let firstValue = null;
let activeCard = null;
let row = 0;
let col = 0;

const timerWindow = document.querySelector(".timer");
const gameCards = document.querySelectorAll("td");
const gameBoard = document.querySelector(".game-board");
const gameBlock = document.querySelector(".game-block");
const moves = document.querySelector(".moves");
const gameBoardTbody = document.querySelector(".game-board > tbody");

const btnStart = document.createElement("button");

btnStart.innerText = "start";
btnStart.classList.add("btn-start");
btnStart.addEventListener("click", startGame);
gameBoard.addEventListener("click", checkMatch);
gameBlock.append(btnStart);

for (let i = 0; i < items.length; i++) {
  for (let j = 0; j < 2; j++) {
    let randomNum;

    do {
      randomNum = Math.floor(Math.random() * 16);
    } while (usedCardIndices.includes(randomNum));

    usedCardIndices.push(randomNum);
    gameCards[randomNum].innerHTML = `<img src="${items[i]}" alt="" />`;
  }
}

// gameCards.forEach((el) => {
//   el.classList.add("hidden");
// });
createFieldGame(row, col);

function checkMatch(e) {
  if (e.target.tagName === "TABLE") return;

  let el = e.target;
  let elData;

  if (el.tagName !== "TD") {
    el = e.target.closest("td");
  }

  elData = el.firstChild.src;

  if (!firstValue) {
    firstValue = elData;
    activeCard = el;
    activeCard.classList.remove("hidden");
  } else if (elData === firstValue) {
    gameBoard.classList.add("disabled");
    el.classList.remove("hidden");
    setTimeout(() => {
      gameBoard.classList.remove("disabled");
      firstValue = null;
      activeCard.innerHTML = ``;
      activeCard.style = "opacity: 0.5";
      activeCard = null;
      el.innerHTML = ``;
      el.style = "opacity: 0.5";
    }, 2000);
  } else {
    gameBoard.classList.add("disabled");
    el.classList.remove("hidden");
    setTimeout(() => {
      gameBoard.classList.remove("disabled");
      el.classList.add("hidden");
      activeCard.classList.add("hidden");
      activeCard = null;
      firstValue = null;
    }, 2000);
  }
}

function updateTimer() {
  if (!startTime) {
    startTime = Date.now();
  }
  timerWindow.innerText = new Date(Date.now() - startTime)
    .toUTCString()
    .match(/\d\d:\d\d:\d\d/)[0];
  requestAnimationFrame(updateTimer);
}

function startGame() {
  updateTimer();
  btnStart.remove();
}

function createFieldGame(w, h) {
  gameBoardTbody.innerHTML = ``;

  for (let i = 0; i < w; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < h; j++) {
      const td = document.createElement("td");
      td.innerText = j;
      tr.append(td);
    }

    gameBoardTbody.append(tr);
  }
}
