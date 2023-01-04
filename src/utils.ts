import { Simon } from "./class.js";

const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;
const round = document.querySelector(".round")! as HTMLDivElement;
const score = document.querySelector(".score")! as HTMLDivElement;
const colorContainer = document.querySelector(".circle")! as HTMLDivElement;
const simon = new Simon(colorBoxes, round, score);
// console.log(simon.generateRandomNumber());
// simon.setRandomColorToEachBox();
// console.log(simon);
// console.dir(colorBoxes[0]);
export async function startGame(signal: AbortSignal) {
  try {
    simon.start();
    simon.setColorsOfEachRound(simon.getRound());
    //   console.log(simon.colorsForEachRound);
    // const abortController = simon.setAbortController();
    // const signal = abortController.signal;
    //   let colorList = await simon.addBlinkToEachBox();
    let colorList = await simon.addBlinkToEachBox();
    if (!colorList) {
      return;
    }
    console.log(colorList, "aaa");
    //   console.log(simon.colorsForEachRound);
    async function clickColor(e: MouseEvent) {
      const target = e.target as HTMLDivElement;
      // console.dir(target, "999999999");
      // console.log(colorList.length);

      const targetColor = colorList!.shift();
      if (target === targetColor) {
        const position = target.dataset.position;
        target.classList.add("check");
        const audio = document.querySelector(
          `audio[data-audio="${position}"]`
        )! as HTMLAudioElement;
        audio.currentTime = 0.1;
        audio.play();
        //   setTimeout(() => audio.play(), 100);
        //   audio.play();
      }
      if (target !== targetColor && target.classList.contains("trapezoid")) {
        const audio = document.querySelector(
          ".lose-sound"
        )! as HTMLAudioElement;
        audio.play();
        colorContainer.removeEventListener("click", clickColor);
        simon.round = 0;
        console.log("hhhhh");
      }
      if (!colorList!.length && target === targetColor) {
        simon.setColorsOfEachRound(simon.getRound());
        //   colorList = await simon.addBlinkToEachBox();

        colorList = await simon.addBlinkToEachBox();
        console.log(colorList);

        //   console.log("you are right");
        //   colorContainer.removeEventListener("click", clickColor);
      }
    }
    colorContainer.addEventListener("click", clickColor);
  } catch (e) {
    console.log(e);
  }
  //   let round = 1;
}
// startGame();
export const reSetGame = function () {
  //   if (simon.abortController) {
  //     console.log("abort");
  //     simon.abortController.abort();
  //     simon.abortController = null;
  //   }
  const single = simon.reSetGame();
  startGame(single);
  simon.abortController = {};
};
