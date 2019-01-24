import React from 'react';
import styled, { keyframes } from 'styled-components';
import { $cherryLight } from '../atoms';

const heightAnimation = keyframes`
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(2);
  }
`;
const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1em;

  & div {
    width: 1em;
    background: #f5f5f5;
    height: 2.25em;
    margin-right: 0.25em;
    transform-origin: bottom;
    animation: ${heightAnimation} ease-in-out 0.55s alternate infinite;
  }

  & div.rect1 {
    animation-delay: -1.2s;
  }

  & div.rect2 {
    animation-delay: -1.1s;
  }

  & div.rect3 {
    animation-delay: -1s;
  }

  & div.rect4 {
    animation-delay: -0.9s;
  }

  & div.rect5 {
    animation-delay: -0.8s;
  }
`;

const LoadingWrapper = styled.div``;
const LoadingMessage = styled.div`
  font-family: Oswald;
  color: ${$cherryLight};
  font-size: 1em;
  text-align: center;
  text-transform: uppercase;
`;

const MESSAGES = [
  'Connecting to the cloud...',
  'Loading financial data...',
  'Parsing balance sheets...',
  'Constructing research feed...',
  'Evaluating latest news...',
  'Interpreting external data...',
  'Aggregating sources...',
  'Configuring the interface...',
  'Finalizing calculations...',
  'Compressing the code...',
];

class LoadingSpinner extends React.PureComponent {
  state = {
    message: 0,
  };

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState((prevState) => ({
        message:
          prevState.message === MESSAGES.length - 1 ? 0 : prevState.message + 1,
      }));
    }, 1100);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { message } = this.state;
    return (
      <LoadingWrapper>
        <SpinnerWrapper>
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </SpinnerWrapper>
        <LoadingMessage>{MESSAGES[message]}</LoadingMessage>
      </LoadingWrapper>
    );
  }
}

export default LoadingSpinner;
