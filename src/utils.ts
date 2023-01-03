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
    // console.log(colorList.length);
    // console.log("99999");
    if (!colorList.length) {
      simon.setColorsOfEachRound(simon.getRound());
      colorList = await simon.addBlinkToEachBox();
      //   console.log("you are right");
      //   colorContainer.removeEventListener("click", clickColor);
    }
    if (target !== targetColor) {
      colorContainer.removeEventListener("click", clickColor);
      console.log("hhhhh");
    }
  }
  colorContainer.addEventListener("click", clickColor);
}
// startGame();
