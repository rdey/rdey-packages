/**
 *
 * CTAButton
 *
 */

import styled from 'styled-components';

const focus = `
  outline: none;
  outline-width: 0;
  background-color: white;
  box-shadow: inset 0 0 0 2px rgba(252, 102, 102, 1), 0 0 0 4px rgba(252, 102, 102, 0.3);
  border: solid 1px #fc6666;
`;

const hover = `
  outline: none;
  cursor: pointer;
  color: black;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3);
  border: solid 1px #fc6666;
  background-color: #fc6666;
`;

const disabledStyle = `
  color: #505050;
  background-color: #2a2a2a;
  border: solid 1px #2a2a2a;
`;

const CTAButton = styled.button`
  text-align: center;
  background-color: white;
  font-family: Oswald;
  text-transform: uppercase;
  font-size: 0.88em;
  font-weight: 500;
  line-height: 1;
  padding: 0.57em 1.14em;
  color: black;
  border-radius: 0;
  border: solid 1px white;

  :hover {
    ${({ disabled, focused }) => !disabled && !focused && hover};
  }
  :focus {
    ${({ disabled }) => !disabled && focus};
  }
  ${({ focused }) => focused && focus}
  ${({ hovered }) => hovered && hover}
  ${({ disabled }) => disabled && disabledStyle};
`;

export default CTAButton;
