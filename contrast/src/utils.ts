export function round(number:number, precision:number) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function getElement(selector:string, context:Element|HTMLDocument = document):Element|any {
  return context.querySelector(selector);
}

export function setElementText(text:any, selector:string, context:Element = undefined):void {
  getElement(selector, context).textContent = text;
}
