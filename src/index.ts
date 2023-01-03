import { Simon } from "./class.js";
const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;
const simon = new Simon(colorBoxes);
// console.log(simon.generateRandomNumber());
// simon.setRandomColorToEachBox();
// console.log(simon);
// console.dir(colorBoxes[0]);
async function startGame() {
  simon.start();
  simon.setColorsOfEachRound(3);
  console.log(simon.colorsForEachRound);
  await simon.addBlinkToEachBox();
  console.log(simon.colorsForEachRound);
}
startGame();
