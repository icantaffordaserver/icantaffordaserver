/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const ReviewContainer = styled.div`
  text-align: center;
`
// pull off viewOnly and highlight so we do not get unknown props error
const IconStyled = styled(({ viewOnly, highlight, ...rest }) => <Icon {...rest} />)`
  margin: 0;
  color: ${props => props.highlight && '#ffd117'}
  cursor: ${props => (props.viewOnly ? 'default' : 'pointer')};
`

class ThumbsRating extends React.Component {
  static propTypes = {
    rating: React.PropTypes.number.isRequired,
    viewOnly: React.PropTypes.bool,
    onRatingClick: React.PropTypes.func,
  }
  static defaultProps = {
    viewOnly: false,
    onRatingClick: null,
  }
  state = {
    highlightItems: this.props.rating,
    savedRating: this.props.rating,
  }

  // use a viewOnly prop to disable clicking and selection
  handleMouseEnter = event => {
    if (!this.props.viewOnly) this.setState({ highlightItems: event.target.id })
  }

  handleMouseLeave = () => {
    if (!this.props.viewOnly) this.setState({ highlightItems: this.state.savedRating })
  }

  handleClick = event => {
    if (this.props.viewOnly) return
    const rating = event.target.id * 1
    this.setState({ savedRating: rating })
    this.props.onRatingClick(rating) // make sure rating is number
  }

  render() {
    const { viewOnly } = this.props
    return (
      <ReviewContainer>
        <IconStyled
          viewOnly={viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 1}
          id="1"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 2}
          id="2"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 3}
          id="3"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 4}
          id="4"
          name="thumbs up"
          size="huge"
        />
        <IconStyled
          viewOnly={viewOnly}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          highlight={this.state.highlightItems >= 5}
          id="5"
          name="thumbs up"
          size="huge"
        />
      </ReviewContainer>
    )
  }
}

export default ThumbsRating
