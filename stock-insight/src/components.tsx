import styled from 'styled-components';
import { primaryTextMixin } from '@rdey/design';

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
