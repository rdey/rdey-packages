import React from 'react';
import PropTypes from 'prop-types';

class If extends React.PureComponent {
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
If.propTypes = {
  case: PropTypes.node,
  el: PropTypes.node,
  children: PropTypes.node,
};

If.defaultProps = {
  case: false,
  el: <></>,
  children: <></>,
};

export default If;
