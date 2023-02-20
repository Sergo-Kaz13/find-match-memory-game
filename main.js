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
    gameCards[randomNum].innerHTML = `<img src="${items[i]}" alt="" />`;
  }
}

setTimeout(() => {
  gameCards.forEach((el) => {
    el.classList.add("hidden");
  });
}, 3000);

function checkMatch(e) {
  if (!firstValue) {
    firstValue = e.target.firstChild.src;
    activeCard = e.target;
    activeCard.classList.remove("hidden");
  } else if (e.target.firstChild.src === firstValue) {
    e.target.classList.remove("hidden");
    setTimeout(() => {
      firstValue = null;
      activeCard.innerHTML = ``;
      activeCard.style = "background: yellow";
      activeCard = null;
      e.target.innerHTML = ``;
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
