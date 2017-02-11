import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import { Grid } from 'semantic-ui-react';

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
          <Footer />
        </Grid>
      </div>
    );
  }
}

export default App;
