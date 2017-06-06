/**
 * Created by alexandermann on 2017-04-16.
 */
import React from 'react'
import { graphql, compose } from 'react-apollo'

import { AllSurveyCards } from '../components/SurveyAnswerCard/styles'
import SurveyAnswerCard from '../components/SurveyAnswerCard'
import connectionPanelQuery from '../graphql/connectionPanelQuery'

class AllSurveyCardsContainer extends React.Component {
  render() {
    if (this.props.data.loading) return null
    const surveyAnswers = this.props.data.viewer.allConnections.edges[0].node.participants.edges[0]
      .node.typeformProfile.profileResponses

    return (
      <AllSurveyCards>
        {Object.entries(surveyAnswers).map(([key, { questionText, answer }]) => (
          <SurveyAnswerCard key={key} question={questionText} answers={answer} />
        ))}
      </AllSurveyCards>
    )
  }
}

export default compose(
  graphql(connectionPanelQuery, {
    options: props => ({
      variables: {
        myUserId: props.currentUserId,
      },
    }),
  }),
)(AllSurveyCardsContainer)
