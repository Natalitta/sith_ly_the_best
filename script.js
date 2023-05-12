import cardData from "./cardData.json" assert { type: "json" };

const wrapper = document.getElementById("wrapper");
const easyMode = document.getElementById("easy");
const mediumMode = document.getElementById("medium");
const hardMode = document.getElementById("hard");

let clicks = 0;
let choiceOne = "";
let choiceTwo = "";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

function init(mode) {
  easyMode.remove();
  mediumMode.remove();
  hardMode.remove();
  let cardArray = cardData;
  let newArr = [...cardArray];

  if (mode === "easy") {
    newArr = cardArray.slice(0, 12);
    wrapper.style.gridTemplateColumns = `repeat(4, 1fr)`;
  }

  if (mode === "medium") {
    newArr = cardArray.slice(0, 20);
    wrapper.style.gridTemplateColumns = `repeat(5, 1fr)`;
  }

  const shuffledCards = shuffleArray(newArr);

  shuffledCards.forEach((card) => {
    const element = document.createElement("div");

    element.classList.add("flip-card");

    const html = `
    <div data-name=${card.data} class="flip-card-inner">
      <div class="flip-card-front">
        <img
          class="card-image"
          src="assets/images/cardfront.jpg"
          alt="front card image"
        />
      </div>
      <div class="flip-card-back">
        <img
          class="card-image"
          src="assets/images/${card.image}"
          alt="${card.name}"
        />
        <div class="name-container">
          <span class="name">${card.name}</span>
        </div>
      </div>
    </div>
  `;

    element.innerHTML = html;

    element.addEventListener("click", flipCard);
    wrapper.appendChild(element);
  });
}

function gameTimer(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function flipCard(e) {
  const element = e.target.closest(".flip-card-inner");
  element.classList.toggle("isFlipped");

  if (clicks === 0) {
    choiceOne = element.dataset.name;
  }

  if (clicks === 1) {
    choiceTwo = element.dataset.name;
  }

  clicks++;

  if (clicks === 2) {
    if (choiceOne === choiceTwo) {
      const cards = document.querySelectorAll(`[data-name=${choiceOne}]`);

      cards.forEach((card) => card.classList.add("fixed"));
    }

    await gameTimer(1000);

    const allCards = document.querySelectorAll(".flip-card-inner");
    allCards.forEach((card) => card.classList.remove("isFlipped"));

    clicks = 0;
    choiceOne = "";
    choiceTwo = "";
  }

  const { name } = element.dataset;
}

/* Timer function counts playing time */
let timer;
let ele = document.getElementById("timer");

(function(){
  let sec = 0;
  timer = setInterval(()=>{
    ele.innerHTML = "00:"+sec;
    sec ++;
  }, 1000) //each one second
})()

function pause() {
  clearInterval(timer)
}

easyMode.addEventListener("click", () => init("easy"));
mediumMode.addEventListener("click", () => init("medium"));
hardMode.addEventListener("click", () => init("hard"));
