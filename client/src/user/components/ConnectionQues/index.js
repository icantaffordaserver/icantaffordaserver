/**
 * Created by alexandermann on 2017-02-20.
 */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { Image, Icon } from 'semantic-ui-react';
import './index.css';

const cueCardImgs = ['https://i.imgur.com/D4kY6bu.jpg', 'http://i.imgur.com/6r7iO4d.jpg', 'https://i.imgur.com/zZ2uSlw.jpg'];

const propTypes = {};

const defaultProps = {};

class ConnectionQues extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.nextCueCard = this.nextCueCard.bind(this);
    this.prevCueCard = this.prevCueCard.bind(this);
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event) {
      // inspect the keydown event and decide what to do
      this.handleKeyDown(keydown.event.which);
    }
  }

  handleKeyDown(charCode) {
    if (charCode === 37) { // left arrow press
      this.prevCueCard();
    } else if (charCode === 39) { // right arrow press
      this.nextCueCard();
    }
  }

  nextCueCard() {
    // trigger loading indicator

    // if at the end of the array restart the cue cards
    if (this.state.currentIndex === cueCardImgs.length - 1) {
      this.setState({
        ...this.state,
        currentIndex: 0, // start back at the beginning
      });
    } else {
      this.setState({
        ...this.state,
        currentIndex: this.state.currentIndex += 1,
      });
    }
  }

  prevCueCard() {
    // trigger loading indicator

    // if at the beginning of the array set to the end of the array
    if (this.state.currentIndex === 0) {
      this.setState({
        ...this.state,
        currentIndex: cueCardImgs.length - 1, // start back at the beginning
      });
    } else {
      this.setState({
        ...this.state,
        currentIndex: this.state.currentIndex -= 1,
      });
    }
  }

  render() {
    const { currentIndex } = this.state;
    return (
      <div>
        <Image>
          <img
            alt="cue card"
            onLoad={() => console.log('disable loading indicator')}
            src={cueCardImgs[currentIndex]}
          />
        </Image>
        <span onClick={this.prevCueCard}>
          <Icon
            link
            name="chevron left"
            size="big"
            className="left-arrow"
          />
        </span>
        <span onClick={this.nextCueCard}>
          <Icon link name="chevron right" size="big" className="right-arrow" />
        </span>
      </div>
    );
  }

}

ConnectionQues.propTypes = propTypes;
ConnectionQues.defaultProps = defaultProps;

export default ConnectionQues;
