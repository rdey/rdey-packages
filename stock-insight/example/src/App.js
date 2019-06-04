import React, { Component, useState } from 'react';
import styled from 'styled-components';

import {
  CompanyQuality,
  FairValueRange,
  Impact,
  Timeframe,
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

const catalysts = [
  {
    id: '434ada18-13ce-3c08-8b40-a1a1ae030569',
    title: 'Turn around in the under performers',
    text:
      'A few units within the group are loss making or at least performing poorly. These are primarily the Airwell companies in France and Italy and the subsidiary Menerga. All of these should be able to reach double digit margins which would drive group EBIT margins towards their own target of 10 per cent.',
    negativePotency: 2,
    negativeLikelihood: 1,
    positivePotency: 2,
    positiveLikelihood: 2,
    timeframe: 1,
    comment: '',
    updatedAt: '2016-12-09T09:36:44+00:00',
    publishedAt: '2015-12-19T22:19:21+00:00',
  },
  {
    id: '9441501d-f633-365a-8955-9df443edc762',
    title: 'Major acquisitions',
    text:
      'Systemair acquires a number of smaller companies as a natural part of their expansion strategy. If they were to buy something more substantial (annual sales > SEK 300 m) it would call for some attention. Most likely they are able to buy these companies at lower multiples than their own.',
    negativePotency: 2,
    negativeLikelihood: 1,
    positivePotency: 2,
    positiveLikelihood: 2,
    timeframe: 1,
    comment: '',
    updatedAt: '2016-12-09T09:40:25+00:00',
    publishedAt: '2015-12-19T22:14:49+00:00',
  },
];

const GCWrapper = styled.div`
  padding: 20px;
`;

export default () => {
  const [selectedCompanyQuality, setSelectedCompanyQuality] = useState(
    'people'
  );

  const makeQc = (size) => {
    return (
      <GCWrapper>
        <CompanyQuality
          people={3}
          financials={5}
          business={4}
          selected={selectedCompanyQuality}
          onClick={setSelectedCompanyQuality}
          size={size}
        />
      </GCWrapper>
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
      <Section>
        <Header>Catalyst Potential</Header>
        <Impact value={3} short={true} mid={true} size="l" />
        <GCWrapper>
          <Timeframe size="l" width={116} height={64} timeframe={0} />
        </GCWrapper>
        <GCWrapper>
          <Timeframe size="l" width={116} height={64} timeframe={1} />
        </GCWrapper>
        <GCWrapper>
          <Timeframe size="l" width={116} height={64} timeframe={2} />
        </GCWrapper>
        <GCWrapper>
          <CatalystPotential catalysts={catalysts} size="s" />
        </GCWrapper>
        <GCWrapper>
          <CatalystPotential catalysts={catalysts} size="m" />
        </GCWrapper>
        <GCWrapper>
          <CatalystPotential catalysts={catalysts} size="l" />
        </GCWrapper>
      </Section>
    </Wrapper>
  );
};
