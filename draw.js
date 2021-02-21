// style = [color, fill]
const Color = {
  red: "red",
  green: "green",
  purple: "purple",
};

const Fill = {
  solid: "solid",
  striped: "striped",
  empty: "empty",
};
Fill._stripedPatterns = {};

function getStripedPattern(color) {
  if (!Fill._stripedPatterns.hasOwnProperty(color)) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", 1);
    canvas.setAttribute("height", 4);
    const tempCtx = canvas.getContext("2d");
    tempCtx.fillStyle = color;
    tempCtx.fillRect(0, 0, 1, 2);
    Fill._stripedPatterns[color] = tempCtx.createPattern(canvas, "repeat");
  }
  return Fill._stripedPatterns[color];
};

function setStyle(ctx, [color, fill]) {
  switch (fill) {
    case Fill.solid:
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      break;
    case Fill.striped:
      ctx.fillStyle = getStripedPattern(color);
      ctx.strokeStyle = color;
      break;
    case Fill.empty:
      ctx.strokeStyle = color;
      break;
    default:
      throw Error("Unexpected fill");
  }
}

function applyStyle(ctx, [color, fill]) {
  switch (fill) {
    case Fill.solid:
    case Fill.striped:
      ctx.fill();
      ctx.stroke();
      break;
    case Fill.empty:
      ctx.stroke();
      break;
    default:
      throw Error("Unexpected fill");
  }
}

function drawDiamond(ctx, style, x, y, width, height) {
  setStyle(ctx, style);
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y);
  ctx.lineTo(x + width, y + height / 2);
  ctx.lineTo(x + width  / 2, y + height);
  ctx.lineTo(x, y + height / 2);
  ctx.closePath();
  applyStyle(ctx, style);
}

function drawOval(ctx, style, x, y, width, height) {
  setStyle(ctx, style);
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height / 4, width / 2, height / 4, 0, Math.PI, 0);
  ctx.lineTo(x + width, y + height * 3/4);
  ctx.ellipse(x + width / 2, y + height * 3/4, width / 2, height/4, 0, 0, Math.PI);
  ctx.closePath();
  applyStyle(ctx, style);
}

function drawSquiggly(ctx, style, x, y, width, height) {
  setStyle(ctx, style);
  ctx.beginPath();
  ctx.moveTo(x + width / 20, y + height / 10);
  ctx.quadraticCurveTo(x + width * 0.5, y - height * 0.05, x + width * 0.85, y + height * 0.1);
  ctx.quadraticCurveTo(x + width * 1.05, y + height * 0.25, x + width * 0.8, y + height * 0.5);
  ctx.quadraticCurveTo(x + width * 0.64, y + height * 0.67, x + width * 0.95, y + height * 0.8);
  ctx.quadraticCurveTo(x + width * 1.05, y + height * 0.85, x + width * 0.95, y + height * 0.9);

  ctx.quadraticCurveTo(x + width * 0.5, y + height * 1.05, x + width * 0.15, y + height * 0.9);
  ctx.quadraticCurveTo(x - width * 0.05, y + height * 0.75, x + width * 0.2, y + height * 0.5);
  ctx.quadraticCurveTo(x + width * 0.36, y + height * 0.33, x + width * 0.05, y + height * 0.2);
  ctx.quadraticCurveTo(x - width * 0.05, y + height * 0.15, x + width * 0.05, y + height * 0.1);
  
  applyStyle(ctx, style);
}
