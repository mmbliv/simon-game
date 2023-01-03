import { Simon } from "./class.js";
const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;
const colorContainer = document.querySelector(".circle")! as HTMLDivElement;
const simon = new Simon(colorBoxes);
// console.log(simon.generateRandomNumber());
// simon.setRandomColorToEachBox();
// console.log(simon);
// console.dir(colorBoxes[0]);
export async function startGame() {
  simon.start();
  simon.setColorsOfEachRound(3);
  //   console.log(simon.colorsForEachRound);
  const colorList = await simon.addBlinkToEachBox();
  //   console.log(colorList);
  //   console.log(simon.colorsForEachRound);
  function clickColor(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    const targetColor = colorList.shift();
    // console.log(colorList.length);
    // console.log("99999");
    if (!colorList.length) {
      console.log("you are right");
      colorContainer.removeEventListener("click", clickColor);
    }
    if (target !== targetColor) {
      colorContainer.removeEventListener("click", clickColor);
      console.log("hhhhh");
    }
  }
  colorContainer.addEventListener("click", clickColor);
}
// startGame();
