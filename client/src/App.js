import React from 'react';
import { Grid } from 'semantic-ui-react';
import Header from './shared/Header';
import Footer from './shared/Footer';

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
