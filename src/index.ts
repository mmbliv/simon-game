import { Simon } from "./class.js";
import { startGame } from "./utils.js";
const colorBoxes = document.querySelectorAll(
  ".trapezoid"
) as NodeListOf<HTMLDivElement>;
const colorContainer = document.querySelector(".circle")! as HTMLDivElement;
const simon = new Simon(colorBoxes);
// console.log(simon.generateRandomNumber());
// simon.setRandomColorToEachBox();
// console.log(simon);
// console.dir(colorBoxes[0]);

startGame();
