import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primaryTextMixin } from '@rdey/design';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLayoutType } from '../../selectors/app';

import IconReadLess from '../../components/IconReadLess';
import IconReadMore from '../../components/IconReadMore';
import { DESKTOP_VIEWPORT } from '../../constants/layoutMetrics';

const Wrapper = styled.div`
  margin: ${({ theme }) => {
    const w = theme.getGutterWidthCss();
    return `1.5em ${w} 0 ${w}`;
  }};
  @media (min-width: ${DESKTOP_VIEWPORT}px) {
    margin: 1.5em 0 0 0;
  }
`;
const HeaderWrapper = styled.div`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;
const Header = styled.div`
  ${primaryTextMixin({ fontSize: 12, color: 'secondary1', opacity: '0.5' })};
  margin: 0;
`;

const BodyWrapper = styled.div`
  padding-bottom: 2em;
  width: ${({ theme }) => theme.getColumnWidthCss(4)};
`;

const Body = styled.div`
  ${primaryTextMixin({ fontSize: 12, color: 'secondary4' })};
`;

const CollapseButton = styled.button`
  height: 2.5em;
  display: flex;
  align-items: center;
  apperance: none;
  background: none;
  border: none;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid rgba(253, 95, 90, 0.3);
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

const ButtonLabel = styled.div`
  ${primaryTextMixin({ fontSize: 12, color: 'secondary4' })};
  text-transform: uppercase;
`;

const ExtraSpace = styled.div`
  height: 1px;
`;

class Disclaimer extends React.PureComponent {
  state = {
    collapsed: true,
    hasScrolled: false,
  };

  componentDidUpdate() {
    const { collapsed, hasScrolled } = this.state;

    if (!collapsed && !hasScrolled) {
      this.setState({
        hasScrolled: true,
      });
    }
  }

  toggleCollapse = () => {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
      hasScrolled: false,
    }));
  };

  setEl = (el) => {
    if (el) {
      this.el = el;
    }
  };

  render() {
    const { collapsed, hasScrolled } = this.state;
    const layoutType = 'LAYOUT_TYPE_DESKTOP';

    if (this.el && !collapsed && hasScrolled) {
      this.el.scrollIntoView({ behavior: 'smooth' });
    }

    return (
      <Wrapper>
        {layoutType === 'LAYOUT_TYPE_MOBILE' && (
          <CollapseButton onClick={this.toggleCollapse}>
            <ButtonLabel>
              {collapsed ? 'Read disclaimer' : 'Close disclaimer'}
            </ButtonLabel>
            {collapsed ? <IconReadMore /> : <IconReadLess />}
          </CollapseButton>
        )}
        {((!collapsed && layoutType === 'LAYOUT_TYPE_MOBILE') ||
          layoutType === 'LAYOUT_TYPE_DESKTOP') && (
          <>
            <HeaderWrapper>
              <Header>Disclaimer</Header>
            </HeaderWrapper>
            <BodyWrapper>
              <Body>
                Redeye may change the screening criteria at any time. The stock
                ideas that our investment strategies generate serve as a
                starting point for further research, and are not to be
                considered as stock tips nor are they a call list for the reader
                to invest. Stock ideas also do not have a time horizon, for
                example, six or twelve months. Past performance are not
                indicative of future returns, on average.
              </Body>
            </BodyWrapper>
          </>
        )}
        {!collapsed && <ExtraSpace ref={this.setEl} />}
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  layoutType: makeSelectLayoutType(),
});

Disclaimer.propTypes = {
  layoutType: PropTypes.string,
};

export default connect(
  mapStateToProps,
  null
)(Disclaimer);
