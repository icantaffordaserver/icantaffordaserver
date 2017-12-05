import React, { Component } from 'react'

import { Text } from '../../../../../styles'
import { FireStarters, FireStarterAnswers, Answer } from '../styles'
import AnswerFireStarters from './AnswerFireStarterComponent'

class FireStarterComponent extends Component {
  render() {
    return (
      <FireStarters>
        <AnswerFireStarters {...this.props} />
        <FireStarterAnswers>
          {this.props.answers &&
            this.props.answers.map(fireStarter => (
              <Answer key={fireStarter.id}>
                <h1>{fireStarter.question.question}</h1>
                <Text left>{fireStarter.answer}</Text>
              </Answer>
            ))}
        </FireStarterAnswers>
      </FireStarters>
    )
  }
}

export default FireStarterComponent
