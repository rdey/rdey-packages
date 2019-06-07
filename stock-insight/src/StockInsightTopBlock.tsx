import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { colors, s } from '@rdey/design';
import CompanyQuality, { CompanyQualityProps } from './CompanyQuality';
import { Size } from './types';
import FairValueRange, { FairValueRangeProps } from './FairValueRange';
import CatalystPotential, { Catalysts } from './CatalystPotential';

const { css } = s;

const Block = styled.div`
  display: flex;
`;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>


const Delimiter = styled.div<{ responsive?: boolean}>`
  background: ${colors.base8.hslCss};
  width: 1px;
  ${({ responsive }) => responsive && (
    `
      display: none;
      @media (min-width: 768px) {
        display: block;
      }
    `

  )}
`;

type GenericProps = {
  opacity?: number;
  onClick?: () => any;
}

type Props = {
  size: Size,
  companyQuality: Omit<CompanyQualityProps, 'size'> & GenericProps,
  fairValueRange: Omit<FairValueRangeProps, 'size'> & GenericProps,
  catalystPotential: {
    catalysts: Catalysts,
  } & GenericProps,
  AnalystView: React.JSXElementConstructor<any>;
  className?: string;
};

const childStyle = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const StockInsightTopBlock = ({ size, companyQuality, fairValueRange, catalystPotential, AnalystView, className }: Props) => {
  const companyQualityOpacity = companyQuality.opacity || 1;
  const catalystPotentialOpacity = catalystPotential.opacity || 1;
  const fairValueRangeOpacity = fairValueRange.opacity || 1;

  return (
    <ThemeProvider theme={{ size }}>
      <Block className={className}>
        <CompanyQuality
          people={companyQuality.people}
          financials={companyQuality.financials}
          business={companyQuality.business}
          selected={companyQuality.selected}
          onClick={companyQuality.onClick}
          size={size}
          css={childStyle + '; opacity: ' + companyQualityOpacity + ';'}
          staticMode
        />
        {size !== 's' && (
          <Delimiter responsive></Delimiter>
        )}
        <FairValueRange
          bear={fairValueRange.bear}
          base={fairValueRange.base}
          bull={fairValueRange.bull}
          price={fairValueRange.price}
          size={size}
          css={`flex: 1; display: flex; flex-direction: column; opacity: ${fairValueRangeOpacity};`}
          onClick={fairValueRange.onClick}
        ></FairValueRange>
        {size !== 's' && (
          <Delimiter responsive></Delimiter>
        )}
        <CatalystPotential size={size} catalysts={catalystPotential.catalysts}
          css={childStyle + '; opacity: ' + catalystPotentialOpacity + ';'}
          onClick={catalystPotential.onClick}
        />
        <Delimiter></Delimiter>
        <AnalystView></AnalystView>
      </Block>
    </ThemeProvider>
  );
};

export default StockInsightTopBlock;
