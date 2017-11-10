import React from 'react'

import {
  Button,
  Content,
  ColumnContainer,
  RowContainer,
  Section,
  Card,
  Title,
  Subheading,
  Tag,
  Text,
  TextLink,
  TextArea,
} from '../../../../../styles'

export default props => {
  return (
    <Section gray>
      <Title medium left fullWidth>
        Q & A
      </Title>
      <RowContainer>
        {props.answers &&
          props.answers.map(fireStarterAnswer => {
            const { question } = fireStarterAnswer.question
            const { answer } = fireStarterAnswer
            return (
              <Card key={fireStarterAnswer.id}>
                <Title small fullWidth left darkGray>
                  {question}
                </Title>
                <Text left small fullWidth>
                  {answer}
                </Text>
              </Card>
            )
          })}

        {props.question && (
          <Card>
            <Title small fullWidth left darkGray>
              {props.question.question}
            </Title>
            <TextArea maxlength={250} onChange={props.answerChange} />
            <Button
              loading={props.loading}
              onClick={props.answerFireStarter}
              small
              left
            >
              Submit
            </Button>
          </Card>
        )}
      </RowContainer>
    </Section>
  )
}
