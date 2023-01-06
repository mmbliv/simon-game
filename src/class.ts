export class Simon {
  public colorBoxes: NodeListOf<HTMLDivElement>;
  public colorsForEachRound: HTMLDivElement[];
  public round: number;
  public roundNode: HTMLDivElement;
  public scoreNode: HTMLDivElement;
  public colorsNode: HTMLDivElement;
  public abortController: AbortController | undefined;
  public boundEventHandller: (e: MouseEvent) => Promise<void>;
  constructor(
    colorBoxes: NodeListOf<HTMLDivElement>,
    roundNode: HTMLDivElement,
    scoreNode: HTMLDivElement,
    colorsNode: HTMLDivElement
  ) {
    this.colorBoxes = colorBoxes;
    this.colorsForEachRound = [];
    this.round = 1;
    this.roundNode = roundNode;
    this.scoreNode = scoreNode;
    this.colorsNode = colorsNode;
    this.abortController = undefined;
    this.boundEventHandller = this.clickColor.bind(this);
  }

  setHighestScore() {
    if (!localStorage.high) {
      localStorage.setItem("high", `${this.round}`);
    } else {
      if (this.round > +localStorage.high) {
        localStorage.setItem("high", `${this.round}`);
      }
    }
    this.scoreNode.textContent = localStorage.getItem("high");
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
    // if (this.round > 1) {
    //   this.abortController!.abort();
    // }
    this.abortController?.abort();
    this.setHighestScore();
    this.colorsForEachRound = [];
    this.round = 1;
    this.displayRound();
    this.abortController = new AbortController();
    this.colorsNode.addEventListener("click", this.boundEventHandller);
  }
  setColorsOfEachRound(n: number) {
    for (let i = 0; i < n; i++) {
      const randomNumber = this.generateRandomNumber();
      this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
    }
  }
  async addBlinkToEachBox() {
    // In order to abort this blink and sound-making in the middle of the game,
    // we wrap those process into a timer.
    // And we use AbortController API to listen to the abort event.

    const timer = setTimeout(async () => {
      let position;
      for (let i = 0; i < this.colorsForEachRound.length; i++) {
        this.colorsForEachRound[i].style.animationName = "blink";
        position = this.colorsForEachRound[i].dataset.position!;
        await this.waitBlink(0.3);
        await this.playSound(position);
        this.colorsForEachRound[i].style.animationName = "none";
        await this.waitBlink(0.1);
      }
    }, 2000);
    // When hit the start button in the middle of the game(this.round>1)
    // the abort event will be triggered.
    // Then the timer will bed cleared.
    // this.abortController = new AbortController();
    this.abortController!.signal.addEventListener("abort", () => {
      // console.log("timer");
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

    // We need to make sure that we click on the trapezoid element.
    // And then shift one element out from colorlist that we just generated
    // Otherwise, return
    if (target.classList.contains("trapezoid")) {
      targetColor = this.colorsForEachRound!.shift();
    } else {
      return;
    }

    // If we hit the right button, play the sound
    if (target === targetColor) {
      const position = target.dataset.position!;
      target.style.animationName = "blink";
      await this.waitBlink(0.1);
      console.log(target.style.animationName);
      await this.playSound(position);
      target.style.animationName = "none";
    }

    // If hit the wrong button, play the lose sound.
    // Remove the eventlistener of this.colorNode, otherwise it will keep add eventlistener to it.
    if (target !== targetColor) {
      await this.playSound("lose");
      this.abortController?.abort();
      this.round = 1;
      this.colorsNode.removeEventListener("click", this.boundEventHandller);
    }

    // After we click all the button right in each round, we
    // use this.setColorsOfEachRound to add another colorlist,
    // and wait those colors to be displayed with asych function this.addBlinkToEachBox
    if (!this.colorsForEachRound!.length && target === targetColor) {
      this.setColorsOfEachRound(this.getRound());
      await this.addBlinkToEachBox();
    }
  }

  async playSound(position: string) {
    const audio = document.querySelector(
      `audio[data-audio="${position}"]`
    )! as HTMLAudioElement;
    audio.currentTime = 0;
    audio.play();
    // await this.waitBlink(1);
    // audio.pause();
  }
}
