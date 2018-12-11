/**
 *
 * Carret
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  fill-rule: evenodd;
  clip-rule: evenodd;
`;

class Carret extends React.PureComponent {
  render() {
    const { color } = this.props;
    return (
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 60 60"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
      >
        <path
          d="M14.457,0.767c1.023,-1.023 2.681,-1.023 3.705,0l27.381,27.381c1.023,1.023 1.023,2.681 0,3.704l-27.381,27.381c-0.512,0.512 -1.181,0.767 -1.852,0.767c-0.67,0 -1.341,-0.255 -1.853,-0.767c-1.023,-1.023 -1.023,-2.681 0,-3.704l25.53,-25.529l-25.529,-25.529c-1.023,-1.023 -1.023,-2.681 -0.001,-3.704Z"
          style={{ fillRule: 'nonzero' }}
          fill={color}
        />
      </Svg>
    );
  }
}

Carret.propTypes = {
  color: PropTypes.string,
};

Carret.defaultProps = {
  color: '#cecece',
};

export default Carret;
