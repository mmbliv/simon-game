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
    constructor(colorBoxes, roundNode, scoreNode, colorsNode) {
        this.colorBoxes = colorBoxes;
        this.colorsForEachRound = [];
        this.round = 0;
        this.roundNode = roundNode;
        this.scoreNode = scoreNode;
        this.abortController = {};
        this.colorsNode = colorsNode;
        this.clickColor = this.clickColor.bind(this);
        this.toggleAbort = false;
    }
    setToggleAbort() {
        if (this.toggleAbort) {
            this.toggleAbort = false;
        }
    }
    setHighestScore() {
        if (!localStorage.high) {
            // console.log("no");
            localStorage.setItem("high", `${this.round}`);
        }
        else {
            // console.log("you");
            if (this.round > +localStorage.high) {
                localStorage.setItem("high", `${this.round}`);
            }
        }
        this.scoreNode.textContent = localStorage.getItem("high");
    }
    setRoundToZero() {
        this.setHighestScore();
        this.round = 0;
    }
    setAbortController() {
        this.abortController = new AbortController();
        return this.abortController;
    }
    getRound() {
        this.round++;
        this.displayRound();
        return this.round;
    }
    displayRound() {
        this.setHighestScore();
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
        this.setHighestScore();
        this.setRandomColorToEachBox();
    }
    reSetGame() {
        // let signal;
        if (this.round > 1) {
            this.toggleAbort = true;
            console.log(this.toggleAbort);
            // console.log(signal, "ooooo");
        }
        this.setHighestScore();
        this.colorsForEachRound = [];
        this.round = 0;
        this.displayRound();
        // return signal;
    }
    setColorsOfEachRound(n) {
        for (let i = 0; i < n; i++) {
            const randomNumber = this.generateRandomNumber();
            this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
        }
    }
    addBlinkToEachBox() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.toggleAbort) {
                // console.log(this)
                // console.log(this.abortController.signal, "00000jjjjj");
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
    clickColor(e) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this, "aaaa");
            const target = e.target;
            let targetColor;
            if (target.classList.contains("trapezoid")) {
                // console.log(this);
                targetColor = this.colorsForEachRound.shift();
                console.log(targetColor);
            }
            else {
                return;
            }
            if (target === targetColor) {
                const position = target.dataset.position;
                const audio = document.querySelector(`audio[data-audio="${position}"]`);
                audio.currentTime = 0.1;
                audio.play();
            }
            if (target !== targetColor && target.classList.contains("trapezoid")) {
                const audio = document.querySelector(".lose-sound");
                audio.play();
                this.colorsNode.addEventListener("click", () => { }, {});
                this.setRoundToZero();
            }
            if (!this.colorsForEachRound.length && target === targetColor) {
                this.setColorsOfEachRound(this.getRound());
                yield this.addBlinkToEachBox();
            }
        });
    }
}
