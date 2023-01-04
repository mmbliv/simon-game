import { Simon } from "./class.js";

const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;
const round = document.querySelector(".round")! as HTMLDivElement;
const score = document.querySelector(".score")! as HTMLDivElement;
const colorContainer = document.querySelector(".circle")! as HTMLDivElement;
const simon = new Simon(colorBoxes, round, score);

export async function startGame() {
  simon.start();
  simon.setColorsOfEachRound(simon.getRound());
  let colorList = await simon.addBlinkToEachBox();
  if (!colorList) {
    return;
  }
  async function clickColor(e: MouseEvent) {
    const target = e.target as HTMLDivElement;

    const targetColor = colorList!.shift();
    if (target === targetColor) {
      const position = target.dataset.position;
      const audio = document.querySelector(
        `audio[data-audio="${position}"]`
      )! as HTMLAudioElement;
      audio.currentTime = 0.1;
      audio.play();
    }
    if (target !== targetColor && target.classList.contains("trapezoid")) {
      const audio = document.querySelector(".lose-sound")! as HTMLAudioElement;
      audio.play();
      colorContainer.removeEventListener("click", clickColor);
      simon.setRoundToZero();
    }
    if (!colorList!.length && target === targetColor) {
      simon.setColorsOfEachRound(simon.getRound());

      colorList = await simon.addBlinkToEachBox();
    }
  }
  colorContainer.addEventListener("click", clickColor);
}
// startGame();
export const reSetGame = function () {
  simon.reSetGame();
  startGame();
  simon.abortController = {};
};
