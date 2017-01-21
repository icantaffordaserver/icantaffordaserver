import React from 'react';
import Header from '../../Header/index';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App;
