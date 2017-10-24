import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Div } from '../../styles'

class InputComponent extends Component {
  static defaultProps = {
    type: 'text',
  }
  render() {
    return (
      <div>
        <Div className="control">
          <input
            className="input"
            type={this.props.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            onChange={this.props.handleChange}
            value={this.props.value}
          />
        </Div>
      </div>
    )
  }
}
export default InputComponent
