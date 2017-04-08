import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import styled from 'styled-components';
import '../semantic/dist/semantic.min.css';

const CenterStoriesWrapper = styled.div`
  margin: auto !important;
  padding: 100px;
`;

const req = require.context('../src', true, /.stories.js$/);

// give stories some padding
addDecorator(story => <CenterStoriesWrapper>{story()}</CenterStoriesWrapper>);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
