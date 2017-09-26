import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Div } from '../../styles'

class TextareaComponent extends Component {
  static defaultProps = {
    type: 'text',
  }
  render() {
    return (
      <div>
        <Div className="field">
          <Div className="control">
            <textarea
              style={{ resize: 'none' }}
              className="textarea"
              type={this.props.text}
              name={this.props.name}
              onChange={this.props.handleChange}
              value={this.props.bio}
            />
          </Div>
        </Div>
      </div>
    )
  }
}
export default TextareaComponent
