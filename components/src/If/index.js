import React from 'react';
import PropTypes from 'prop-types';

export default class If extends React.PureComponent {
  static propTypes = {
    case: PropTypes.any,
    el: PropTypes.any,
    children: PropTypes.node,
  };

  render() {
    const { case: pCase, el: Component, children } = this.props;
    if (pCase) {
      if (Component) {
        return <Component {...this.props}>{children}</Component>;
      }
      return children;
    }
    return null;
  }
}
