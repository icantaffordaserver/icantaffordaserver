import React from 'react';
import { Grid } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import MatchedUsersList from './MatchedUsers/MatchedUsersList';
import CompletedConnections from './CompletedConnections/CompletedConnectionsList';
import allConnectionsQuery from '../graphql/allConnectionsQuery';


class ConnectionPipeline extends React.Component {

  render() {
    if (this.props.data.loading) return null;
    console.log(this.props.data.viewer.allconnections);
    const { edges: connections } = this.props.data.viewer.allConnections;

    return (
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column>
            <MatchedUsersList
              allConnections={connections}
            />
          </Grid.Column>
          <Grid.Column>
            <CompletedConnections
              allConnections={connections}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default graphql(allConnectionsQuery)(ConnectionPipeline);
