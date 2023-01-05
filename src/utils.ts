import { Simon } from "./class.js";

const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;
const round = document.querySelector(".round")! as HTMLDivElement;
const score = document.querySelector(".score")! as HTMLDivElement;
const colorContainer = document.querySelector(".circle")! as HTMLDivElement;
const simon = new Simon(colorBoxes, round, score, colorContainer);
let controller = simon.setAbortController();
export async function startGame() {
  simon.start();
  simon.setColorsOfEachRound(simon.getRound());
  let colorList = await simon.addBlinkToEachBox();
  if (!colorList) {
    return;
  }
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

const start = debounce(startGame, 1000);
export const game = function () {
  simon.reSetGame();
  start();
  simon.stopBlink = false;
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
