import P5 from "p5";

const MIN_HEIGHT = 19;
export class Tree {
  public children: Tree[] = [];

  public static p5: P5;

  public x1: number;

  public x2: number;

  public y1: number;

  public y2: number;

  public currAngle: number;

  constructor(
    public height: number,
    public angle: number,
    public parent?: Tree
  ) {
    this.currAngle = (parent ? parent.currAngle : -Math.PI / 2) + this.angle;
    this.x1 = parent ? parent.x2 : 350;
    this.y1 = parent ? parent.y2 : 700;
    this.x2 = this.x1 + height * Math.cos(this.currAngle);
    this.y2 = this.y1 + height * Math.sin(this.currAngle);
    if (height > MIN_HEIGHT) {
      this.nextBranches();
    }
    // console.log({ height, x1: this.x1, Ç
  }

  public nextBranches(): void {
    const theta = -Math.random() * (Math.PI / 3.8);
    const nextHeightMultiplier = Tree.p5.map(this.height, 10, 250, 0.6, 0.66);
    const tree = new Tree(this.height * nextHeightMultiplier, theta, this);

    this.children.push(tree);

    const tree2 = new Tree(this.height * nextHeightMultiplier, -theta, this);

    if (Math.random() > 0.01) {
      this.children.push(tree2);
    }

    if (Math.random() > 0.4) {
      const theta2 = -Math.random() * (Math.PI / 2.9);
      const tree3 = new Tree(
        this.height * nextHeightMultiplier * 0.66,
        -theta2,
        this
      );

      const tree4 = new Tree(
        this.height * nextHeightMultiplier * 0.66,
        theta2,
        this
      );

      this.children.push(tree3);
      this.children.push(tree4);
    }
  }
}
// const v= Tree.p5.createVector()
