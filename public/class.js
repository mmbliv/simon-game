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
        this.colorsForEachRound = [];
        this.round = 0;
        this.displayRound();
        // this.getRound();
    }
    setColorsOfEachRound(n) {
        for (let i = 0; i < n; i++) {
            const randomNumber = this.generateRandomNumber();
            this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
        }
    }
    addBlinkToEachBox() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitBlink(2);
            console.log(this.colorsForEachRound);
            for (let i = 0; i < this.colorsForEachRound.length; i++) {
                // await this.waitBlink(1);
                // this.colorsForEachRound[i].classList.add("blink");
                this.colorsForEachRound[i].style.animationName = "blink";
                // console.log(this.colorsForEachRound[i].style.animationName, 9);
                // console.log(i, "aa");
                yield this.waitBlink(0.3);
                // console.log("wait");
                // console.log(i, "bb");
                // console.log(this.colorsForEachRound[i].style.animationName, 10);
                // this.colorsForEachRound[i].classList.remove("blink");
                this.colorsForEachRound[i].style.animationName = "none";
                yield this.waitBlink(0.1);
                // console.log(this.colorsForEachRound[i].style.animationName, 10);
                // console.log(this.colorsForEachRound[i], i);
                // await this.waitBlink(1);
                // console.log(i, "cc");
            }
            return this.colorsForEachRound;
        });
    }
    waitBlink(sec) {
        return new Promise(function (res) {
            setTimeout(res, sec * 1000);
        });
    }
}
