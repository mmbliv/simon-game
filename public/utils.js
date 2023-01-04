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
const simon = new Simon(colorBoxes, round, score);
export function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        simon.start();
        simon.setColorsOfEachRound(simon.getRound());
        let colorList = yield simon.addBlinkToEachBox();
        if (!colorList) {
            return;
        }
        function clickColor(e) {
            return __awaiter(this, void 0, void 0, function* () {
                const target = e.target;
                const targetColor = colorList.shift();
                if (target === targetColor) {
                    const position = target.dataset.position;
                    const audio = document.querySelector(`audio[data-audio="${position}"]`);
                    audio.currentTime = 0.1;
                    audio.play();
                }
                if (target !== targetColor && target.classList.contains("trapezoid")) {
                    const audio = document.querySelector(".lose-sound");
                    audio.play();
                    colorContainer.removeEventListener("click", clickColor);
                    simon.setRoundToZero();
                }
                if (!colorList.length && target === targetColor) {
                    simon.setColorsOfEachRound(simon.getRound());
                    colorList = yield simon.addBlinkToEachBox();
                }
            });
        }
        colorContainer.addEventListener("click", clickColor);
    });
}
// startGame();
export const reSetGame = function () {
    simon.reSetGame();
    startGame();
    simon.abortController = {};
};
