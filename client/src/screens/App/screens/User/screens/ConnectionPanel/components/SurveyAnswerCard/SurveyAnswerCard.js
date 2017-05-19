/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { CardWrapper, CardAccent, CardQuestion, CardAnswer, CardAnswers } from './styles'

class SurveyAnswerCard extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
  }

  render() {
    const { question, answers } = this.props
    return (
      <CardWrapper>
        <CardAccent>Q</CardAccent>
        <CardQuestion>{question}</CardQuestion>
        <CardAnswers>
          {answers.map(answer => <CardAnswer key={answer}>{answer}</CardAnswer>)}
        </CardAnswers>
      </CardWrapper>
    )
  }
}

export default SurveyAnswerCard
