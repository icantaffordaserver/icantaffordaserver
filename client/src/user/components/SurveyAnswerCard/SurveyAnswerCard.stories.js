/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import SurveyAnswerCard from './SurveyAnswerCard'
import { AllSurveyCards } from './styles'

const answers = ['Its Mars bitch..', 'Its Mars bitch..', 'Its Mars bitch..']

storiesOf('USER.SurveyAnswerCard', module)
  .add('One card', () => (
    <SurveyAnswerCard
      question={'Hello World? Hello World? Hello World? Hello World? Hello World?'}
      answers={answers}
    />
  ))
  .add('Cards with horizontal scroll wrapper', () => (
    <AllSurveyCards>
      <SurveyAnswerCard question={'Hello World?'} answer={'Its Mars bitch..'} />
      <SurveyAnswerCard question={'Hello World?'} answer={'Its Mars bitch..'} />
      <SurveyAnswerCard question={'Hello World?'} answer={'Its Mars bitch..'} />
      <SurveyAnswerCard question={'Hello World?'} answer={'Its Mars bitch..'} />
    </AllSurveyCards>
  ))
