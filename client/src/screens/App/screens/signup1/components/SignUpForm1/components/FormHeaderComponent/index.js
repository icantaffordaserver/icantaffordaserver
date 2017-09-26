import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { FormH1, Div, FormHeaderP } from '../../styles'

class FormHeaderComponent extends Component {
  render() {
    return (
      <div>
        <FormH1>{this.props.title}</FormH1>
        <Div className="columns">
          <Div className="column">
            <FormHeaderP>{this.props.headerOne}</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>{this.props.headerTwo}</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>{this.props.headerThree}</FormHeaderP>
          </Div>
        </Div>
      </div>
    )
  }
}
export default FormHeaderComponent
