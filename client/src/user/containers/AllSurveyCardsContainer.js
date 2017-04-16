/**
 * Created by alexandermann on 2017-04-16.
 */
import React from 'react'
import { graphql } from 'react-apollo'

import { AllSurveyCards } from '../components/SurveyAnswerCard/styles'
import SurveyAnswerCard from '../components/SurveyAnswerCard'
import currentUserQuery from '../../graphql/user/currentUserQuery'

class AllSurveyCardsContainer extends React.Component {
  render() {
    if (this.props.data.loading) return null
    const surveyAnswers = this.props.data.viewer.user.typeformProfile.profileResponses

    return (
      <AllSurveyCards>
        {Object.entries(surveyAnswers).map(([key, { questionText, answer }]) => (
          <SurveyAnswerCard key={key} question={questionText} answers={answer} />
        ))}
      </AllSurveyCards>
    )
  }
}

export default graphql(currentUserQuery)(AllSurveyCardsContainer)
