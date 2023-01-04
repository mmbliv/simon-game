import { reSetGame } from "./utils.js";
import { showInstruction } from "./utils.js";
import { closeInstruction } from "./utils.js";
const startBtn = document.querySelector(".btn-start")! as HTMLButtonElement;
const instructionBtn = document.querySelector(
  ".how-play"
)! as HTMLButtonElement;
const closeBtn = document.querySelector(".close-btn");
startBtn.addEventListener("click", reSetGame);
instructionBtn.addEventListener("click", showInstruction);
closeBtn?.addEventListener("click", closeInstruction);
