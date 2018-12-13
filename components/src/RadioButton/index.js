/**
 *
 * RadioButton
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RadioButtonStyle = styled.button`
  flex: 1;
  font-family: Libre Franklin;
  font-size: 0.75em;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  height: 3.5em;
  box-sizing: border-box;
  border: solid 1px #646464;
  ${({ selected }) => selected && 'border: solid 1px #fc6f77;'}
  :focus {
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
  ${({ disabled }) =>
    disabled
    && `
    border: solid 1px #4a4a4a;
    color: #505050;
    :hover {
      cursor: auto;
    }
  `}
`;

class RadioButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    disabled: false,
  }

  onClick = () => {
    const { onClick, id } = this.props;
    onClick(id);
  };

  render() {
    const { disabled, selected, children } = this.props;
    return (
      <RadioButtonStyle
        disabled={disabled}
        selected={selected}
        onClick={this.onClick}
      >
        {children}
      </RadioButtonStyle>
    );
  }
}

export default RadioButton;
