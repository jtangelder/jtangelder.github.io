import { getElement, setElementText } from './utils';
import { isValidColor } from './colors';
import { getContrastRatio } from './contrast';
import { getWCAGScores } from './score';

function setPageColors(background:string, foreground:string):void {
  getElement('meta[name="theme-color"]').content = background;
  getElement('body').style.background = background;
  getElement('body').style.color = foreground;
  getElement('body').style.borderColor = foreground;
}

function onSubmitForm(ev:Event) {
  ev.preventDefault();

  const color1 = getElement('input[name="color1"]').value.trim();
  const color2 = getElement('input[name="color2"]').value.trim();

  if (!isValidColor(color1) || !isValidColor(color2)) {
    alert('Invalid color provided!');
    return;
  }

  const contrastRatio = getContrastRatio(color1, color2);
  const scores = getWCAGScores(contrastRatio);

  setPageColors(color1, color2);
  setElementText(contrastRatio, '.ratio');

  Object.keys(scores).forEach(level => {
    const row = getElement(`tr.level-${level}`);
    Object.keys(scores[level]).forEach(type => {
      const result = scores[level][type];
      const cell = getElement(`td.${type}`, row);

      setElementText(result.valid, `.score`, cell);
      setElementText(result.required, `.minimal`, cell);

      cell.classList.remove('false', 'true');
      cell.classList.add(result.valid.toString());
    });
  });

  getElement('#results').classList.remove('hidden');
}

getElement('form').addEventListener('submit', onSubmitForm);