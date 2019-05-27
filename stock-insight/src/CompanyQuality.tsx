/**
 * @class CompanyQuality
 */

import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { range } from 'lodash-es';
import { colors, primaryTextMixin } from '@rdey/design';

const PillarWrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  transition: opacity 0.5s ease;
  ${({ theme: { selected } }) =>
    !selected &&
    `
    opacity: 0.75;
  `};
  :hover {
    text-decoration: none;
    cursor: pointer;
  }
  margin-right: 3em;
  :last-child {
    margin: 0;
  }
`;

const Bars = styled.div<{ value: number }>`
  width: ${({ theme: { selected }, value }) =>
    16 + 8 * value + (selected ? 16 : 0)}px;
  transition: width 0.5s ease;
  margin: 0 auto;
`;

const Bar = styled.div`
  height: 1em;
  margin: 1px 0;
  :first-child,
  :last-child {
    margin: 0;
  }
  background: ${colors.secondary4.hslCss};
`;

const TitleWrapper = styled.div`
  padding-top: 1em;
`;

const Title = styled.div`
  transition: font-size 0.5s ease;
  ${primaryTextMixin({
    color: 'secondary4',
  })};
  ${({ theme: { selected } }) =>
    !selected &&
    `
    font-size: 0.75em;
  `};
`;

type Props = {
  value: number;
  title: string;
  selected?: boolean;
  onClick?: () => void;
};

const CompanyQuality = ({ value, title, selected, onClick }: Props) => {
  return (
    <ThemeProvider theme={{ selected }}>
      <PillarWrapper onClick={onClick}>
        <Bars value={value}>
          {range(0, value).map((ii: number) => {
            return <Bar key={ii} />;
          })}
        </Bars>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
      </PillarWrapper>
    </ThemeProvider>
  );
};
export default CompanyQuality;

