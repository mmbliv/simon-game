import { reSetGame } from "./utils.js";
const startBtn = document.querySelector(".btn-start")! as HTMLButtonElement;
startBtn.addEventListener("click", reSetGame);
