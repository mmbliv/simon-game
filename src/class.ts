export class Simon {
  public colorBoxes: NodeListOf<HTMLDivElement>;
  public colorsForEachRound: HTMLDivElement[];
  constructor(colorBoxes: NodeListOf<HTMLDivElement>) {
    this.colorBoxes = colorBoxes;
    this.colorsForEachRound = [];
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
      this.colorsForEachRound[i].classList.add("blink");
      console.log(i, "aa");
      await this.waitBlink(5);
      console.log("wait");
      console.log(i, "bb");
      console.log(this.colorsForEachRound[i], i);
      this.colorsForEachRound[i].classList.remove("blink");
      console.log(this.colorsForEachRound[i], i);
      // await this.waitBlink(1);
      console.log(i, "cc");
    }
  }
  waitBlink(sec: number) {
    return new Promise(function (res) {
      setTimeout(res, sec * 1000);
    });
  }
}
