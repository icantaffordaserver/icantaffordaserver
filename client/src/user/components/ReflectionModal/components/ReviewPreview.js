/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'

const ReviewPreviewItem = styled.div`
  position: relative;
  height: 70px;
  margin: 10px;
  background-color: ${props => (props.status === 'completed' ? '#ffc0c0' : 'white')};
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    cursor: pointer;
  }
`
const MatchName = styled.h3`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  margin: 0px;
`
const Date = styled.h3`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 13px;
  margin: 0px;
`
const Subtitle = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`
const IconStyled = styled(Icon)`
  &&& {
    font-size: 20px;
    margin: 0;
  }
`

class ReviewPreview extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }
  static defaultProps = {
    rating: 0,
  }

  handleClick = () => {
    this.props.onClick(this.props.id)
  }

  renderRatings = () => {
    const ratings = []
    for (let i = 0; i < this.props.rating; i++) {
      ratings.push(<IconStyled key={i} name="thumbs outline up" />)
    }
    return ratings
  }

  renderStatus = () => {
    const { status } = this.props
    if (status === 'completed') return 'Leave your review'
    if (status === 'reviewed') return this.renderRatings()
    return 'Not completed'
  }

  render() {
    const {status} = this.props
    return (
      <ReviewPreviewItem onClick={this.handleClick} status={status}>
        <MatchName>{this.props.firstName}</MatchName>
        <Date>{moment(this.props.date).format('MMM Do, h:mm a')}</Date>
        <Subtitle>
          {this.renderStatus()}
        </Subtitle>
      </ReviewPreviewItem>
    )
  }
}

export default ReviewPreview
