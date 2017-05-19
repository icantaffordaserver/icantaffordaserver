/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react'
import { Header, Form, TextArea } from 'semantic-ui-react'
import styled from 'styled-components'
import ThumbsRating from './ThumbsRating'

const View = styled.div`
  flex-grow: 1;
  padding: 20px;
`

class CreateReflectionView extends React.Component {
  static propTypes = {
    rating: React.PropTypes.number,
    comment: React.PropTypes.string.isRequired,
    onRatingClick: React.PropTypes.func.isRequired,
    onCommentChange: React.PropTypes.func.isRequired,
  }
  static defaultProps = {
    rating: 0,
  }

  render() {
    const { rating, comment, onRatingClick, onCommentChange } = this.props
    return (
      <View>
        <Header textAlign="center" content="How was your conversation with Blake?" />
        <ThumbsRating rating={rating} onRatingClick={onRatingClick} />
        <Header textAlign="center" content="Leave a Comment" />
        <Form>
          <TextArea
            placeholder="Leaving a comment helps us better refine the experience and match you in the future"
            onChange={onCommentChange}
            value={comment}
          />
        </Form>
      </View>
    )
  }
}

export default CreateReflectionView
