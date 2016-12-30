export interface RGBAArray extends Array<number> { }

function createCanvas():CanvasRenderingContext2D {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.getContext('2d');
}

function fillCanvas(ctx:CanvasRenderingContext2D, color:string):void {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
}

export function isValidColor(color:string):boolean {
  // fully transparent pixel on the canvas means an invalid color
  const ctx = createCanvas();
  fillCanvas(ctx, color);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return !(d[0] === 0 && d[1] === 0 && d[2] === 0 && d[3] === 255);
}

export function colorToRGB(color:string, bgColor:string = 'white'):RGBAArray {
  // start with an white canvas so rgba() colors can be calculated
  const ctx = createCanvas();
  ['white', bgColor, color].forEach(fillCanvas.bind(null, ctx));
  const d = ctx.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}
