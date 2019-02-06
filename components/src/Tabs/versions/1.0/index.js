import styled from 'styled-components';
import { pltabletMq, accent64, otherCaption12 } from '@rdey/design';

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0 1em;
  ${pltabletMq} {
    padding: 0;
  }
`;

export const Tab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid transparent;
  ${({ selected }) => selected && `border-bottom-color: ${accent64}`};
  padding: 1em 0.5em;
  margin-right: 1em;
  flex: 1;
  ${pltabletMq} {
    flex: 0;
  }
`;

export const TabText = styled(otherCaption12.css('div'))`
  white-space: nowrap;
`;
