/**
 * @class CompanyQuality
 */

import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { range } from 'lodash-es';
import { colors, primaryTextMixin } from '@rdey/design';
import { ComponentTitle } from './components';
import { Size } from './types';
import { clickable } from './mixins';

const margins = {
  l: 24,
  m: 1,
  s: 1,
};

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
  margin-right: ${({ theme: { size } }) => margins[size]}px;
  :last-child {
    margin: 0;
  }
`;
const widths = {
  l: [24, 32, 40, 48, 56],
  m: [10, 12, 16, 20, 24],
  s: [6, 8, 12, 14, 18],
};

const increments = {
  l: 16,
  m: 12,
  s: 6,
};

const Bars =
  styled.div <
  { value: 1 | 2 | 3 | 4 | 5 } >
  `
  width: ${({ theme: { selected, size }, value }) =>
    widths[size][value - 1] + (selected ? increments[size] : 0)}px;
  transition: width 0.5s ease;
  margin: 0 auto;

`;

const heights = {
  l: 12,
  m: 6,
  s: 4,
};

const Bar = styled.div`
  height: ${({ theme: { size } }) => heights[size]}px;
  margin: 1px 0;
  :first-child,
  :last-child {
    margin: 0;
  }
  background: ${colors.secondary4.hslCss};
`;

const TitleWrapper = styled.div`
  padding-top: 0.5em;
`;

const Title = styled.div`
  transition: font-size 0.5s ease;
  ${primaryTextMixin({
    color: 'secondary4',
    fontWeight: 600,
    opacity: 1,
  })};
  ${({ theme: { selected } }) =>
    !selected &&
    `
    font-size: 0.75em;
    font-weight: 300;
    opacity: 0.75;
  `};
`;

const wrapperPaddings = {
  l: 8,
  m: 4,
  s: 0,
};

const ValueWrapper = styled.div`
  ${({ theme: { size } }) => size === 's' && 'display: none;'};
  display: block;
  padding-bottom: ${({ theme: { size } }) => wrapperPaddings[size]}px;
`;

const valueFontSizes = {
  l: 12,
  m: 9,
  s: 0,
};
const valueFontWeights = {
  l: '500',
  m: 'normal',
  s: 'normal',
};

const Value = styled.div`
  ${({ theme: { size } }) =>
    primaryTextMixin({
      color: 'secondary4',
      fontWeight: valueFontWeights[size],
    })};
  line-height: 1;
  font-size: ${({ theme: { size } }) => valueFontSizes[size]}px;
`;

const sizes = {
  l: '1.5',
  m: '1',
  s: '0',
};

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: ${({ theme: { size } }) => sizes[size]}em;
`;

const Pillar = ({
  selected,
  size,
  onClick,
  value,
  title,
}: {
  selected: boolean,
  size: Size,
  onClick: () => void,
  value: 1 | 2 | 3 | 4 | 5,
  title: string,
}) => {
  return (
    <ThemeProvider theme={{ selected }}>
      <PillarWrapper onClick={onClick}>
        {size !== 's' && (
          <ValueWrapper>
            <Value>{value}</Value>
          </ValueWrapper>
        )}
        <Bars value={value}>
          {range(0, value).map((ii: number) => {
            return <Bar key={ii} />;
          })}
        </Bars>
        {size === 'l' && (
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
        )}
      </PillarWrapper>
    </ThemeProvider>
  );
};

type area = 'people' | 'financials' | 'business';
type Value = 1 | 2 | 3 | 4 | 5;
export type CompanyQualityProps = {
  people: Value,
  financials: Value,
  business: Value,
  selected: area,
  onClick: (arg: area) => void,
  size: 's' | 'm' | 'l',
  className?: string,
  allSelected?: boolean,
};

const CompanyQuality = (props: CompanyQualityProps) => {
  const {
    allSelected = false,
    people,
    financials,
    business,
    selected,
    onClick,
    size,
    className,
  } = props;
  return (
    <ThemeProvider theme={{ size }}>
      <div className={className} css={clickable()}>
        <div css="text-align: center;">
          <Flex>
            <Pillar
              value={people}
              title="People"
              selected={selected === 'people' || allSelected}
              onClick={() => onClick('people')}
              size={size}
            />
            <Pillar
              value={financials}
              title="Financials"
              selected={selected === 'financials' || allSelected}
              onClick={() => onClick('financials')}
              size={size}
            />
            <Pillar
              value={business}
              title="Business"
              selected={selected === 'business' || allSelected}
              onClick={() => onClick('business')}
              size={size}
            />
          </Flex>
          {size !== 's' && <ComponentTitle>Company quality</ComponentTitle>}
        </div>
      </div>
    </ThemeProvider>
  );
};
export default CompanyQuality;
