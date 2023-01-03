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
    return ++this.round;
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
  setColorsOfEachRound(n: number) {
    for (let i = 0; i < n; i++) {
      const randomNumber = this.generateRandomNumber();
      this.colorsForEachRound.push(this.colorBoxes[randomNumber]);
    }
  }
  async addBlinkToEachBox() {
    for (let i = 0; i < this.colorsForEachRound.length; i++) {
      // await this.waitBlink(1);
      // this.colorsForEachRound[i].classList.add("blink");
      this.colorsForEachRound[i].style.animationName = "blink";
      // console.log(this.colorsForEachRound[i].style.animationName, 9);
      // console.log(i, "aa");
      await this.waitBlink(1);
      // console.log("wait");
      // console.log(i, "bb");
      // console.log(this.colorsForEachRound[i].style.animationName, 10);
      // this.colorsForEachRound[i].classList.remove("blink");
      this.colorsForEachRound[i].style.animationName = "none";
      await this.waitBlink(0.5);
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
