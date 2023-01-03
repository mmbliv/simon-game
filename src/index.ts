// import { Simon } from "./class.js";
import { reSetGame } from "./utils.js";
// import { startGame } from "./utils.js";
const startBtn = document.querySelector(".btn-start")! as HTMLButtonElement;
// const colorBoxes = document.querySelectorAll(
//   ".trapezoid"
// ) as NodeListOf<HTMLDivElement>;
// const colorContainer = document.querySelector(".circle")! as HTMLDivElement;
// const simon = new Simon(colorBoxes);
// console.log(simon.generateRandomNumber());
// simon.setRandomColorToEachBox();
// console.log(simon);
// console.dir(colorBoxes[0]);
// console.log(startBtn);
startBtn.addEventListener("click", reSetGame);
// startGame();
