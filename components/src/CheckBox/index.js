/**
 *
 * Checkbox
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TABLET_MQ } from '../atoms';

const Wrapper = styled.li`
  list-style: none;
  text-align: left;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
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
  width: 1em;
  height: 1em;
  box-sizing: border-box;
  padding: 0;
  line-height: 1em;
  margin-right: 0.875em;
  display: inline-block;

  border: 1px solid #646464;

  color: transparent;

  ${({ checked }) =>
    checked &&
    `
    background-image: url(//res.cloudinary.com/redeye/image/upload/v1511866921/check_rzcba8.svg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 70% 70%;
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

class Checkbox extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    dark: PropTypes.bool,
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
    const { checked, disabled, children, dark } = this.props;
    return (
      <Wrapper onClick={this.onClick}>
        <CheckButton checked={checked} disabled={disabled} />
        {children && (
          <Text disabled={disabled} dark={dark}>
            {children}
          </Text>
        )}
      </Wrapper>
    );
  }
}

export default Checkbox;
