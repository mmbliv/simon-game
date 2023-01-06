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
// let controller = simon.setAbortController();
export function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        // simon.start() will display the highestscore, and set random color
        // for each trapezoid box
        simon.start();
        // simon.setColorsOfEachRound(1) will choose one trapezoid to blink to start the game
        simon.setColorsOfEachRound(1);
        // Then wait the trapezoid to blink and make a sound
        yield simon.addBlinkToEachBox();
        // let colorList = await simon.addBlinkToEachBox();
        // if (!colorList) {
        //   return;
        // }
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
// Because the addBlinkToEachBox method in startGame function is asynchronous,
// when we keep hitting the start button, those blink and sound-making will happen many times.
// So, we use a debounce function to make startGame fucntion can only be triggered once every one second.
// The reason that we did not wrap the reSetGame method into the debounce funtion is because
// sometimes we want to stop the game immediately, if we put reSetGame into dedounce funtion,
// there will be a delay of this feature.
const start = debounce(startGame, 1000);
export const game = function () {
    simon.reSetGame();
    start();
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
