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
        this.round = 1;
        this.roundNode = roundNode;
        this.scoreNode = scoreNode;
        // this.abortController = {};
        this.colorsNode = colorsNode;
        // this.clickColor = this.clickColor.bind(this);
        // this.toggleAbort = false;
        // this.stop = false;
        this.abortController = undefined;
        // this.stopBlink = false;
        this.boundEventHandller = this.clickColor.bind(this);
    }
    // setToggleAbort() {
    //   if (this.toggleAbort) {
    //     this.toggleAbort = false;
    //   }
    // }
    setHighestScore() {
        if (!localStorage.high) {
            localStorage.setItem("high", `${this.round}`);
        }
        else {
            if (this.round > +localStorage.high) {
                localStorage.setItem("high", `${this.round}`);
            }
        }
        this.scoreNode.textContent = localStorage.getItem("high");
    }
    // setRoundToZero() {
    //   this.setHighestScore();
    //   this.round = 0;
    // }
    // setAbortController() {
    // this.abortController = new AbortController();
    // return this.abortController;
    // this.abortController = new AbortController();
    // return this.abortController;
    // }
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
        var _a;
        this.colorsNode.removeEventListener("click", this.boundEventHandller);
        // if (this.round > 1) {
        //   this.abortController!.abort();
        // }
        (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
        this.setHighestScore();
        this.colorsForEachRound = [];
        this.round = 1;
        this.displayRound();
        this.abortController = new AbortController();
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
            // In order to abort this blink and sound-making in the middle of the game,
            // we wrap those process into a timer.
            // And we use AbortController API to listen to the abort event.
            const timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                let position;
                for (let i = 0; i < this.colorsForEachRound.length; i++) {
                    // if (this.stopBlink) {
                    //   return;
                    // }
                    this.colorsForEachRound[i].style.animationName = "blink";
                    position = this.colorsForEachRound[i].dataset.position;
                    yield this.waitBlink(0.3);
                    yield this.playSound(position);
                    this.colorsForEachRound[i].style.animationName = "none";
                    yield this.waitBlink(0.1);
                }
            }), 2000);
            // When hit the start button in the middle of the game(this.round>1)
            // the abort event will be triggered.
            // Then the timer will bed cleared.
            // this.abortController = new AbortController();
            this.abortController.signal.addEventListener("abort", () => {
                // console.log("timer");
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            let targetColor;
            // We need to make sure that we click on the trapezoid element.
            // And then shift one element out from colorlist that we just generated
            // Otherwise, return
            if (target.classList.contains("trapezoid")) {
                targetColor = this.colorsForEachRound.shift();
            }
            else {
                return;
            }
            // If we hit the right button, play the sound
            if (target === targetColor) {
                const position = target.dataset.position;
                yield this.playSound(position);
            }
            // If hit the wrong button, play the lose sound.
            // Remove the eventlistener of this.colorNode, otherwise it will keep add eventlistener to it.
            if (target !== targetColor) {
                yield this.playSound("lose");
                // this.stop = true;
                // this.setRoundToZero();
                (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
                this.round = 1;
                this.colorsNode.removeEventListener("click", this.boundEventHandller);
            }
            // After we click all the button right in each round, we
            // use this.setColorsOfEachRound to add another colorlist,
            // and wait those colors to be displayed with asych function this.addBlinkToEachBox
            if (!this.colorsForEachRound.length && target === targetColor) {
                this.setColorsOfEachRound(this.getRound());
                // console.log(this.round);
                yield this.addBlinkToEachBox();
            }
        });
    }
    playSound(position) {
        return __awaiter(this, void 0, void 0, function* () {
            const audio = document.querySelector(`audio[data-audio="${position}"]`);
            audio.currentTime = 0.1;
            // audio.duration
            audio.play();
            yield this.waitBlink(1);
            audio.pause();
        });
    }
}
