import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { versions } from '.';

const AccordionText = styled.p`
  font-size: 0.75em; /* 0.75em */
  padding-bottom: 1.333em;
  line-height: 1.67;
  color: #fff;
  :last-child {
    padding-bottom: 0;
  }
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

const stories = storiesOf('Components/Accordion', module);

Object.entries(versions).forEach(([version, Component]) => {
  stories.add(version, () => (
    <Component
      items={[
        {
          title: 'How do I change my card details?',
          body: (
            <React.Fragment>
              <AccordionText>
                To change your card details, go to Payment Settings and enter
                your new card details. To find Payment Settings, simply click on
                Settings at the top right corner of our website, under Members
                Network. You may also use the link below:
                <br />
                <A href="/members/settings/payment">Payment Settings</A>
              </AccordionText>
            </React.Fragment>
          ),
          id: 'howdoichangemycarddetails',
        },
        {
          title: 'How do I cancel my Premium membership?',
          body: (
            <React.Fragment>
              <AccordionText>
                You can cancel your Premium membership whenever you want, there
                is no term of notice. Simply get in touch with us and we will
                help you out!
                <br />
                <A href="mailto:info@redeye.se">info@redye.se</A>
              </AccordionText>
            </React.Fragment>
          ),
          id: 'howdoIcancelmypremiummembership',
        },
      ]}
      viewport={1024}
    />
  ));
});
