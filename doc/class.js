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
        this.stop = false;
        this.ab = null;
        this.stopBlink = false;
        this.boundEventHandller = this.clickColor.bind(this);
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
        // this.abortController = new AbortController();
        // return this.abortController;
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
        this.colorsNode.removeEventListener("click", this.boundEventHandller);
        if (this.round > 1) {
            this.stopBlink = true;
            this.ab.abort();
        }
        this.stop = true;
        this.setHighestScore();
        this.colorsForEachRound = [];
        this.round = 0;
        this.displayRound();
        this.colorsNode.addEventListener("click", this.boundEventHandller);
    }
    setColorsOfEachRound(n) {
        for (let i = 0; i < n; i++) {
            const randomNumber = this.generateRandomNumber();
            this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
        }
    }
    addBlinkToEachBox() {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                let position;
                for (let i = 0; i < this.colorsForEachRound.length; i++) {
                    if (this.stopBlink) {
                        return;
                    }
                    this.colorsForEachRound[i].style.animationName = "blink";
                    position = this.colorsForEachRound[i].dataset.position;
                    this.playSound(position);
                    yield this.waitBlink(0.3);
                    this.colorsForEachRound[i].style.animationName = "none";
                    yield this.waitBlink(0.1);
                }
            }), 2000);
            this.ab = new AbortController();
            this.ab.signal.addEventListener("abort", () => {
                console.log("timer");
                clearTimeout(timer);
            });
            return this.colorsForEachRound;
        });
    }
    waitBlink(sec) {
        return new Promise(function (res) {
            setTimeout(res, sec * 1000);
        });
    }
    clickColor(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            let targetColor;
            if (target.classList.contains("trapezoid")) {
                targetColor = this.colorsForEachRound.shift();
            }
            else {
                return;
            }
            if (target === targetColor) {
                const position = target.dataset.position;
                this.playSound(position);
            }
            if (target !== targetColor && target.classList.contains("trapezoid")) {
                this.playSound("lose");
                this.stop = true;
                this.setRoundToZero();
                this.colorsNode.removeEventListener("click", this.boundEventHandller);
            }
            if (!this.colorsForEachRound.length && target === targetColor) {
                this.setColorsOfEachRound(this.getRound());
                yield this.addBlinkToEachBox();
            }
        });
    }
    playSound(position) {
        const audio = document.querySelector(`audio[data-audio="${position}"]`);
        audio.currentTime = 0.1;
        audio.play();
    }
}