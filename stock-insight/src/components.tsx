import styled from 'styled-components';
import { primaryTextMixin, s } from '@rdey/design';

const { css } = s;

export const AbsoluteWrapper = styled.div`
  position: absolute;
`;

export const Title = styled.div`
  ${primaryTextMixin({
    fontWeight: '300',
    color: 'secondary4',
    opacity: 0.75,
  })};
  font-size: 12px;
`;

export const CatalystHeaderTitle = styled.div`
  ${primaryTextMixin({
    fontWeight: '300',
    fontSize: 12,
    color: 'secondary4',
    opacity: 0.75,
  })};
  text-align: center;
  padding-top: 16px;
  line-height: 1;
`;

const largeSize = css`
  text-transform: uppercase;
  ${primaryTextMixin({
    color: 'secondary4',
    opacity: 0.5,
    fontWeight: '600',
  })};
  font-size: 10px;
`;

const mediumSize = css`
  text-transform: capitalize;
  ${primaryTextMixin({
    color: 'secondary4',
    fontWeight: 'normal',
  })};
  font-size: 9px;
`;

export const ComponentTitle = styled.div`
  text-align: center;
  margin: auto;
  ${({ theme: { size } }) => {
    if (size === 'l') {
      return largeSize;
    }
    if (size === 'm') {
      return mediumSize;
    }
    return ''
  }}
`;
