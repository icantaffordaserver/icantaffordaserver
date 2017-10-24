import React from 'react';
import { Grid, GridRow, GridColumn, Header } from 'semantic-ui-react';

const NotFound = () => (
  <Grid container columns={1} textAlign="center" verticalAlign="middle">
    <GridRow stretched>
      <GridColumn>
        <Header as="h2" textAlign="center">404</Header>
        <p>Page Not Found</p>
      </GridColumn>
    </GridRow>
  </Grid>
);

export default NotFound;
