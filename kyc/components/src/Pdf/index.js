import { Checkbox } from '@rdey/components';
import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  FREE_TEXT_PURPOSES,
  FREE_TEXT_PURPOSES_ORIGIN_OF_THE_FUNDS,
  FREE_TEXT_PURPOSES_PURPOSE_OF_USING_REDEYES_SERVICES,
  AMOUNT_LABELS,
  FREQUENCY_LABELS,
  HORIZON_LABELS,
  TAX_LIABILITY_FALSE,
  TAX_LIABILITY_TRUE,
  KYC_TYPE_COMPANY,
  KYC_TYPE_PERSON,

} from '@rdey/kyc-isomorphic-entities';
import {
  Bold,
  Header,
  Italic,
  NumericList,
  Paragraph,
  Section,
  SectionHeader,
  SubHeader,
  SubSection,
  SubSectionHeader,
  UnorderedList,
  WhiteBox,
  Wrapper,
} from './atoms';
// Bold,
//   Header,
//   Italic,
//   NumericList,
//   Paragraph,
//   Section,
//   SectionHeader,
//   SubHeader,
//   SubSection,
//   SubSectionHeader,
//   UnorderedList,
//   WhiteBox,
//   Wrapper,


const Box = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BoxValue = styled.div`
  padding-top: 1em;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background-color: #eeeeee;
`;

const BoxTitle = styled.div`
  font-weight: bold;
`;

const Boxes = styled.div`
  & > * + * {
    margin: 1em 0;
  }
`;

const Checkboxes = styled.div`
  & > * + * {
    margin: 1.5em 0;
  }
`;

const Table = styled.table`
  border: 3px solid #000000;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  td,
  th {
    border: 1px solid #000000;
    padding: 5px 4px;
  }
  tbody td {
    font-size: 13px;
  }
  thead {
    background: #cfcfcf;
    background: -moz-linear-gradient(
      top,
      #dbdbdb 0%,
      #d3d3d3 66%,
      #cfcfcf 100%
    );
    background: -webkit-linear-gradient(
      top,
      #dbdbdb 0%,
      #d3d3d3 66%,
      #cfcfcf 100%
    );
    background: linear-gradient(
      to bottom,
      #dbdbdb 0%,
      #d3d3d3 66%,
      #cfcfcf 100%
    );
    border-bottom: 3px solid #000000;
  }
  thead th {
    font-size: 15px;
    font-weight: bold;
    color: #000000;
    text-align: left;
  }
  tfoot {
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    border-top: 3px solid #000000;
  }
  tfoot td {
    font-size: 14px;
  }
`;

const Bread = styled.div`
  page-break-after: always;
`;

const PdfHeader = styled.div`
  display: flex;
  flow: static(header);
  align-items: stretch;
`;

const PdfHeaderTitle = styled.h4`
  display: flex;
  align-items: center;
  padding-left: 0.5em;
  flex: 1;
`;
const PdfHeaderVersion = styled.div`
  padding-left: 0.5em;
  line-height: 1;
  text-transform: uppercase;
  font-size: 0.75em;
  display: flex;
  align-items: center;
`;

const GlobalStyle = createGlobalStyle`
  @page {
    @top {
      content: flow(header);
    }
    @bottom {
      content: string(footer);
      text-align: right;
      font-size: 0.75em;
      text-transform: uppercase;
      font-family: Roboto;
    }
  } 
`;

const Logo = styled.div`
  background-image: url(https://res.cloudinary.com/redeye/image/upload/v1547040019/Logotype_Horizontal_Black_jkwqlg.png);
  background-size: contain;
  height: 2em;
  width: 7.25em;
  background-repeat: no-repeat;
  background-position: center center;
`;

const BoxGroup = styled.div`
  display: flex;
  width: 100%;
  & > ${Box}:first-of-type {
    margin-right: 1em;
  }
  ${Box} {
    flex: 1;
  }
`;

