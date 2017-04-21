/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import styled from 'styled-components'
import ThumbsRating from './ThumbsRating'

const View = styled.div`
  flex-grow: 1;
  padding: 20px;
`

class SubmittedReflectionView extends React.Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
  }
  static defaultProps = {
    comment: 'You did not leave a comment',
  }

  render() {
    const { rating, comment } = this.props

    return (
      <View>
        <Header textAlign="center" content="You rated your conversation:" />
        <ThumbsRating rating={rating} viewOnly />
        <Header textAlign="center" content="Your Comment" />
        <Header textAlign="center" content={comment} color="grey" />
      </View>
    )
  }
}

export default SubmittedReflectionView
