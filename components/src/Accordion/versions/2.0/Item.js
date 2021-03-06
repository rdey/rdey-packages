import { colors } from '@rdey/design';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { DESKTOP_MQ } from '../../../atoms';
import Carret from '../../../Carret';

const Wrapper = styled.div`
  background: ${colors.base8.hslCss};
  margin-bottom: 0.5em;
  ${DESKTOP_MQ} {
    margin-bottom: 1em;
  }
`;
const Content = styled.div`
  overflow: hidden;
  transition: height 0.5s;
  height: ${({ expanded, height }) => {
    if (expanded) {
      if (height) {
        return `${height}px`;
      }
      return 'auto';
    }
    return 0;
  }};
`;
Content.Body = styled.div`
  padding: 1em;
  padding-top: 0;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1em;
`;

const CarretContainer = styled.div`
  transition: transform 0.5s;
  transform: rotate(${({ expanded }) => (expanded ? 90 : 0)}deg);
  width: 0.75em;
  height: 0.75em;
  display: flex;
  ${({ expanded }) =>
    (expanded ? 'transform: rotate(90deg)' : 'transform: rotate(0deg)')};
`;

class Item extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  onClick = (ev) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick({
        ...this.props,
        ev,
      });
    }
  };

  setRef = (el) => {
    if (el) {
      this.el = el;
      this.setContentHeight();
    }
  };

  setContentHeight = () => {
    if (!this.el) {
      return;
    }
    this.height = this.el.offsetHeight;
  };

  handleResize = () => {
    const { expanded } = this.props;
    if (expanded) {
      this.onClick({
        ...this.props,
      });
    }
    this.setContentHeight();
  };

  render() {
    const { expanded, title, children } = this.props;
    return (
      <Wrapper expanded={expanded}>
        <Header onClick={this.onClick}>
          <Title>{title}</Title>
          <CarretContainer expanded={expanded}>
            <Carret />
          </CarretContainer>
        </Header>
        <Content expanded={expanded} height={this.height}>
          <Content.Body ref={this.setRef}>{children}</Content.Body>
        </Content>
      </Wrapper>
    );
  }
}

export default Item;
