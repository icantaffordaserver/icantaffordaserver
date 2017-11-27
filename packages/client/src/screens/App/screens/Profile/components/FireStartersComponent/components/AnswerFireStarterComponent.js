import React from 'react'

import { Icon } from 'semantic-ui-react'
import { TextArea, Button, Title } from '../../../../../styles'
import { QuestionSelector, QuestionList, Question, Back } from '../styles'

export default props => {
  const {
    fireStarters,
    currentFireStarter,
    selectQuestion,
    currentAnswer,
    answerChange,
    loading,
    answerFireStarter,
    deleteAnswer,
    clearQuestion,
  } = props

  return (
    <QuestionSelector>
      {currentFireStarter ? (
        <Title medium fullWidth center darkGray>
          {currentFireStarter.question}
        </Title>
      ) : (
        <Title medium fullWidth center darkGray>
          Let us get to know you! Select a question below to answer or edit.
        </Title>
      )}
      {currentFireStarter ? (
        <div>
          <Back onClick={clearQuestion} />
          <TextArea value={currentAnswer} onChange={answerChange} />
          <Button
            small
            accent
            round
            loading={loading}
            disabled={
              currentAnswer && currentAnswer.trim().length > 0 ? false : true
            }
            onClick={answerFireStarter}
            style={{ marginRight: '20px !important' }}
          >
            Confirm
          </Button>
          {currentFireStarter.answer !== undefined && (
            <Button small round altGray onClick={deleteAnswer}>
              Delete
            </Button>
          )}
        </div>
      ) : (
        <QuestionList>
          {fireStarters &&
            fireStarters.unanswered &&
            fireStarters.unanswered.map(fireStarter => (
              <Question
                key={fireStarter.id}
                onClick={() => selectQuestion(fireStarter)}
              >
                {fireStarter.question}
                <Icon name="exclamation" color="red" />
              </Question>
            ))}
          {fireStarters &&
            fireStarters.answered.map(fireStarter => (
              <Question
                key={fireStarter.id}
                onClick={() => selectQuestion(fireStarter)}
              >
                {fireStarter.question}
                <Icon name="checkmark" color="green" />
              </Question>
            ))}
        </QuestionList>
      )}
    </QuestionSelector>
  )
}
