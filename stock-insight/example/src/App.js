import React, { Component, useState } from 'react';
import styled from 'styled-components';

import {
  CompanyQuality,
  FairValueRange,
  CatalystPotential,
} from 'stock-insight';

const Wrapper = styled.div``;

const Flex = styled.div`
  display: flex;
  height: 150px;
  padding: 20px;
  justify-content: center;
`;

const Header = styled.h1`
  color: white;
  text-align: center;
`;
const Section = styled.div`
  padding: 20px;
  border-bottom: 4px dashed #eee;
  background: #1b1b22;
`;

export default () => {
  const [selectedCompanyQuality, setSelectedCompanyQuality] = useState(
    'people'
  );

  const makeQc = (size) => {
    return (
      <Flex>
        <CompanyQuality
          value={3}
          title="People"
          selected={selectedCompanyQuality === 'people'}
          onClick={() => setSelectedCompanyQuality('people')}
          size={size}
        />
        <CompanyQuality
          value={5}
          title="Financials"
          selected={selectedCompanyQuality === 'financials'}
          onClick={() => setSelectedCompanyQuality('financials')}
          size={size}
        />
        <CompanyQuality
          value={4}
          title="Business"
          selected={selectedCompanyQuality === 'business'}
          onClick={() => setSelectedCompanyQuality('business')}
          size={size}
        />
      </Flex>
    );
  };

  return (
    <Wrapper>
      <Section>
        <Header>Company quality</Header>
        {makeQc('s')}
        {makeQc('m')}
        {makeQc('l')}
      </Section>
      <Section>
        <Header>Fair value range</Header>
        <FairValueRange bear={23} base={43} bull={77} price={33} size="s" />
        <FairValueRange bear={23} base={43} bull={77} price={33} size="m" />
        <FairValueRange bear={23} base={43} bull={77} price={33} size="l" />
      </Section>
      {/* <CatalystPotential value={3} title="people" selected={true} /> */}
    </Wrapper>
  );
};
