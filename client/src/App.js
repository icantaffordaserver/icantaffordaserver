import React from 'react';
import { Grid } from 'semantic-ui-react';
import Header from './shared/containers/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Grid padded>
        </Grid>
      </div>
    );
  }
}

export default App;
