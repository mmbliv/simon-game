export class Simon {
  public colorBoxes: NodeListOf<HTMLDivElement>;
  public colorsForEachRound: HTMLDivElement[];
  public round: number;
  public roundNode: HTMLDivElement;
  public scoreNode: HTMLDivElement;
  public abortController: any;
  public colorsNode: HTMLDivElement;
  public toggleAbort: boolean;
  public stop: boolean;
  constructor(
    colorBoxes: NodeListOf<HTMLDivElement>,
    roundNode: HTMLDivElement,
    scoreNode: HTMLDivElement,
    colorsNode: HTMLDivElement
  ) {
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
    } else {
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
  setColorsOfEachRound(n: number) {
    for (let i = 0; i < n; i++) {
      const randomNumber = this.generateRandomNumber();
      this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
    }
  }
  async addBlinkToEachBox() {
    if (this.toggleAbort) {
      // console.log(this)
      // console.log(this.abortController.signal, "00000jjjjj");
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

  async clickColor(e: MouseEvent) {
    console.log(this, "aaaa");
    const target = e.target as HTMLDivElement;
    let targetColor;
    if (target.classList.contains("trapezoid")) {
      // console.log(this);
      targetColor = this.colorsForEachRound!.shift();
      console.log(targetColor);
    } else {
      return;
    }
    if (target === targetColor) {
      const position = target.dataset.position;
      const audio = document.querySelector(
        `audio[data-audio="${position}"]`
      )! as HTMLAudioElement;
      audio.currentTime = 0.1;
      audio.play();
    }
    if (target !== targetColor && target.classList.contains("trapezoid")) {
      const audio = document.querySelector(".lose-sound")! as HTMLAudioElement;
      audio.play();
      this.stop = true;
      // this.setAbortController();
      // this.colorsNode.addEventListener(
      //   "click",
      //   () => {
      //     console.log("aborted");
      //     this.abortController.abort();
      //   },
      //   { signal: this.abortController.signal }
      // );
      this.setRoundToZero();
    }
    if (!this.colorsForEachRound!.length && target === targetColor) {
      this.setColorsOfEachRound(this.getRound());

      await this.addBlinkToEachBox();
    }
  }
}
