import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  & > * + * {
    margin: 1em 0;
  }
  padding-top: 0.5em;
`;

const AccordionText = styled.div`
  font-size: 0.75em; /* 0.75em */
  line-height: 1.67;
  padding: 0;
  color: #fff;
  :last-child {
    padding-bottom: 0;
  }
`;
const Ol = styled.ol`
  font-size: 0.75em; /* 0.75em */
  padding-left: 2em;
  padding-top: 0;
  padding-bottom: 0;
`;

const A = styled.a`
  color: #7bc6de;
  text-decoration: none;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  font-size: inherit; /* 0.75em */
  line-height: 1.67;
  font-family: Roboto, 'Libre Franklin', sans-serif;
`;

const TERMS = [
  {
    title: 'Client agreement',
    body: (
      <Wrapper>
        <AccordionText>
          This Agreement constitutes your understanding with Redeye AB
          (“Redeye”), registration no. 556581-2954, Mäster Samuelsgatan 42,
          SE-111 57 Stockholm, SWEDEN, Telephone +46 8-545 013 30,
          www.redeye.se.
        </AccordionText>
        <AccordionText>
          Redeye is an investment firm (Swe: värdepappersbolag) authorized by
          and under the supervision of the Swedish FSA to conduct securities
          business pursuant to the Securities Market Act.
        </AccordionText>
        <AccordionText>
          Prior to performing any services or entering any agreement with a
          client Redeye is, pursuant to applicable rules and regulations,
          obliged to gather the information and documentation set out in this
          questionnaire. Therefore, please fill in the questionnaire and submit
          it to Redeye together with the requested documentation, as further set
          out in this Agreement. Please be advised that in the event Redeye does
          not receive the required information, Redeye is prohibited from
          entering the Agreement and providing services to a client.
        </AccordionText>
        <AccordionText>
          Redeye reserves the right to at any time request additional
          information from the Client to comply with Redeye’s regulatory and
          legal obligations. Furthermore, the Client is advised that Redeye may
          gather additional information and documentation from third parties if
          necessary to comply with Redeye’s legal or regulatory obligations.
        </AccordionText>
        <AccordionText>
          Client information received by Redeye is treated confidentially and is
          encompassed by legal non-disclosure obligations. The information
          provided will be stored in the central client register of Redeye will
          be used for purposes of administrating the client relationship and
          ensuring due fulfilment of Redeye’s regulatory obligations.
          Information will only be disclosed to third parties when Redeye is
          under a legal or regulatory obligation to do so.
        </AccordionText>
        <AccordionText>
          Redeye may refrain from establishing any client relationship without
          specifying the reason hereto.
        </AccordionText>
        <AccordionText>
          Please do not hesitate to contact us if you have any questions.
        </AccordionText>
      </Wrapper>
    ),
    id: 'clientAgreement',
  },
  {
    title: 'Client categorization',
    body: (
      <Wrapper>
        <AccordionText>
          Redeye is required, under the Swedish Securities Market Act(SFS
          2007:528), to categorise each Client into one of the following
          categories: non - professional client, professional client or eligible
          counterparty.
        </AccordionText>
        <AccordionText>
          For the services offered by Redeye under this Agreement and unless you
          are specifically and in a separate procedure categorized differently,
          you will be categorized as a Non- professional Client.
        </AccordionText>

        <AccordionText>
          As a non - professional client, you have the highest level of investor
          protection afforded by the conduct of business rules under the
          Securities Market Act.This means, among other things, that Redeye will
          provide you with information about our company and services, on
          financial instruments of interest and the risks associated with them,
          as well as the costs and other fees for trading in such financial
          instruments.
        </AccordionText>
        <AccordionText>
          Clients who are categorized as Non - Professional Client may be
          treated as Professionals Clients on request, provided however that
          certain relevant criteria and procedure are fulfilled.If Redeye
          approves your request and re - categorizes you as a Professional
          Client, you will lose a substantial part of the investor protection
          afforded by the conduct of business rules under the Securities Market
          Act.
        </AccordionText>
      </Wrapper>
    ),
    id: 'clientCategorization',
  },
  {
    title: 'Services offered by Redeye',
    body: (
      <Wrapper>
        <AccordionText>
          This Agreement covers the following investment services:
        </AccordionText>
        <Ol>
          <li>
            Reception and transmission of orders in relation to one or more
            financial instruments.
          </li>
          <li>Execution of orders on behalf of clients, and</li>
          <li>Investment advice</li>
        </Ol>
        <AccordionText>
          Please note that the investment services provided by Redeye may relate
          to financial instruments for which Redeye has research coverage.
        </AccordionText>
        <AccordionText>
          The investment advice provided by Redeye is limited to specific
          transactions or/and equities and does not include general advice on
          portfolio strategies and objectives.
        </AccordionText>
        <AccordionText>
          When Redeye provides investment advice, Redeye is obligated to assess
          whether a service or an instrument is suitable for the Client before
          Redeye provides the service or recommends the instrument (“suitability
          assessment”). The suitability assessment implies gathering necessary
          and appropriate information about the Client’s investment objective,
          financial situation, experience and knowledge. The reason for the
          suitability assessment is to enable Redeye to act in the Client’s best
          interest.
        </AccordionText>
        <AccordionText>
          When Redeye provides other investment services than investment advice,
          Redeye will assess whether the service is appropriate for the Client
          based on its knowledge and experience (“appropriateness assessment”).
        </AccordionText>
        <AccordionText>
          However, please be advised that if the investment service consists
          only of reception and transmission of orders and/or execution of
          orders, the service is provided at the initiative of the Client and
          the transaction relates to shares traded on a regulated market or
          other non-complex financial instrument (so-called “execution only”
          business), Redeye will not conduct any appropriateness assessment.
        </AccordionText>
        <AccordionText>
          Please continue this process after signing the KYC and PEP
          documentation and fill in the requested information to enable Redeye
          to perform a correct suitability assessment and/or appropriateness
          assessment.
        </AccordionText>
      </Wrapper>
    ),
    id: 'servicesOfferedByRedeye',
  },
  {
    title: 'Correctness of information and acceptance of key terms',
    body: (
      <Wrapper>
        <AccordionText>
          By continuing the process and signing this agreement, you hereby
          confirm and accept:
        </AccordionText>
        <Ol>
          <li>That you have been informed of your client categorization</li>
          <li>
            That you agree to receive information and documentation, such as
            contract notes and transaction confirmations, by e-mail, provided
            however, you have provided Redeye with a valid e-mail address,
          </li>
          <li>
            That information not addressed to the Client personally is posted on
            www.redeye.se,
          </li>
          <li>
            That you have read and understood Redeye’s General Terms and
            Conditions (LINK to open PDF in new tab), and
          </li>
          <li>
            That Redeye may process your personal data in accordance with the
            General Data Protection Regulation (GDPR), and with certain
            exceptions to it in order to fulfill its legal duties regarding for
            example controls on money laundering.
          </li>
        </Ol>
        <AccordionText>
          Furthermore, you confirm and accept that all information and
          documentation provided by you in this document is correct and
          complete, and that you will inform Redeye in the event there is a
          change in the information or documentation provided.
        </AccordionText>
      </Wrapper>
    ),
    id: 'correctnessOfInformationAndAcceptanceOfKeyTerms',
  },
];

export default TERMS;
