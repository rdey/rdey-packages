import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { versions } from '.';

const stories = storiesOf('Components/Tabs', module);

Object.entries(versions).forEach(([version, { Tabs, Tab, TabText }]) => {
  stories.add(version, () => (
    <Tabs>
      <Tab
        onClick={() => { }}
        selected={true}
      >
        <TabText>Research feed</TabText>
      </Tab>
      <Tab
        onClick={() => {}}
        selected={false}
      >
        <TabText>Videos</TabText>
      </Tab>
    </Tabs>
  ));
});
