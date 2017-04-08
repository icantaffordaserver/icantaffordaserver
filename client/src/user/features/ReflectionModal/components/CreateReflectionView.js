/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react';
import { Header, Form, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import ThumbsRating from './ThumbsRating';

const View = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const propTypes = {
  rating: React.PropTypes.number.isRequired,
  onRatingClick: React.PropTypes.func.isRequired,
  onCommentChange: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class CreateReflectionView extends React.Component {
  render() {
    return (
      <View>
        <Header textAlign="center" content="How was your conversation with Blake?" />
        <ThumbsRating rating={this.props.rating} onRatingClick={this.props.onRatingClick} />
        <Header textAlign="center" content="Leave a Comment" />
        <Form>
          <TextArea
            placeholder="Leaving a comment helps us better refine the experience and match you in the future"
            onChange={this.props.onCommentChange}
            value={this.props.comment}
          />
        </Form>
      </View>
    );
  }
}

CreateReflectionView.propTypes = propTypes;
CreateReflectionView.defaultProps = defaultProps;

export default CreateReflectionView;
