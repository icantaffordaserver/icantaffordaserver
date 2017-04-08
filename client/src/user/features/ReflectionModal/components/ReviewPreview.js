/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const propTypes = {
  id: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  firstName: React.PropTypes.string,
  date: React.PropTypes.string,
  rating: React.PropTypes.number,
};

const defaultProps = {};
const ReviewPreviewItem = styled.div`
  position: relative;
  height: 70px;
  margin: 10px;
  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    cursor: pointer;
  }
`;
const MatchName = styled.h3`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  margin: 0px;
`;
const Date = styled.h3`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 13px;
  margin: 0px;
`;
const Subtitle = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const IconStyled = styled(Icon)`
  &&& {
    font-size: 20px;
    margin: 0;
  }
`;

class ReviewPreview extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  renderRatings = () => {
    const ratings = [];
    for (let i = 0; i < this.props.rating; i++) {
      ratings.push(<IconStyled key={i} name="thumbs outline up" />);
    }
    return ratings;
  };

  render() {
    return (
      <ReviewPreviewItem onClick={this.handleClick}>
        <MatchName>{this.props.firstName}</MatchName>
        <Date>{this.props.date}</Date>
        <Subtitle>
          {this.props.completed ? this.renderRatings() : 'Not yet completed'}
        </Subtitle>
      </ReviewPreviewItem>
    );
  }
}

ReviewPreview.propTypes = propTypes;
ReviewPreview.defaultProps = defaultProps;

export default ReviewPreview;
