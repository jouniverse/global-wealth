let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

document.addEventListener("resize", () => {
  location.reload();
});

const settings = {
  dimensions: [canvasWidth, canvasHeight],
  animate: true,
  fps: 60,
  playbackRate: "throttle",
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  // ??
  let repeatLoop, distConstant, strokeWidth;
  if (detectMobile() && window.innerWidth > 480) {
    repeatLoop = 65;
    distConstant = 150;
    strokeWidth = 3;
  } else if (detectMobile()) {
    repeatLoop = 35;
    distConstant = 100;
    strokeWidth = 2;
  } else {
    repeatLoop = 90;
    distConstant = 200;
    strokeWidth = 5;
  }

  for (let i = 0; i < repeatLoop; i++) {
    const x = randomRange(0, width);
    const y = randomRange(0, height);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    // background color
    context.fillStyle = "#212529ff";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = 0; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > distConstant) continue;

        context.lineWidth = mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = "#e9ecefff";
        // set stroke width
        context.lineWidth = strokeWidth;
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  // get the distance of the dots
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(randomRange(-1, 1), randomRange(-1, 1));
    if (detectMobile()) {
      this.radius = randomRange(2, 10);
    } else {
      this.radius = randomRange(4, 14);
    }
  }

  // Bounce the dots from the walls
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  // Update the position of the dot
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    if (detectMobile() && window.innerWidth > 480) {
      context.lineWidth = 4;
    } else if (detectMobile()) {
      context.lineWidth = 3;
    } else {
      context.lineWidth = 4;
    }

    context.beginPath();

    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
