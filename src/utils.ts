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
export async function startGame() {
  //   let round = 1;
  simon.start();
  simon.setColorsOfEachRound(simon.getRound());
  //   console.log(simon.colorsForEachRound);
  let colorList = await simon.addBlinkToEachBox();
  //   console.log(colorList);
  //   console.log(simon.colorsForEachRound);
  async function clickColor(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    const targetColor = colorList.shift();
    // console.dir(target, "999999999");
    // console.log(colorList.length);

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
    if (target !== targetColor) {
      const audio = document.querySelector(".lose-sound")! as HTMLAudioElement;
      audio.play();
      colorContainer.removeEventListener("click", clickColor);
      console.log("hhhhh");
    }
    if (!colorList.length && target === targetColor) {
      simon.setColorsOfEachRound(simon.getRound());
      colorList = await simon.addBlinkToEachBox();
      //   console.log("you are right");
      //   colorContainer.removeEventListener("click", clickColor);
    }
  }
  colorContainer.addEventListener("click", clickColor);
}
// startGame();
export const reSetGame = function () {
  simon.reSetGame();

  startGame();
};
