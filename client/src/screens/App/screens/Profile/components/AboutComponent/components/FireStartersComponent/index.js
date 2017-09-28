import React, { Component } from 'react'
import propTypes from 'prop-types'

import {
  FireStarterParagraph,
  FireStarterColumn,
  FireStarterHeader,
} from './styles'

class FireStartersComponent extends Component {
  renderFireStarters = () => {
    const FireStarterData = this.props.firestarters
    const listOfResponses = FireStarterData.data.FireStaters.map(
      firestarter => {
        return (
          <FireStarterColumn key={firestarter.id} className="column">
            <FireStarterHeader>{firestarter.title}</FireStarterHeader>
            <FireStarterParagraph>{firestarter.answer}</FireStarterParagraph>
          </FireStarterColumn>
        )
      },
    )
    return listOfResponses
  }
  render() {
    const FireStarterList = this.renderFireStarters()
    return <div>{FireStarterList}</div>
  }
}

export default FireStartersComponent
