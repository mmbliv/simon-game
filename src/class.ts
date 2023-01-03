export class Simon {
  public colorBoxes: NodeListOf<HTMLDivElement>;
  public colorsForEachRound: HTMLDivElement[];
  public round: number;
  public roundNode: HTMLDivElement;
  public scoreNode: HTMLDivElement;
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
    await this.waitBlink(2);
    console.log(this.colorsForEachRound);
    for (let i = 0; i < this.colorsForEachRound.length; i++) {
      // await this.waitBlink(1);
      // this.colorsForEachRound[i].classList.add("blink");
      this.colorsForEachRound[i].style.animationName = "blink";
      // console.log(this.colorsForEachRound[i].style.animationName, 9);
      // console.log(i, "aa");

      await this.waitBlink(0.3);
      // console.log("wait");
      // console.log(i, "bb");
      // console.log(this.colorsForEachRound[i].style.animationName, 10);
      // this.colorsForEachRound[i].classList.remove("blink");
      this.colorsForEachRound[i].style.animationName = "none";
      await this.waitBlink(0.1);

      // console.log(this.colorsForEachRound[i].style.animationName, 10);
      // console.log(this.colorsForEachRound[i], i);
      // await this.waitBlink(1);
      // console.log(i, "cc");
    }
    return this.colorsForEachRound;
  }
  waitBlink(sec: number) {
    return new Promise(function (res) {
      setTimeout(res, sec * 1000);
    });
  }
}
