/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const propTypes = {
  rating: React.PropTypes.number.isRequired,
  viewOnly: React.PropTypes.bool,
  onRatingClick: React.PropTypes.func,
};

const defaultProps = {
  viewOnly: false,
  onRatingClick: null,
};

const ReviewContainer = styled.div`
  text-align: center;
`;
const IconStyled = styled(Icon)`
  margin: 0;
  color: ${props => props.highlight && '#ffd117'}
  cursor: ${props => props.viewOnly ? 'default' : 'pointer'};
`;

class ThumbsRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightItems: this.props.rating,
      savedRating: this.props.rating,
    };
  }

  // use a viewOnly prop to disable clicking and selection
  handleMouseEnter = event => {
    if (!this.props.viewOnly) this.setState({ highlightItems: event.target.id });
  };

  handleMouseLeave = () => {
    if (!this.props.viewOnly) this.setState({ highlightItems: this.state.savedRating });
  };

  handleClick = event => {
    if (this.props.viewOnly) return;
    const rating = event.target.id * 1;
    this.setState({ savedRating: rating });
    this.props.onRatingClick(rating); // make sure rating is number
  };

  render() {
    return (
      <ReviewContainer>
        <IconStyled
          viewOnly={this.props.viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 1}
          id="1"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={this.props.viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 2}
          id="2"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={this.props.viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 3}
          id="3"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={this.props.viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 4}
          id="4"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={this.props.viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 5}
          id="5"
          name="thumbs up"
          size="huge"
        />
      </ReviewContainer>
    );
  }
}

ThumbsRating.propTypes = propTypes;
ThumbsRating.defaultProps = defaultProps;

export default ThumbsRating;
