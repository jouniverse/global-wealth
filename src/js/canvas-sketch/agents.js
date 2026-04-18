/**
 * Agents particle animation — modernized ES module.
 * Particles connected by lines, bouncing off walls.
 * Adapted to the dark/gold "Atmospheric Authority" palette.
 */
import { createCanvasSketch } from "./engine.js";
import { randomRange, mapRange } from "./math.js";

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y, isMobile) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(randomRange(-0.6, 0.6), randomRange(-0.6, 0.6));
    this.radius = isMobile ? randomRange(1.5, 6) : randomRange(2, 8);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context, color) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.restore();
  }
}

/**
 * Initialize the agents animation on the page.
 * @param {object} options
 * @param {HTMLElement} [options.parent] - container element (default: document.body)
 * @param {number} [options.particleCount] - override number of particles
 * @param {string} [options.bgColor] - background color
 * @param {string} [options.lineColor] - line connection color
 * @param {string} [options.dotColor] - particle fill color
 * @param {number} [options.connectionDistance] - max distance for lines
 * @param {number} [options.opacity] - overall opacity (0-1)
 */
export function initAgents(options = {}) {
  const isMobile = window.innerWidth < 768;
  const isSmallMobile = window.innerWidth < 480;

  const {
    parent = document.body,
    particleCount = isSmallMobile ? 30 : isMobile ? 50 : 70,
    bgColor = "#131313",
    lineColor = "rgba(233, 193, 118, 0.12)",
    dotColor = "rgba(233, 193, 118, 0.25)",
    connectionDistance = isMobile ? 120 : 180,
    lineWidth = isMobile ? 1.5 : 2,
    opacity = 1,
  } = options;

  const sketch = ({ context, width, height }) => {
    const agents = [];

    for (let i = 0; i < particleCount; i++) {
      agents.push(new Agent(randomRange(0, width), randomRange(0, height), isMobile));
    }

    return ({ context, width, height }) => {
      context.globalAlpha = opacity;
      context.fillStyle = bgColor;
      context.fillRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        for (let j = i + 1; j < agents.length; j++) {
          const other = agents[j];
          const dist = agent.pos.getDistance(other.pos);
          if (dist > connectionDistance) continue;

          const alpha = mapRange(dist, 0, connectionDistance, 0.15, 0);
          context.strokeStyle = `rgba(233, 193, 118, ${alpha})`;
          context.lineWidth = lineWidth;
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }

      // Draw and update agents
      for (const agent of agents) {
        agent.update();
        agent.draw(context, dotColor);
        agent.bounce(width, height);
      }

      context.globalAlpha = 1;
    };
  };

  return createCanvasSketch(sketch, {
    animate: true,
    fps: 60,
    parent,
  });
}
