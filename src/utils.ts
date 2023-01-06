import { Simon } from "./class.js";

const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;

const round = document.querySelector(".round")! as HTMLDivElement;

const score = document.querySelector(".score")! as HTMLDivElement;

const colorContainer = document.querySelector(".circle")! as HTMLDivElement;

const simon = new Simon(colorBoxes, round, score, colorContainer);
// let controller = simon.setAbortController();

export async function startGame() {
  // simon.start() will display the highestscore, and set random color
  // for each trapezoid box
  simon.start();
  // simon.setColorsOfEachRound(1) will choose one trapezoid to blink to start the game
  simon.setColorsOfEachRound(1);
  // Then wait the trapezoid to blink and make a sound
  await simon.addBlinkToEachBox();
  // let colorList = await simon.addBlinkToEachBox();
  // if (!colorList) {
  //   return;
  // }
}

// debounce
function debounce(cb: () => void, ms: number) {
  let timer: number;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(), ms);
  };
}

// startGame();
// Because the addBlinkToEachBox method in startGame function is asynchronous,
// when we keep hitting the start button, those blink and sound-making will happen many times.
// So, we use a debounce function to make startGame fucntion can only be triggered once every one second.
// The reason that we did not wrap the reSetGame method into the debounce funtion is because
// sometimes we want to stop the game immediately, if we put reSetGame into dedounce funtion,
// there will be a delay of this feature.
const start = debounce(startGame, 1000);
export const game = function () {
  simon.reSetGame();
  start();
};

// show instruction
const filter = document.querySelector(".js-filter")! as HTMLDivElement;
const card = document.querySelector(".js-instruction-card")! as HTMLDivElement;
export const showInstruction = function () {
  filter.classList.add("filter-show");
  card.classList.add("card-show");
};
// close instruction
export const closeInstruction = function () {
  filter.classList.remove("filter-show");
  card.classList.remove("card-show");
};
