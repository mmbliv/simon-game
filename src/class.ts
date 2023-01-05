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
  public ab: any;
  public stopBlink: boolean;
  public boundEventHandller: (e: MouseEvent) => Promise<void>;
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
  setColorsOfEachRound(n: number) {
    for (let i = 0; i < n; i++) {
      const randomNumber = this.generateRandomNumber();
      this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
    }
  }
  async addBlinkToEachBox() {
    const timer = setTimeout(async () => {
      let position;
      for (let i = 0; i < this.colorsForEachRound.length; i++) {
        if (this.stopBlink) {
          return;
        }
        this.colorsForEachRound[i].style.animationName = "blink";
        position = this.colorsForEachRound[i].dataset.position!;
        this.playSound(position);
        await this.waitBlink(0.3);
        this.colorsForEachRound[i].style.animationName = "none";
        await this.waitBlink(0.1);
      }
    }, 2000);
    this.ab = new AbortController();
    this.ab.signal.addEventListener("abort", () => {
      console.log("timer");
      clearTimeout(timer);
    });

    return this.colorsForEachRound;
  }
  waitBlink(sec: number) {
    return new Promise(function (res) {
      setTimeout(res, sec * 1000);
    });
  }

  async clickColor(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    let targetColor;
    if (target.classList.contains("trapezoid")) {
      targetColor = this.colorsForEachRound!.shift();
    } else {
      return;
    }
    if (target === targetColor) {
      const position = target.dataset.position!;
      this.playSound(position);
    }
    if (target !== targetColor && target.classList.contains("trapezoid")) {
      this.playSound("lose");
      this.stop = true;
      this.setRoundToZero();
      this.colorsNode.removeEventListener("click", this.boundEventHandller);
    }
    if (!this.colorsForEachRound!.length && target === targetColor) {
      this.setColorsOfEachRound(this.getRound());

      await this.addBlinkToEachBox();
    }
  }
  playSound(position: string) {
    const audio = document.querySelector(
      `audio[data-audio="${position}"]`
    )! as HTMLAudioElement;
    audio.currentTime = 0.1;
    audio.play();
  }
}
