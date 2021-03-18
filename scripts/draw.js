window.draw = (function(global) {
  const stripedPatterns = Object.create(null);

  // Creates a striped pattern of the specified color. This can be used to
  //  fill in various striped shapes of that color.
  function getStripedPattern(color) {
    if (!Object.hasOwnProperty.call(stripedPatterns, color)) {
      const canvas = global.document.createElement("canvas");
      canvas.setAttribute("width", 1);
      canvas.setAttribute("height", 4);
      const tempCtx = canvas.getContext("2d");
      tempCtx.fillStyle = color;
      tempCtx.fillRect(0, 0, 1, 2);
      stripedPatterns[color] = tempCtx.createPattern(canvas, "repeat");
    }
    return stripedPatterns[color];
  };

  // Sets the current fill/stroke style to match the given color and pattern.
  function setStyle(ctx, color, pattern) {
    switch (pattern) {
      case Pattern.solid:
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        break;
      case Pattern.striped:
        ctx.fillStyle = getStripedPattern(color);
        ctx.strokeStyle = color;
        break;
      case Pattern.empty:
        ctx.strokeStyle = color;
        break;
      default:
        throw Error("Unexpected pattern" + pattern);
    }
  }

  // Fills in and/or outlines the current shape with the given color and
  //  pattern.
  function applyStyle(ctx, color, pattern) {
    switch (pattern) {
      case Pattern.solid:
      case Pattern.striped:
        ctx.fill();
        ctx.stroke();
        break;
      case Pattern.empty:
        ctx.stroke();
        break;
      default:
        throw Error("Unexpected pattern " + pattern);
    }
  }

  // Draws a diamond with the specified origin and dimensions.
  function drawDiamond(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x + width  / 2, y + height);
    ctx.lineTo(x, y + height / 2);
    ctx.closePath();
  }

  // Draws an oval with the specified origin and dimensions.
  function drawOval(ctx, x, y, width, height) {
    ctx.beginPath();
    ctx.ellipse(x + width / 2, y + height / 4, width / 2, height / 4, 0, Math.PI, 0);
    ctx.lineTo(x + width, y + height * 3/4);
    ctx.ellipse(x + width / 2, y + height * 3/4, width / 2, height/4, 0, 0, Math.PI);
    ctx.closePath();
  }

  // Draws a squiggle with the specified origin and dimensions.
  function drawSquiggle(ctx, x, y, width, height) {
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
  }

  // Draws the given shape with the specified origin and dimensions.
  function drawShape(ctx, shape, x, y, width, height) {
    switch (shape) {
      case Shape.diamond:
        drawDiamond(ctx, x, y, width, height);
        break;
      case Shape.oval:
        drawOval(ctx, x, y, width, height);
        break;
      case Shape.squiggle:
        drawSquiggle(ctx, x, y, width, height);
        break;
      default:
        throw Error("Unexpected shape" + shape);
    }
  }

  // Draws card. callback is called with a blob URL that references an image
  //  for card. Note: cards are cached for performance.
  const cardCache = Object.create(null);
  function drawCard(card, callback) {
    const cardStringID = global.JSON.stringify(card.toJSON());
    if (Object.prototype.hasOwnProperty.call(cardCache, cardStringID)) {
      callback(cardCache[cardStringID]);
      return;
    }

    const cardWidth = 190;
    const cardHeight = 100;
    const shapeWidth = 50;
    const shapeHeight = 90;
    const shapeXMargin = 10;
    const shapeYMargin = 5;
    const lineWidth = 3;

    const canvas = global.document.createElement("canvas");
    canvas.setAttribute("width", cardWidth);
    canvas.setAttribute("height", cardHeight);
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = lineWidth;

    setStyle(ctx, card.color, card.pattern);
    switch (card.number) {
      case 1:
        drawShape(ctx, card.shape, cardWidth / 2 - shapeWidth / 2, shapeYMargin, shapeWidth, shapeHeight);
        applyStyle(ctx, card.color, card.pattern);
        break;
      case 2:
        drawShape(ctx, card.shape, cardWidth / 2 - shapeWidth - shapeXMargin / 2, shapeYMargin, shapeWidth, shapeHeight);
        applyStyle(ctx, card.color, card.pattern);
        drawShape(ctx, card.shape, cardWidth / 2 + shapeXMargin / 2, shapeYMargin, shapeWidth, shapeHeight);
        applyStyle(ctx, card.color, card.pattern);
        break;
      case 3:
        drawShape(ctx, card.shape, shapeXMargin, shapeYMargin, shapeWidth, shapeHeight);
        applyStyle(ctx, card.color, card.pattern);
        drawShape(ctx, card.shape, shapeWidth + shapeXMargin * 2, shapeYMargin, shapeWidth, shapeHeight);
        applyStyle(ctx, card.color, card.pattern);
        drawShape(ctx, card.shape, shapeWidth * 2 + shapeXMargin * 3, shapeYMargin, shapeWidth, shapeHeight);
        applyStyle(ctx, card.color, card.pattern);
        break;
      default:
        throw Error("Unexpected number" + card.number);
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      cardCache[cardStringID] = url;
      callback(url);
    }, "image/png");
  }

  return drawCard;
})(window);
