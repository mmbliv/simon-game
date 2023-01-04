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
// console.log(simon.generateRandomNumber());
// simon.setRandomColorToEachBox();
// console.log(simon);
// console.dir(colorBoxes[0]);
export function startGame(signal) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            simon.start();
            simon.setColorsOfEachRound(simon.getRound());
            //   console.log(simon.colorsForEachRound);
            // const abortController = simon.setAbortController();
            // const signal = abortController.signal;
            //   let colorList = await simon.addBlinkToEachBox();
            let colorList = yield simon.addBlinkToEachBox();
            if (!colorList) {
                return;
            }
            console.log(colorList, "aaa");
            //   console.log(simon.colorsForEachRound);
            function clickColor(e) {
                return __awaiter(this, void 0, void 0, function* () {
                    const target = e.target;
                    // console.dir(target, "999999999");
                    // console.log(colorList.length);
                    const targetColor = colorList.shift();
                    if (target === targetColor) {
                        const position = target.dataset.position;
                        target.classList.add("check");
                        const audio = document.querySelector(`audio[data-audio="${position}"]`);
                        audio.currentTime = 0.1;
                        audio.play();
                        //   setTimeout(() => audio.play(), 100);
                        //   audio.play();
                    }
                    if (target !== targetColor && target.classList.contains("trapezoid")) {
                        const audio = document.querySelector(".lose-sound");
                        audio.play();
                        colorContainer.removeEventListener("click", clickColor);
                        simon.round = 0;
                        console.log("hhhhh");
                    }
                    if (!colorList.length && target === targetColor) {
                        simon.setColorsOfEachRound(simon.getRound());
                        //   colorList = await simon.addBlinkToEachBox();
                        colorList = yield simon.addBlinkToEachBox();
                        console.log(colorList);
                        //   console.log("you are right");
                        //   colorContainer.removeEventListener("click", clickColor);
                    }
                });
            }
            colorContainer.addEventListener("click", clickColor);
        }
        catch (e) {
            console.log(e);
        }
        //   let round = 1;
    });
}
// startGame();
export const reSetGame = function () {
    //   if (simon.abortController) {
    //     console.log("abort");
    //     simon.abortController.abort();
    //     simon.abortController = null;
    //   }
    const single = simon.reSetGame();
    startGame(single);
    simon.abortController = {};
};
