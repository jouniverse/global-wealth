/**
 * Lightweight canvas animation engine.
 * Modernized from canvas-sketch — no Node.js dependency.
 */
export function createCanvasSketch(sketchFn, settings = {}) {
  const {
    dimensions,
    animate = true,
    fps = 60,
    parent = document.body,
    canvas: existingCanvas,
  } = settings;

  const canvas = existingCanvas || document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!existingCanvas) {
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    parent.appendChild(canvas);
  }

  let width, height;
  let animationFrame;
  let lastTime = 0;
  const interval = 1000 / fps;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    if (dimensions) {
      width = dimensions[0];
      height = dimensions[1];
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(dpr, dpr);
  }

  resize();

  const props = { context, width, height, canvas };
  const renderFn = sketchFn(props);

  function loop(time) {
    if (!animate) return;
    animationFrame = requestAnimationFrame(loop);

    const delta = time - lastTime;
    if (delta < interval) return;
    lastTime = time - (delta % interval);

    props.width = width;
    props.height = height;
    props.time = time / 1000;
    props.deltaTime = delta / 1000;

    renderFn(props);
  }

  function handleResize() {
    resize();
    props.width = width;
    props.height = height;
    if (!animate) renderFn(props);
  }

  window.addEventListener("resize", handleResize);

  if (animate) {
    animationFrame = requestAnimationFrame(loop);
  } else {
    renderFn(props);
  }

  return {
    canvas,
    context,
    destroy() {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      if (!existingCanvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    },
  };
}
