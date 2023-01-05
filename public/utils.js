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
        // console.log(simon.getRound());
        simon.setColorsOfEachRound(simon.getRound());
        console.log(simon.round);
        // console.log("jojo");
        let colorList = yield simon.addBlinkToEachBox();
        console.log(colorList, "class");
        if (!colorList) {
            return;
        }
        // async function clickColor(e: MouseEvent) {
        //   const target = e.target as HTMLDivElement;
        //   let targetColor;
        //   if (target.classList.contains("trapezoid")) {
        //     targetColor = colorList!.shift();
        //   } else {
        //     return;
        //   }
        //   if (target === targetColor) {
        //     const position = target.dataset.position;
        //     const audio = document.querySelector(
        //       `audio[data-audio="${position}"]`
        //     )! as HTMLAudioElement;
        //     audio.currentTime = 0.1;
        //     audio.play();
        //   }
        //   if (target !== targetColor && target.classList.contains("trapezoid")) {
        //     const audio = document.querySelector(".lose-sound")! as HTMLAudioElement;
        //     audio.play();
        //     colorContainer.removeEventListener("click", clickColor);
        //     simon.setRoundToZero();
        //   }
        //   if (!colorList!.length && target === targetColor) {
        //     simon.setColorsOfEachRound(simon.getRound());
        //     colorList = await simon.addBlinkToEachBox();
        //   }
        // }
        // const controller = simon.setAbortController();
        // const signal = controller.signal;
        // colorContainer.addEventListener("click", simon.clickColor.bind(simon), {
        //   signal: controller.signal,
        // });
        // colorContainer.addEventListener(
        //   "click",
        //   (e) => {
        //     if (simon.stop) {
        //       console.log("aborted");
        //       controller.abort();
        //       simon.stop = false;
        //     } else {
        //       simon.clickColor.call(simon, e);
        //     }
        //   },
        //   { signal: controller.signal }
        // );
        colorContainer.addEventListener("click", simon.clickColor.bind(simon));
    });
}
// startGame();
export const reStartGame = function () {
    console.log("s");
    simon.reSetGame();
    // simon.stop = false;
    // controller.abort();
    console.log("what");
    // colorContainer.removeEventListener("click", simon.clickColor);
    startGame();
    // simon.setToggleAbort();
    simon.stopBlink = false;
    // simon.ab = null;
    // simon.stop = true;
};
// debounce
function debounce(cb, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => cb(), ms);
    };
}
export const game = debounce(reStartGame, 1000);
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
