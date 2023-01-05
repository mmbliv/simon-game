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
  // console.log(simon.getRound());
  simon.setColorsOfEachRound(simon.getRound());
  console.log(simon.round);
  // console.log("jojo");
  let colorList = await simon.addBlinkToEachBox();
  console.log(colorList, "class");
  if (!colorList) {
    return;
  }
  // async function clickColor(e: MouseEvent) {
  //   const target = e.target as HTMLDivElement;
  //   let targetColor;
  //   if (target.classList.contains("trapezoid")) {
  //     targetColor = colorList!.shift();
  //   } else {
  //     return;
  //   }
  //   if (target === targetColor) {
  //     const position = target.dataset.position;
  //     const audio = document.querySelector(
  //       `audio[data-audio="${position}"]`
  //     )! as HTMLAudioElement;
  //     audio.currentTime = 0.1;
  //     audio.play();
  //   }
  //   if (target !== targetColor && target.classList.contains("trapezoid")) {
  //     const audio = document.querySelector(".lose-sound")! as HTMLAudioElement;
  //     audio.play();
  //     colorContainer.removeEventListener("click", clickColor);
  //     simon.setRoundToZero();
  //   }
  //   if (!colorList!.length && target === targetColor) {
  //     simon.setColorsOfEachRound(simon.getRound());

  //     colorList = await simon.addBlinkToEachBox();
  //   }
  // }
  // const controller = simon.setAbortController();
  // const signal = controller.signal;
  // colorContainer.addEventListener("click", simon.clickColor.bind(simon), {
  //   signal: controller.signal,
  // });
  // colorContainer.addEventListener(
  //   "click",
  //   (e) => {
  //     if (simon.stop) {
  //       console.log("aborted");
  //       controller.abort();
  //       simon.stop = false;
  //     } else {
  //       simon.clickColor.call(simon, e);
  //     }
  //   },
  //   { signal: controller.signal }
  // );
  // colorContainer.addEventListener("click", simon.clickColor.bind(simon));
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
export const reStartGame = function () {
  console.log("s");
  simon.reSetGame();
  // simon.stop = false;
  // controller.abort();
  console.log("what");
  // colorContainer.removeEventListener("click", simon.clickColor);
  start();
  // simon.setToggleAbort();
  simon.stopBlink = false;
  // simon.ab = null;
  // simon.stop = true;
};

// export const game = debounce(reStartGame, 1000);
export const game = reStartGame;
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
