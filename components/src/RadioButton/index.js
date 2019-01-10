/**
 *
 * RadioButton
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TABLET_MQ } from '../atoms';

const Wrapper = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  line-height: 1;
  :hover {
    ${({ disabled }) =>
      !disabled &&
      `
      cursor: pointer;
    `}
  }
  font-family: Roboto;
  font-size: 0.875em;
  ${TABLET_MQ} {
    font-size: 1em;
  }
  color: ${({ dark }) => (dark ? 'black' : '#e5e5e5')};
`;

const CheckButton = styled.button`
  font-size: 1em;
  min-width: 1em;
  min-height: 1em;
  max-width: 1em;
  max-height: 1em;
  border-radius: 0.5em;
  box-sizing: border-box;
  padding: 0;
  line-height: 1em;
  margin-${({ rtl }) => (rtl ? 'left' : 'right')}: 0.875em;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #646464;

  color: transparent;

  ${({ checked }) =>
    checked &&
    `
    background-color: #fc6f77;
    border-color: #fc6f77;
  `}

  :focus {
    outline: none;
  }

  :hover {
    ${({ disabled }) =>
      !disabled &&
      `
      cursor: pointer;
    `}
  }
`;
const Dot = styled.div`
  width: 0.25em;
  height: 0.25em;
  border-radius: 0.125em;
  background-color: white;
`;

class RadioButton extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    dark: PropTypes.bool,
    rtl: PropTypes.bool,
    text: PropTypes.string,
  };

  onClick = () => {
    const { disabled, id, onClick } = this.props;
    if (!disabled && onClick) {
      if (id) {
        onClick(id);
      } else {
        onClick();
      }
    }
  };

  render() {
    const { checked, disabled, children, dark, rtl, text } = this.props;
    return (
      <Wrapper onClick={this.onClick}>
        {!rtl && (
          <CheckButton checked={checked} disabled={disabled} rtl={false}>
            <Dot checked={checked} />
          </CheckButton>
        )}
        {text && (
          <Text disabled={disabled} dark={dark}>
            {text}
          </Text>
        )}
        {children}
        {rtl && (
          <CheckButton checked={checked} disabled={disabled} rtl={true}>
            <Dot checked={checked} />
          </CheckButton>
        )}
      </Wrapper>
    );
  }
}

export default RadioButton;
