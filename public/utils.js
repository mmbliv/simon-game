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
export function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        //   let round = 1;
        simon.start();
        simon.setColorsOfEachRound(simon.getRound());
        //   console.log(simon.colorsForEachRound);
        let colorList = yield simon.addBlinkToEachBox();
        //   console.log(colorList);
        //   console.log(simon.colorsForEachRound);
        function clickColor(e) {
            return __awaiter(this, void 0, void 0, function* () {
                const target = e.target;
                const targetColor = colorList.shift();
                // console.log(colorList.length);
                // console.log("99999");
                if (!colorList.length) {
                    simon.setColorsOfEachRound(simon.getRound());
                    colorList = yield simon.addBlinkToEachBox();
                    //   console.log("you are right");
                    //   colorContainer.removeEventListener("click", clickColor);
                }
                if (target !== targetColor) {
                    colorContainer.removeEventListener("click", clickColor);
                    console.log("hhhhh");
                }
            });
        }
        colorContainer.addEventListener("click", clickColor);
    });
}
// startGame();
