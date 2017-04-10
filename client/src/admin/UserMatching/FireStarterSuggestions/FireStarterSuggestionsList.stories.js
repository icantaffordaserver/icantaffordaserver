/**
 * Created by alexandermann on 2017-04-09.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import FireStarterSuggestionsList from './FireStarterSuggestionsList';

storiesOf('admin.FireStarterSuggestionsList', module).add('Base', () => (
  <FireStarterSuggestionsList />
));
