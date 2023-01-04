import { reSetGame } from "./utils.js";
import { showInstruction } from "./utils.js";
import { closeInstruction } from "./utils.js";
const startBtn = document.querySelector(".btn-start");
const instructionBtn = document.querySelector(".how-play");
const closeBtn = document.querySelector(".close-btn");
startBtn.addEventListener("click", reSetGame);
instructionBtn.addEventListener("click", showInstruction);
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", closeInstruction);
