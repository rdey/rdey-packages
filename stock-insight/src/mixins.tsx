import { s } from '@rdey/design';

const { css } = s;

export const clickable = () => {
  return css`
    cursor: pointer;
    outline: none;
  `;
};

