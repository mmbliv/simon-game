var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Simon {
    constructor(colorBoxes, roundNode, scoreNode) {
        this.colorBoxes = colorBoxes;
        this.colorsForEachRound = [];
        this.round = 0;
        this.roundNode = roundNode;
        this.scoreNode = scoreNode;
        this.abortController = {};
    }
    setRoundToZero() {
        this.round = 0;
    }
    setAbortController() {
        this.abortController = new AbortController();
        return this.abortController;
    }
    getRound() {
        this.round++;
        // this.roundNode.textContent = this.round.toString();
        this.displayRound();
        return this.round;
    }
    displayRound() {
        this.roundNode.textContent = this.round.toString();
    }
    generateRandomNumber() {
        return Math.floor(Math.random() * 4);
    }
    generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    setRandomColorToEachBox() {
        this.colorBoxes.forEach((i) => {
            i.style.backgroundColor = this.generateRandomColor();
        });
    }
    start() {
        this.setRandomColorToEachBox();
    }
    reSetGame() {
        let signal;
        if (this.round > 1) {
            const abortController = this.setAbortController();
            signal = abortController.signals;
        }
        this.colorsForEachRound = [];
        this.round = 0;
        this.displayRound();
        return signal;
        // this.cleanCheck();
        // this.getRound();
    }
    // cleanCheck() {
    //   for (let i of this.colorBoxes) {
    //     i.classList.remove("check");
    //   }
    // }
    setColorsOfEachRound(n) {
        // this.cleanCheck();
        for (let i = 0; i < n; i++) {
            const randomNumber = this.generateRandomNumber();
            this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
        }
    }
    addBlinkToEachBox() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.abortController.signal) {
                return;
            }
            else {
                yield this.waitBlink(2);
                for (let i = 0; i < this.colorsForEachRound.length; i++) {
                    this.colorsForEachRound[i].style.animationName = "blink";
                    yield this.waitBlink(0.3);
                    this.colorsForEachRound[i].style.animationName = "none";
                    yield this.waitBlink(0.1);
                }
                return this.colorsForEachRound;
            }
        });
    }
    waitBlink(sec) {
        return new Promise(function (res) {
            setTimeout(res, sec * 1000);
        });
    }
}
