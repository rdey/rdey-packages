import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { colors,s } from '@rdey/design';
import CompanyQuality, { CompanyQualityProps } from './CompanyQuality';
import { Size } from './types';
import FairValueRange, { FairValueRangeProps } from './FairValueRange';
import CatalystPotential, { Catalysts } from './CatalystPotential';

const { css } = s;

const Block = styled.div`
  padding: 1.5em 0;
  background-image: linear-gradient(
    to bottom,
    ${colors.base2.hslCss},
    rgba(0, 0, 0, 0)
  );
  display: flex;
`;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>


const Delimiter = styled.div`
  background: ${colors.base8.hslCss};
  width: 1px;
`;

type Props = {
  size: Size,
  companyQuality: Omit<CompanyQualityProps, 'size'>,
  fairValueRange: Omit<FairValueRangeProps, 'size'>,
  catalysts: Catalysts,
  AnalystView: React.JSXElementConstructor;
};

const childStyle = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const StockInsightTopBlock = ({ size, companyQuality, fairValueRange, catalysts, AnalystView }: Props) => {
  return (
    <ThemeProvider theme={{ size }}>
      <Block>
        <CompanyQuality
          people={companyQuality.people}
          financials={companyQuality.financials}
          business={companyQuality.business}
          selected={companyQuality.selected}
          onClick={companyQuality.onClick}
          size={size}
          css={childStyle}
        />
        {size !== 's' && (
          <Delimiter></Delimiter>
        )}
        <FairValueRange
          bear={fairValueRange.bear}
          base={fairValueRange.base}
          bull={fairValueRange.bull}
          price={fairValueRange.price}
          size={size}
          css={`flex: 1;`}
        ></FairValueRange>
                {size !== 's' && (
          <Delimiter></Delimiter>
        )}
        <CatalystPotential size={size} catalysts={catalysts}
          css={childStyle}
        />
        <Delimiter></Delimiter>
        <AnalystView></AnalystView>
      </Block>
    </ThemeProvider>
  );
};

export default StockInsightTopBlock;
