/**
 *
 * Close
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Close extends React.PureComponent {
  onClick = () => {
    const { onClick, id } = this.props;
    if (onClick) {
      if (id) {
        onClick(id);
      } else {
        onClick();
      }
    }
  };

  render() {
    const { style, size, color, lineWidth, styled: passedStyle } = this.props;
    const lineLength = (size - lineWidth).toString();
    const Svg = styled.svg`
      ${passedStyle};
    `;

    return (
      <Svg
        version="1.1"
        baseProfile="full"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        onClick={this.onClick}
        style={{ cursor: 'pointer', ...style }}
      >
        <line
          x1={lineWidth}
          x2={lineLength}
          y1={lineWidth}
          y2={lineLength}
          stroke={color}
          strokeWidth={lineWidth}
        />
        <line
          x1={lineWidth}
          x2={lineLength}
          y1={lineLength}
          y2={lineWidth}
          stroke={color}
          strokeWidth={lineWidth}
        />
      </Svg>
    );
  }
}

Close.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** width and height */
  size: PropTypes.number,
  color: PropTypes.string,
  lineWidth: PropTypes.number,
  /** react css prop */
  style: PropTypes.object,
  styled: PropTypes.string,
};

Close.defaultProps = {
  size: 14,
  color: '#cecece',
  lineWidth: 2,
  style: {},
  styled: '',
};

export default Close;
