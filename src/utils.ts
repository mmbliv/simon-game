import { Simon } from "./class.js";

const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;
const round = document.querySelector(".round")! as HTMLDivElement;
const score = document.querySelector(".score")! as HTMLDivElement;
const colorContainer = document.querySelector(".circle")! as HTMLDivElement;
const simon = new Simon(colorBoxes, round, score, colorContainer);

export async function startGame() {
  simon.start();
  // console.log(simon.getRound());
  simon.setColorsOfEachRound(simon.getRound());
  console.log(simon.round);
  console.log("jojo");
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
  let controller = simon.setAbortController();
  colorContainer.addEventListener(
    "click",
    (e) => {
      if (simon.stop) {
        controller.abort();
        simon.stop = false;
      } else {
        simon.clickColor.call(simon, e);
      }
    },
    { signal: controller.signal }
  );
}
// startGame();
export const reStartGame = function () {
  // console.log("s");
  simon.reSetGame();
  startGame();
  simon.setToggleAbort();
  // simon.stop = true;
};
// debounce
function debounce(cb: () => void, ms: number) {
  let timer: number;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(), 1000);
  };
}
export const game = debounce(reStartGame, 1000);
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
