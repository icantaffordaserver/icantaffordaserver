/**
 * Created by alexandermann on 2017-04-13.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import UpcomingConnectionsTable from './UpcomingConnectionsTable';

storiesOf('ADMIN.Upcoming Connections Table', module).add('Open', () => (
  <UpcomingConnectionsTable />
));
