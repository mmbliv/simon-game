export class Simon {
  public colorBoxes: NodeListOf<HTMLDivElement>;
  public colorsForEachRound: HTMLDivElement[];
  public round: number;
  public roundNode: HTMLDivElement;
  public scoreNode: HTMLDivElement;
  public abortController: any;
  constructor(
    colorBoxes: NodeListOf<HTMLDivElement>,
    roundNode: HTMLDivElement,
    scoreNode: HTMLDivElement
  ) {
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
  setColorsOfEachRound(n: number) {
    // this.cleanCheck();
    for (let i = 0; i < n; i++) {
      const randomNumber = this.generateRandomNumber();
      this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
    }
  }
  async addBlinkToEachBox() {
    if (this.abortController.signal) {
      return;
    } else {
      await this.waitBlink(2);
      for (let i = 0; i < this.colorsForEachRound.length; i++) {
        this.colorsForEachRound[i].style.animationName = "blink";

        await this.waitBlink(0.3);
        this.colorsForEachRound[i].style.animationName = "none";
        await this.waitBlink(0.1);
      }
      return this.colorsForEachRound;
    }
  }
  waitBlink(sec: number) {
    return new Promise(function (res) {
      setTimeout(res, sec * 1000);
    });
  }
}
