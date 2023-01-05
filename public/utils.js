var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Simon } from "./class.js";
const colorBoxes = document.querySelectorAll(".trapezoid");
const round = document.querySelector(".round");
const score = document.querySelector(".score");
const colorContainer = document.querySelector(".circle");
const simon = new Simon(colorBoxes, round, score, colorContainer);
let controller = simon.setAbortController();
export function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        simon.start();
        simon.setColorsOfEachRound(simon.getRound());
        let colorList = yield simon.addBlinkToEachBox();
        if (!colorList) {
            return;
        }
    });
}
// debounce
function debounce(cb, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => cb(), ms);
    };
}
// startGame();
const start = debounce(startGame, 1000);
export const game = function () {
    simon.reSetGame();
    start();
    simon.stopBlink = false;
};
// show instruction
const filter = document.querySelector(".js-filter");
const card = document.querySelector(".js-instruction-card");
export const showInstruction = function () {
    filter.classList.add("filter-show");
    card.classList.add("card-show");
};
// close instruction
export const closeInstruction = function () {
    filter.classList.remove("filter-show");
    card.classList.remove("card-show");
};
