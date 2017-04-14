import React from 'react';
import { Grid } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import CompletedConnections from './CompletedConnections/CompletedConnectionsList';
import allConnectionsQuery from '../graphql/allConnectionsQuery';
import UpcomingConnectionsTable from './UpcomingConnectionsV2/UpcomingConnectionsTable';


class ConnectionPipeline extends React.Component {

  render() {
    if (this.props.data.loading) return null;
    let { edges: connections } = this.props.data.viewer.allConnections;
    connections = connections.map(({ node }) => node); // filter out the node object
    console.log(connections);

    return (
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column>
            <UpcomingConnectionsTable
              allConnections={connections}
            />
          </Grid.Column>
          <Grid.Column>
            {/*<CompletedConnections*/}
              {/*allConnections={connections}*/}
            {/*/>*/}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default graphql(allConnectionsQuery)(ConnectionPipeline);
