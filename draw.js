function drawDiamond(ctx, x, y, width, height) {
  ctx.beginPath();
  ctx.moveTo(x + width / 2, y);
  ctx.lineTo(x + width, y + height / 2);
  ctx.lineTo(x + width  / 2, y + height);
  ctx.lineTo(x, y + height / 2);
  ctx.closePath();
  ctx.fill();
}

function drawOval(ctx, x, y, width, height) {
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height / 4, width / 2, height / 4, 0, Math.PI, 0);
  ctx.lineTo(x + width, y + height * 3/4);
  ctx.ellipse(x + width / 2, y + height * 3/4, width / 2, height/4, 0, 0, Math.PI);
  ctx.fill();
}

function drawSquiggly(ctx, x, y, width, height) {
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
  
  ctx.fill();
}
