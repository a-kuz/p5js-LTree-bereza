/* eslint-disable no-param-reassign */
import P5 from "p5";

import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";
import { Tree } from "./Tree";

let slider;
let text: P5.Element;
let fps;
let startHeight = 250;
let pauseDuration = 5000;

// DEMO: A sample class implementation

// Creating the sketch itself
const sketch = (p5: P5): void => {
  function drawVetka(tree: Tree): void {
    const { x1, x2, y1, y2 } = tree;
    if (tree.height > 25) {
      p5.noFill();
      // p5.strokeWeight(p5.map(tree.height, 200, 0, 20, 0.1));
      const t = p5.map(tree.height, 200, 0, 255, 125);
      p5.stroke(t, t, t, 180);
      p5.line(x1, y1, x2, y2);
      let x = x1;
      let y = y1;
      let size = 10;
      const maxw = p5.map(tree.height, 0, startHeight, 0, startHeight * 0.2);
      for (let i = 0; i < tree.height; i += 1) {
        size = p5.map(i, tree.height, 0, maxw / 2, maxw / 1.5);
        x = x1 + i * Math.cos(tree.currAngle);
        y = y1 + i * Math.sin(tree.currAngle);
        const xx = x + size * Math.cos(tree.currAngle + p5.PI / 2);
        const yy = y + size * p5.sin(tree.currAngle + p5.PI / 2);
        p5.strokeWeight(p5.map(tree.height, 0, startHeight, 1, 5));
        const c = p5.map(tree.height, 0, startHeight, 245, 230);
        p5.stroke(c, c, c, 190);

        p5.line(x, y, xx, yy);
        p5.stroke(20, 20, 20, p5.map(tree.height, 0, startHeight, 255, 240));
        p5.strokeWeight(p5.map(tree.height, 0, startHeight, 1.7, 5));

        if (p5.random(4) <= 1) {
          const rndSize = size * p5.random(0.7, 1.2);
          p5.line(
            x + p5.random(5) * p5.cos(tree.currAngle + p5.HALF_PI),
            y,
            x +
              rndSize *
                p5.random(0.3, 0.7) *
                p5.cos(tree.currAngle + p5.HALF_PI),
            y +
              rndSize *
                p5.random(0.3, 0.7) *
                p5.sin(tree.currAngle + p5.HALF_PI)
          );
        }
      }
    } else {
      // p5.noStroke();
      p5.strokeWeight(7);
      p5.stroke(
        30,
        p5.map(tree.height, startHeight, 0, 30, 70) + p5.random(50),
        0,
        40
      );

      let k = 1;
      if (p5.random(1) > 0.4) {
        p5.fill(30, p5.map(tree.height, startHeight, 0, 20, 120), 0, 195);
        k = 1.3 * p5.random(1, 3);

        // p5.filter(p5.BLUR);
        p5.circle(x2, y2, tree.height * k);
        p5.noStroke();
        p5.fill(30, p5.map(tree.height, startHeight, 0, 20, 120), 0, 55);
        p5.circle(x2, y2, tree.height * k * 1.3);
        p5.fill(30, p5.map(tree.height, startHeight, 0, 20, 120), 0, 25);
        p5.circle(x2, y2, tree.height * k * 2.94);
      } else {
        p5.fill(p5.map(tree.height, 200, 0, 90, 125), 90, 40, 230);

        p5.circle(x2, y2, tree.height * k);
      }
    }
  }

  let trees: Tree[] = [];
  const addTrees = (pTree: Tree): void => {
    pTree.children.forEach((child) => addTrees(child));
    trees.push(pTree);
  };

  Tree.p5 = p5;
  let tree: Tree;
  let curIndex = 0;

  p5.setup = () => {
    slider = p5.createSlider(40, 355, startHeight);

    const canvas = p5.createCanvas(700, 700);
    text = p5.createDiv();
    slider.parent("app");
    canvas.parent("app");
    text.parent("app");
    p5.strokeJoin(p5.ROUND);
  };

  p5.mouseClicked = () => {
    pauseDuration = 0;
    trees = [];
  };

  p5.draw = () => {
    if (curIndex >= trees.length) {
      curIndex = 0;
      trees = [];
      addTrees(new Tree(startHeight, 0));
      if (p5.random() > 0.4)
        trees = trees.sort((tree1, tree2) =>
          tree1.height < tree2.height ? 1 : -1
        );
      if (p5.random(1) > 0.7) trees = trees.reverse();
      p5.noLoop();
      setTimeout(() => {
        startHeight = slider.value();
        text.html(JSON.stringify({ startHeight, elements: trees.length }));
        p5.background("#010c18");
        p5.loop();
        pauseDuration = 5000;
      }, pauseDuration);
      return;
    }

    tree = trees[curIndex];
    drawVetka(tree);
    curIndex++;
  };
};

new P5(sketch);
