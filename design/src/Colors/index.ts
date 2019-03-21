import { fromPairs } from 'lodash';
import invariant from 'invariant';

const hslColors = {
  base0: 'hsl(240, 20%, 6%)',
  base1: 'hsl(240, 20%, 8%)',
  base2: 'hsl(240, 20%, 10%)',
  base3: 'hsl(240, 20%, 12%)',
  base4: 'hsl(240, 16%, 14%)',
  base5: 'hsl(240, 16%, 16%)',
  base6: 'hsl(240, 16%, 18%)',
  base7: 'hsl(240, 16%, 20%)',
  base8: 'hsl(240, 16%, 22%)',
  base9: 'hsl(240, 12%, 24%)',
  base10: 'hsl(240, 12%, 26%)',
  base11: 'hsl(240, 12%, 28%)',
  base12: 'hsl(240, 12%, 30%)',
  base13: 'hsl(240, 14%, 30%)',
  base14: 'hsl(240, 14%, 32%)',
  base15: 'hsl(240, 12%, 34%)',
  base16: 'hsl(240, 12%, 36%)',
  base17: 'hsl(240, 12%, 38%)',
  base18: 'hsl(240, 12%, 40%)',
  base19: 'hsl(240, 12%, 42%)',
  primary0: 'hsl(360, 88%, 64%)',
  primary1: 'hsl(360, 88%, 68%)',
  primary2: 'hsl(360, 88%, 72%)',
  primary3: 'hsl(360, 88%, 76%)',
  primary4: 'hsl(360, 88%, 80%)',
  secondary0: 'hsl(0, 0%, 80%)',
  secondary1: 'hsl(0, 0%, 84%)',
  secondary2: 'hsl(0, 0%, 88%)',
  secondary3: 'hsl(0, 0%, 92%)',
  secondary4: 'hsl(0, 0%, 96%)',
  supplementBlue0: 'hsl(208, 96%, 48%)',
  supplementBlue1: 'hsl(208, 96%, 52%)',
  supplementBlue2: 'hsl(208, 96%, 56%)',
  supplementBlue3: 'hsl(208, 96%, 60%)',
  supplementBlue4: 'hsl(208, 96%, 64%)',
  supplementGreen0: 'hsl(120, 64%, 48%)',
  supplementGreen1: 'hsl(120, 64%, 52%)',
  supplementGreen2: 'hsl(120, 64%, 56%)',
  supplementGreen3: 'hsl(120, 64%, 64%)',
  supplementGreen4: 'hsl(120, 64%, 72%)',
  supplementOrange0: 'hsl(20, 96%, 48%)',
  supplementOrange1: 'hsl(20, 96%, 52%)',
  supplementOrange2: 'hsl(20, 96%, 56%)',
  supplementOrange3: 'hsl(20, 96%, 64%)',
  supplementOrange4: 'hsl(20, 96%, 72%)',
  supplementPurple0: 'hsl(288, 96%, 64%)',
  supplementPurple1: 'hsl(288, 96%, 68%)',
  supplementPurple2: 'hsl(288, 94%, 72%)',
  supplementPurple3: 'hsl(288, 96%, 80%)',
  supplementPurple4: 'hsl(288, 96%, 88%)',
  supplementPink0: 'hsl(328, 96%, 60%)',
  supplementPink1: 'hsl(328, 96%, 64%)',
  supplementPink2: 'hsl(328, 96%, 68%)',
  supplementPink3: 'hsl(328, 96%, 72%)',
  supplementPink4: 'hsl(328, 96%, 84%)',
  success: 'hsl(120, 48%, 64%)',
  warning: 'hsl(40, 96%, 56%)',
  error: 'hsl(0, 88%, 48%)',
  information: 'hsl(200, 56%, 72%)',
};

function hslToRgb(h: number, s: number, l: number) {
  let r;
  let g;
  let b;

  if (s === 0) {
    r = l;
    g = l;
    b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const colors = fromPairs(
  Object.entries(hslColors).map(([key, hsl]) => {
    const match = hsl.match(/^hsl\((\d+),\s(\d+)%,\s(\d+)%\)/);
    if (!match) {
      throw new Error('Invalid color ' + hsl);
    }
    const [h, s, l] = match.slice(1).map((a) => Number(a));
    const hslArr = [h / 360, s / 100, l / 100];
    const rgbArr = hslToRgb(hslArr[0], hslArr[1], hslArr[2]);
    const rgbCss = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
    return [
      key,
      {
        rgb: rgbArr,
        hsl: hslArr,
        hslCss: hsl,
        rgbCss,
      },
    ];
  })
);

type getColorSig = { rgb?: number[], opacity?: number, color?: string };

export const getColor = ({ rgb, opacity, color }: getColorSig) => {
  if (rgb) {
    invariant(Array.isArray(rgb), 'rgb must be an array');
    const validColor = Object.values(colors).find(
      ({ rgb: someRgb }) =>
        someRgb[0] === rgb[0] && someRgb[0] === rgb[0] && someRgb[0] === rgb[0]
    );
    invariant(
      validColor,
      `The provided rgb value (${rgb.join(', ')}) is not in the design system!`
    );
    if (typeof opacity === 'number') {
      invariant(
        opacity >= 0 && opacity <= 1,
        'opacity must be a number between 0 and 1'
      );
      return `rgba(${rgb.join(',')}, ${opacity})`;
    }
    return `rgb(${rgb.join(',')})`;
  }

  if (!color) {
    throw new Error('You must provide a color');
  }

  invariant(
    Object.keys(colors).includes(color),
    'You must provide a color that is included in the design system, '
  );

  if (typeof opacity === 'number') {
    const rgbVariant = colors[color].rgb;
    invariant(
      opacity >= 0 && opacity <= 1,
      'opacity must be a number between 0 and 1'
    );
    return `rgba(${rgbVariant.join(',')}, ${opacity})`;
  }
  return `${colors[color].hslCss}`;
};

export const colorMixin = (args: getColorSig) => {
  const color = getColor(args);
  return `color: ${color};`;
};