const getFreeTextInput = (state, section) =>
  Object.entries(FREE_TEXT_PURPOSES[section].labels)
    .filter(([key]) => state.freeTextPurposes[section][key])
    .map(([key, val]) => {
      if (FREE_TEXT_PURPOSES[section].freeTextFields.includes(key)) {
        return state.freeTextPurposes[section][key];
      }
      return val;
    })
    .join(', ');

class Pdf extends React.PureComponent {
  componentDidMount() {
    const { print } = this.props;
    if (print && typeof window !== 'undefined') {
      window.print();
    }
  }

  render() {
    const { state, print } = this.props;
    return (
      <Fragment>
        <GlobalStyle />
        <Wrapper>
          <Bread>
            <PdfHeader>
              <Logo />
              <PdfHeaderTitle>
                Client Agreement-Investment Services
              </PdfHeaderTitle>
              <PdfHeaderVersion>Version: 2016-12-10</PdfHeaderVersion>
            </PdfHeader>
            <Header>Client Agreement</Header>
            <SubHeader style={{ textAlign: 'center' }}>
              Investment Services
            </SubHeader>
            <SubSectionHeader>Version: 2016-12-10</SubSectionHeader>
            <Paragraph>
              <Fragment>
                This Agreement constitutes your understanding with Redeye AB (“
              </Fragment>
              <Bold>Redeye</Bold>
              <Fragment>
                ”), registration no. 556581-2954, Mäster Samuelsgatan 42, SE-111
                57 Stockholm, SWEDEN, Telephone +46 8-545 013 30, www.redeye.se.
                Redeye is an investment firm (Swe: värdepappersbolag) authorized
                by and under the supervision of the Swedish FSA to conduct
                securities business pursuant to the Securities Market Act.
              </Fragment>
            </Paragraph>
            <Paragraph>
              Prior to performing any services or entering any agreement with a
              client Redeye is, pursuant to applicable rules and regulations,
              obliged to gather the information and documentation set out in
              this document. Please be advised that in the event Redeye does not
              receive the required information, Redeye is prohibited from
              entering the Agreement and providing services to a client.
            </Paragraph>
            <Paragraph>
              Redeye reserves the right to at any time request additional
              information from the Client to comply with Redeye’s regulatory and
              legal obligations. Furthermore, the Client is advised that Redeye
              may gather additional information and documentation from third
              parties if necessary to comply with Redeye’s legal or regulatory
              obligations.
            </Paragraph>
            <Paragraph>
              Client information received by Redeye is treated confidentially
              and is encompassed by legal non-disclosure obligations. The
              information provided will be stored in the central client register
              of Redeye will be used for purposes of administrating the client
              relationship and ensuring due fulfilment of Redeye’s regulatory
              obligations. Information will only be disclosed to third parties
              when Redeye is under a legal or regulatory obligation to do so.
            </Paragraph>
            <Paragraph>
              Redeye may refrain from establishing any client relationship
              without specifying the reason hereto.
            </Paragraph>
            <Paragraph>
              Please do not hesitate to contact us if you have any questions.
            </Paragraph>
          </Bread>
          <Section>
            <SectionHeader>
              1. Client information - pursuant to inter alia the Money
              Laundering and Terrorist Financing (Prevention) Act (2009:92)
              (AML)
            </SectionHeader>
            <SubSection>
              <Paragraph>
                Redeye is required, pursuant to inter alia the Money Laundering
                and Terrorist Financing (Prevention) Act (2009:92), to collect
                information on and verify the identity of the Client and to
                gather such information from the client that enables Redeye to
                understand and have good knowledge of the client as well as the
                purpose of the transactions performed and services requested by
                the client
              </Paragraph>
              <Boxes>
                {state.kycType === KYC_TYPE_PERSON && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>Name</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_PERSONAL_FIRST_NAME}
{' '}
                        {state.formData.FIELD_PERSONAL_LAST_NAME}
                      </BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Personal ID</BoxTitle>
                      <BoxValue>{state.formData.FIELD_PERSONAL_SSN}</BoxValue>
                    </Box>
                  </BoxGroup>
                )}
                {state.kycType === KYC_TYPE_COMPANY && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>Company name</BoxTitle>
                      <BoxValue>{state.formData.FIELD_COMPANY_NAME}</BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Company LEI code</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_COMPANY_LEI_CODE}
                      </BoxValue>
                    </Box>
                  </BoxGroup>
                )}
                {/* personal address */}
                {state.kycType === KYC_TYPE_PERSON && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>Address</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_PERSONAL_ADDRESS}
                      </BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Postal code, city and country</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_PERSONAL_ZIP_CODE}
                        <Fragment>, </Fragment>
                        {state.formData.FIELD_PERSONAL_CITY}
                        <Fragment>, </Fragment>
                        {state.formData.FIELD_PERSONAL_COUNTRY_OF_RESIDENCE}
                      </BoxValue>
                    </Box>
                  </BoxGroup>
                )}
                {/* company address */}
                {state.kycType === KYC_TYPE_COMPANY && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>Company address</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_COMPANY_STREET_ADDRESS}
                      </BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Company postal code, city and country</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_COMPANY_ZIP_CODE}
                        <Fragment>, </Fragment>
                        {state.formData.FIELD_COMPANY_CITY}
                        <Fragment>, </Fragment>
                        {state.formData.FIELD_COMPANY_COUNTRY}
                      </BoxValue>
                    </Box>
                  </BoxGroup>
                )}
                {state.kycType === KYC_TYPE_PERSON && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>Nationality and citizenship</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_PERSONAL_CITIZENSHIP}
                      </BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Country of residence</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_PERSONAL_COUNTRY_OF_RESIDENCE}
                      </BoxValue>
                    </Box>
                  </BoxGroup>
                )}
                {state.kycType === KYC_TYPE_COMPANY && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>Country of incorporation</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_COMPANY_COUNTRY_OF_INCORPORATION}
                      </BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Contact person</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_COMPANY_CONTACT_FIRST_NAME}
{' '}
                        {state.formData.FIELD_COMPANY_CONTACT_LAST_NAME}
                      </BoxValue>
                    </Box>
                  </BoxGroup>
                )}
                {state.kycType === KYC_TYPE_COMPANY && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>Contact person e-mail</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_COMPANY_CONTACT_EMAIL}
                      </BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Contact person telephone number</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_COMPANY_CONTACT_PHONE_NUMBER}
                      </BoxValue>
                    </Box>
                  </BoxGroup>
                )}
                {state.kycType === KYC_TYPE_PERSON && (
                  <BoxGroup>
                    <Box>
                      <BoxTitle>E-mail address</BoxTitle>
                      <BoxValue>{state.formData.FIELD_PERSONAL_EMAIL}</BoxValue>
                    </Box>
                    <Box>
                      <BoxTitle>Telephone number</BoxTitle>
                      <BoxValue>
                        {state.formData.FIELD_PERSONAL_PHONE_NUMBER}
                      </BoxValue>
                    </Box>
                  </BoxGroup>
                )}
              </Boxes>
            </SubSection>
            {Object.keys(state.agents).length > 0 && (
              <SubSection>
                <SubSectionHeader style={{ margin: 0 }}>
                  Authorized to act on behalf of the Client
                </SubSectionHeader>
                <Paragraph>
                  Name and Personal ID of the person(s) authorized to act on
                  behalf of the Client (e.g. for companies the CEO or person
                  appointed by the Board of Directors to represent the company
                  by power of attorney)
                </Paragraph>
                <Table>
                  <tbody>
                    <tr>
                      <th>Full Name</th>
                      <th>Personal ID</th>
                    </tr>
                    {Object.entries(state.agents).map(
                      ([
                        key,
                        {
                          AGENTS_ROW_FULL_NAME: fullName,
                          AGENTS_ROW_SSN: personalId,
                        },
                      ]) => (
                        <tr key={key}>
                          <td>{fullName}</td>
                          <td>{personalId}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </Table>
              </SubSection>
            )}
            <SubSection>
              <SubSectionHeader>Tax liability in the USA</SubSectionHeader>
              <Paragraph>
                Redeye is required, pursuant to the Foreign Account Tax
                Compliance Act (FATCA), to report on assets held by US persons.
                Therefore, please confirm if you, as Redeye’s client, or if you
                as an owner of the client, is or has been, liable to pay tax in
                USA or if such person is a US citizen or resident in USA.
              </Paragraph>
              <Checkboxes>
                <Checkbox
                  checked={state.taxLiability === TAX_LIABILITY_TRUE}
                  dark
                  text="Yes, I am, or could be considered, a US citizen or resident or could be liable to pay tax in USA"
                />
                <Checkbox
                  checked={state.taxLiability === TAX_LIABILITY_FALSE}
                  dark
                  text="No, none of the above apply to me as the Client or to an owner of the Client"
                />
              </Checkboxes>
            </SubSection>
            <SubSection>
              <h3>Please state if the Client fulfils any of the following:</h3>
              <Checkboxes>
                {state.clientFulfillments
                  .CLIENT_FULFILLMENTS_SWEDISH_AUTHORITY && (
                  <Fragment>
                    <Checkbox
                      checked={
                        state.clientFulfillments
                          .CLIENT_FULFILLMENTS_SWEDISH_AUTHORITY
                      }
                      dark
                      text="The client is a Swedish authority"
                    />
                  </Fragment>
                )}
                {state.clientFulfillments.CLIENT_FULFILLMENTS_ENGAGED_IN && (
                  <Fragment>
                    <Bold>The client is engaged engaged in:</Bold>
                    <Checkbox
                      checked={
                        state.clientFulfillments.CLIENT_FULFILLMENTS_ENGAGED_IN
                      }
                      dark
                    >
                      <UnorderedList>
                        <li>banking or financial businesses,</li>
                        <li>life assurance businesses,</li>
                        <li>securities business,</li>
                        <li>
                          activities that require a notification or application
                          to the Swedish FSA under Obligation to Notify Certain
                          Financial Operations Act (1996:1006) or the Deposit
                          Taking Operations Act (2004:299),
                        </li>
                        <li>insurance mediation, or</li>
                        <li>mutual fund activities, </li>
                      </UnorderedList>
                    </Checkbox>
                  </Fragment>
                )}
                {state.clientFulfillments
                  .CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE && (
                  <Checkbox
                    checked={
                      state.clientFulfillments
                        .CLIENT_FULFILLMENTS_NONE_OF_THE_ABOVE
                    }
                    dark
                    text="The Client has its place of residence within the EES."
                  />
                )}
                {state.clientFulfillments.CLIENT_FULFILLMENTS_EEA_COMPANY && (
                  <Checkbox
                    checked={
                      state.clientFulfillments.CLIENT_FULFILLMENTS_EEA_COMPANY
                    }
                    dark
                    text="The Client is a company within the EEA whose transferable securities have been admitted to trading on a regulated market."
                  />
                )}
              </Checkboxes>
            </SubSection>
            {Object.keys(state.beneficialOwners).length > 0 && (
              <SubSection>
                <SubSectionHeader>
                  Beneficial owners of Clients who are legal entities
                </SubSectionHeader>
                <Paragraph>
                  Please provide details on any natural person who, directly or
                  indirectly (through e.g. one or several subsidiaries), holds
                  shares in the Client amounting to more than 25% of the
                  Client’s capital or votes, or in any other way exercise a
                  decisive influence over the customer through e.g. a share
                  holders’ agreement or the like (“beneficial owner”).
                </Paragraph>
                <Table>
                  <tbody>
                    <tr>
                      <th>Full Name</th>
                      <th>Birth date /Personal ID</th>
                      <th>Ownership in per cent (%)</th>
                      <th>Voting right in per cent (%)</th>
                    </tr>
                    {Object.entries(state.beneficialOwners).map(
                      ([
                        key,
                        {
                          BENEFICIAL_OWNERS_ROW_FULL_NAME: fullName,
                          BENEFICIAL_OWNERS_ROW_BIRTH_DATE: birthDate,
                          BENEFICIAL_OWNERS_ROW_OWNERSHIP: ownership,
                          BENEFICIAL_OWNERS_ROW_VOTING_RIGHT: votingRight,
                        },
                      ]) => (
                        <tr key={key}>
                          <td>{fullName}</td>
                          <td>{birthDate}</td>
                          <td>{ownership}</td>
                          <td>{votingRight}</td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </Table>
                <Paragraph>
                  Please submit any relevant documentation on ownership
                  structure (e.g. a share register) if the table above is
                  insufficient in terms of rows and columns.
{' '}
                  <Italic>
                    If you are signing on behalf of a company please provide
                    Redeye with documents showing you are authorised to sign on
                    behalf of the company. If you are signing jointly on behalf
                    of the company please provide Redeye with identification of
                    both persons signing.
                  </Italic>
                </Paragraph>
              </SubSection>
            )}
            {state.kycType === KYC_TYPE_PERSON && (
              <SubSection>
                <SubSectionHeader>
                  Politically exposed persons (PEP)
                </SubSectionHeader>
                <Paragraph>
                  A politically exposed person (“PEP”) is a person that is or
                  has been entrusted with prominent public function in a country
                  or an international organisation. Redeye needs to know if a
                  Client, or its Beneficial Owner, is or has, during the past 2
                  years, been a politically expose person (“PEP”). Redeye must
                  also know if a Client is a Family Member or a Close Associate
                  of a PEP.
                </Paragraph>
                <WhiteBox>
                  <SubSectionHeader style={{ textAlign: 'center' }}>
                    Definition of Politically Exposed Persons, Family Members
                    and Close Associates
                  </SubSectionHeader>
                  <h4>Prominent public functions in a country</h4>
                  <Paragraph>
                    Prominent public functions in a country includes
{' '}
                    <Italic>inter alia</Italic>
                    <Fragment>:</Fragment>
                  </Paragraph>
                  <UnorderedList>
                    <li>the head of state,</li>
                    <li>Members of the Swedish Parliament,</li>
                    <li>
                      the Prime Minister and other government ministers (incl.
                      deputy ministers),
                    </li>
                    <li>
                      judges of the Supreme Court and the Supreme Administrative
                      Court,
                    </li>
                    <li>the Auditors General,</li>
                    <li>
                      Members of the Executive Board of Riksbanken (The Central
                      Bank of Sweden) and other central banks,
                    </li>
                    <li>ambassadors,</li>
                    <li>
                      high-ranking officers (generals and air chief marshals,
                      lieutenant generals and air marshals, admirals, vice
                      admirals and rear admirals), and
                    </li>
                    <li>CEOs or directors of state-owned companies.</li>
                  </UnorderedList>
                  <h4>
                    Prominent public functions in an international organisation
                  </h4>
                  <Paragraph>
                    Function in the management of an international organization
                    includes, inter alia,board members, members of management,
                    directors, general secretaries, and their deputies etc. in
                    the United Nations, the Council of Europe (Swe:
                    Europarådet), NATO, WTO and other organization established
                    thorough formal political agreements which have status as
                    international treaties.
                  </Paragraph>
                  <h4>Family members and close associates</h4>
                  <Paragraph>
                    The definition of “Family Member” includes:
                  </Paragraph>
                  <UnorderedList>
                    <li>
                      Spouse and every person considered equivalent to a spouse,
                    </li>
                    <li>
                      Children and their spouses or persons considered
                      equivalent to spouses, and
                    </li>
                    <li>Parents</li>
                  </UnorderedList>
                  <Paragraph>
                    The definition of “Close Associate” includes:
                  </Paragraph>
                  <UnorderedList>
                    <li>
                      a person who, jointly with a PEP, owns or otherwise
                      exercises controlling influence over a company;
{' '}
                    </li>
                    <li>
                      a person who otherwise has, or has had, a close
                      relationship with a PEP, which need not be a commercial
                      relationship;
{' '}
                    </li>
                    <li>
                      or a person who alone owns or exercises influence over a
                      company which has benefit of a PEP.
                    </li>
                  </UnorderedList>
                </WhiteBox>
                <Paragraph>
                  Please note that the PEP definition covers a natural person
                  who performs public functions in Sweden as well as abroad.
                </Paragraph>
                <Checkboxes>
                  <Checkbox
                    dark
                    checked={
                      state.pep.PEP_HAS_BEEN_A_PEP_DURING_THE_LAST_2_YEARS
                    }
                  >
                    I am, or have during the past 2 years been, a PEP
                  </Checkbox>
                  <Checkbox
                    dark
                    checked={
                      state.pep
                        .PEP_A_BENEFICIAL_OWNER_TO_ME_THE_CLIENT_IS_OR_HAS_DURING_THE_LAST_2_YEARS_BEEN_A_PEP
                    }
                  >
                    A beneficial owner to me/the Client is, or has during the
                    past 2 years been, a PEP
                  </Checkbox>
                  <Checkbox
                    dark
                    checked={
                      state.pep
                        .PEP_HAS_DURING_THE_PAST_2_YEARS_BEEN_A_FAMILY_MEMBER_OT_A_PEP
                    }
                  >
                    I am, or have during the past 2 years been, a Family Member
                    to a PEP
                  </Checkbox>
                  <Checkbox
                    dark
                    checked={
                      state.pep
                        .PEP_HAS_DURING_THE_PAST_2_YEARS_BEEN_A_CLOSE_ASSOCIATE_TO_A_PEP
                    }
                  >
                    I am, or have during the past 2 years been, a Close
                    Associate to a PEP
                  </Checkbox>
                  <Checkbox dark checked={state.pep.PEP_NONE_OF_THE_ABOVE}>
                    None of the above apply
                  </Checkbox>
                </Checkboxes>
                <Paragraph>
                  <Italic>
                    In case the Client or a Beneficial Owner to the Client is,
                    or during the past 2 years has been, a PEP, Redeye must take
                    measures which go beyond normal measures – i.e. enhanced
                    customer due diligence. This means, among other things, that
                    Redeye must obtain the approval of senior management before
                    a commercial relationship is entered into with a PEP. Redeye
                    must also take measures to establish the source of the
                    client’s wealth and means associated with the commercial
                    relationship and the transactions. The foregoing applies
                    also to family members and close associates of a PEP.
                  </Italic>
                </Paragraph>
                <Paragraph>
                  <Italic>
                    Redeye will, therefore, pose several questions to a PEP,
                    her/his family members and known colleagues. Accordingly, it
                    will take longer for Redeye to commence and manage
                    commercial relations with such persons.
                  </Italic>
                </Paragraph>
                <Paragraph>
                  Please note that Redeye needs to treat a Client covered by the
                  PEP-regulations as a PEP for a period of at least 18 months
                  after the relevant PEP is no longer entrusted with a prominent
                  public function, after which time Redeye must carry out a risk
                  assessment.
                </Paragraph>
              </SubSection>
            )}
            <SubSection>
              <SubSectionHeader>
                Purpose and nature of the business relationship
              </SubSectionHeader>
              <Paragraph>
                Redeye is required to obtain information about the purpose and
                nature of all business relationships with its clients.
              </Paragraph>
              <Boxes>
                <BoxGroup>
                  <Box>
                    <BoxTitle>
                      What is the entire value of your investment portfolio?
                    </BoxTitle>
                    <BoxValue>
                      {
                        AMOUNT_LABELS[
                          state.purposeAndNature
                            .PURPOSE_AND_NATURE_ENTIRE_VALUE_OF_YOUR_INVESTMENT_PORTFOLIO
                        ]
                      }
                    </BoxValue>
                  </Box>
                  <Box>
                    <BoxTitle>
                      How much do you expect to invest in financial instruments
                      through Redeye?
                    </BoxTitle>
                    <BoxValue>
                      {
                        AMOUNT_LABELS[
                          state.purposeAndNature
                            .PURPOSE_AND_NATURE_EXPECT_TO_INVEST_IN_FINANCIAL_INSTRUMENTS
                        ]
                      }
                    </BoxValue>
                  </Box>
                </BoxGroup>
                <BoxGroup>
                  <Box>
                    <BoxTitle>
                      With regards to investments in instruments made using
                      Redeye’s services, how long time do you estimate to remain
                      investing in instruments using Redeye’s services?
                    </BoxTitle>
                    <BoxValue>
                      {
                        HORIZON_LABELS[
                          state.purposeAndNature
                            .PURPOSE_AND_NATURE_INVESTMENT_HORIZON
                        ]
                      }
                    </BoxValue>
                  </Box>
                  <Box>
                    <BoxTitle>
                      How often do you expect to make investments in instruments
                      using Redeye’s services?
                    </BoxTitle>
                    <BoxValue>
                      {
                        FREQUENCY_LABELS[
                          state.purposeAndNature
                            .PURPOSE_AND_NATURE_INVESTMENT_FREQUENCY
                        ]
                      }
                    </BoxValue>
                  </Box>
                </BoxGroup>
                <BoxGroup>
                  <Box>
                    <BoxTitle>
                      What is your purpose of using Redeye’s services?
                    </BoxTitle>
                    <BoxValue>
                      {getFreeTextInput(
                        state,
                        FREE_TEXT_PURPOSES_PURPOSE_OF_USING_REDEYES_SERVICES,
                      )}
                    </BoxValue>
                  </Box>
                  <Box>
                    <BoxTitle>Origin of investment amount</BoxTitle>
                    <BoxValue>
                      {getFreeTextInput(
                        state,
                        FREE_TEXT_PURPOSES_ORIGIN_OF_THE_FUNDS,
                      )}
                    </BoxValue>
                  </Box>
                </BoxGroup>
              </Boxes>
            </SubSection>
          </Section>
          <Section>
            <SectionHeader>2. Client categorisation</SectionHeader>
            <Paragraph>
              Redeye is required, under the Swedish Securities Market Act (SFS
              2007:528), to categorise each Client into one of the following
              categories: non-professional client, professional client or
              eligible counterparty.
            </Paragraph>
            <Paragraph>
              For the services offered by Redeye under this Agreement and unless
              you are specifically and in a separate procedure categorized
              differently, you will be categorized as a Non-professional Client.
              As a non-professional client, you have the highest level of
              investor protection afforded by the conduct of business rules
              under the Securities Market Act. This means, among other things,
              that Redeye will provide you with information about our company
              and services, on financial instruments of interest and the risks
              associated with them, as well as the costs and other fees for
              trading in such financial instruments.
            </Paragraph>
            <Paragraph>
              Clients who are categorized as Non-Professional Client may be
              treated as Professionals Clients on request, provided however that
              certain relevant criteria and procedure are fulfilled. If Redeye
              approves your request and re-categorizes you as a Professional
              Client, you will lose a substantial part of the investor
              protection afforded by the conduct of business rules under the
              Securities Market Act
            </Paragraph>
          </Section>
          <Section>
            <SectionHeader>3. Services offered by Redeye</SectionHeader>
            <Paragraph>
              This Agreement covers the following investment services:
            </Paragraph>
            <NumericList>
              <li>
                Reception and transmission of orders in relation to one or more
                financial instruments.
              </li>
              <li>Execution of orders on behalf of clients, and</li>
              <li>Investment advice</li>
            </NumericList>
            <Paragraph>
              Please note that the investment services provided by Redeye may
              relate to financial instruments for which Redeye has research
              coverage.
            </Paragraph>
            <Paragraph>
              The investment advice provided by Redeye is limited to specific
              transactions or/and equities and does not include general advice
              on portfolio strategies and objectives.
            </Paragraph>
            <Paragraph>
              When Redeye provides investment advice, Redeye is obligated to
              assess whether a service or an instrument is suitable for the
              Client before Redeye provides the service or recommends the
              instrument (“suitability assessment”). The suitability assessment
              implies gathering necessary and appropriate information about the
              Client’s investment objective, financial situation, experience and
              knowledge. The reason for the suitability assessment is to enable
              Redeye to act in the Client’s best interest.
            </Paragraph>
            <Paragraph>
              When Redeye provides other investment services than investment
              advice, Redeye will assess whether the service is appropriate for
              the Client based on its knowledge and experience (“appropriateness
              assessment”). However, please be advised that if the investment
              service consists only of reception and transmission of orders
              and/or execution of orders, the service is provided at the
              initiative of the Client and the transaction relates to shares
              traded on a regulated market or other non-complex financial
              instrument (so-called “execution only” business), Redeye will not
              conduct any appropriateness assessment.
            </Paragraph>
          </Section>
          <Section>
            <SectionHeader>4. Acknowledgement and signature</SectionHeader>
            By signing this agreement, you hereby confirm and accept:
            <UnorderedList>
              <li>That you have been informed of your client categorization</li>
              <li>
                That you agree to receive information and documentation, such as
                contract notes and transaction confirmations, by e-mail,
                provided however, you have provided Redeye with a valid e-mail
                address,
              </li>
              <li>
                That information not addressed to the Client personally is
                posted on www.redeye.se,
              </li>
              <li>
                That you have read and understood Redeye’s General Terms and
                Conditions, and
              </li>
              <li>
                That Redeye may process your personal data in accordance with
                the Swedish Personal Data Act (SFS 1998:204).
              </li>
            </UnorderedList>
            <Paragraph>
              <Bold>
                Furthermore, you confirm and accept that all information and
                documentation provided by you in this document is correct and
                complete, and that you will inform Redeye in the event there is
                a change in the information or documentation provided.
              </Bold>
            </Paragraph>
            {print && (
              <SignatureSection>
                <SectionHeader>Signature fields</SectionHeader>
                <SignatureBox>
                  <SignatureGroup>
                    <SignatureField>
                      <SignatureHeader>Place and date</SignatureHeader>
                      <SignatureInput />
                    </SignatureField>
                    <SignatureField>
                      <SignatureHeader>Client name</SignatureHeader>
                      <SignatureInput />
                    </SignatureField>
                  </SignatureGroup>
                  <SignatureField>
                    <SignatureHeader>Client signature</SignatureHeader>
                    <SignatureInput />
                  </SignatureField>
                  <SignatureField>
                    <SignatureHeader>
                      Client calirification of signature
                    </SignatureHeader>
                    <SignatureInput />
                  </SignatureField>
                </SignatureBox>
              </SignatureSection>
            )}
          </Section>
        </Wrapper>
      </Fragment>
    );
  }
}

const SignatureSection = styled.div`
  margin-top: 6em;
`;
const SignatureBox = styled.div`
  border-width: 0 0 1px 0;
  border-color: black;
  border-style: solid;
`;
const SignatureGroup = styled.div`
  display: flex;
  width: 100%;
  & > :last-child {
    border-left: 0;
  }
`;
const SignatureField = styled.div`
  border-width: 1px 1px 0 1px;
  border-color: black;
  border-style: solid;
  flex: 1;
`;
const SignatureHeader = styled.div`
  padding-left: 1em;
`;
const SignatureInput = styled.div`
  height: 4em;
`;
export default Pdf;
