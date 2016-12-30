import { round } from './utils';
import { RGBAArray, colorToRGB } from './colors';

function getLuminance(rgb:RGBAArray):number {
  // see https://www.w3.org/TR/WCAG/#relativeluminancedef
  const [r, g, b] = rgb
    .map(c => c / 255)
    .map(c => ((c <= 0.03928) ? (c / 12.92) : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(color1:string, color2:string):number {
  // see https://www.w3.org/TR/WCAG/#contrast-ratiodef
  const lums: number[] = [
    getLuminance(colorToRGB(color1)),
    getLuminance(colorToRGB(color2, color1))
  ];
  const l1 = Math.max(...lums);
  const l2 = Math.min(...lums);
  return round((l1 + 0.05) / (l2 + 0.05), 2);
}