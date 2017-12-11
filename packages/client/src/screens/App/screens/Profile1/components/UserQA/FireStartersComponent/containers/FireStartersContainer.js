import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'

import FireStartersComponent from '../components/FireStartersComponent'

import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'
import userAnswerFireStarterMutation from '../../../../../../shared/graphql/mutations/userAnswerFireStarterMutation'
import updateFireStarterAnswerMutation from '../../../../../../shared/graphql/mutations/updateFireStarterAnswerMutation'
import deleteFireStarterAnswerMutation from '../../../../../../shared/graphql/mutations/deleteFireStarterAnswerMutation'
import allUserFireStarterAnswersQuery from '../../../../../../shared/graphql/queries/allUserFireStarterAnswersQuery'
import getUserFireStartersQuery from '../../../../../../shared/graphql/queries/getUserFireStartersQuery'

class FireStartersContainer extends Component {
  state = {
    fireStarterAnswer: '',
    currentFireStarter: null,
    loading: false,
  }

  async componentDidMount() {
    const { loading } = this.props.data
    if (!loading) {
      this.getFireStarters()
    }
  }

  answerChange = e => {
    this.setState({
      fireStarterAnswer: e.target.value,
    })
  }

  getFireStarters = async () => {
    const { user } = this.props.data

    const response = await this.props.client.query({
      query: allUserFireStarterAnswersQuery,
      variables: {
        userId: user.id,
      },
    })

    const fireStarterAnswers = response.data.allFireStarterAnswers
    const answerIds = fireStarterAnswers.map(answer => answer.id)

    const { data: { answered, unanswered } } = await this.props.client.query({
      query: getUserFireStartersQuery,
      variables: {
        answered: answerIds,
      },
    })

    await this.setState({
      fireStarterAnswers,
      allFireStarters: {
        answered,
        unanswered,
      },
      currentFireStarter: null,
      fireStarterAnswer: '',
      loading: false,
    })
  }

  getFireStarterAnswer = id => {
    return this.state.fireStarterAnswers.filter(
      fireStarterAnswer => fireStarterAnswer.question.id === id,
    )[0]
  }

  deleteFireStarterAnswer = async e => {
    if (e) e.preventDefault()

    // Only delete if the question has been answered.
    if (this.state.currentFireStarter.answer !== undefined) {
      this.setState({ loading: true })
      await this.props.client.mutate({
        mutation: deleteFireStarterAnswerMutation,
        variables: { id: this.state.currentFireStarter.id },
      })

      await this.props.client.resetStore()
      await this.getFireStarters()
    }
  }

  handleAnswerFireStarter = async e => {
    this.setState({ loading: true })
    const fireStarter = this.state.currentFireStarter
    const answer = this.state.fireStarterAnswer
    let mutation = {
      mutation: userAnswerFireStarterMutation,
      variables: {
        userId: this.props.data.user.id,
        fireStarterId: fireStarter.id,
        answer,
      },
    }

    if (fireStarter.answer) {
      mutation = {
        mutation: updateFireStarterAnswerMutation,
        variables: { id: fireStarter.id, answer },
      }
    }

    await this.props.client.mutate(mutation)
    await this.props.client.resetStore()
    await this.getFireStarters()
  }

  selectQuestion = async fireStarter => {
    if (this.state.allFireStarters.answered.includes(fireStarter)) {
      const { question, ...rest } = this.getFireStarterAnswer(fireStarter.id)
      fireStarter = { ...rest, question: question.question }
    }

    await this.setState({
      currentFireStarter: fireStarter,
      fireStarterAnswer: fireStarter.answer,
    })
  }

  clearQuestion = () => {
    this.setState({ currentFireStarter: null, fireStarterAnswer: '' })
  }

  render() {
    return (
      <FireStartersComponent
        answers={this.state.fireStarterAnswers}
        currentAnswer={this.state.fireStarterAnswer}
        answerChange={this.answerChange}
        answerFireStarter={this.handleAnswerFireStarter}
        currentFireStarter={this.state.currentFireStarter}
        fireStarters={this.state.allFireStarters}
        selectQuestion={this.selectQuestion}
        clearQuestion={this.clearQuestion}
        deleteAnswer={this.deleteFireStarterAnswer}
        loading={this.state.loading}
        edit={this.props.edit}
      />
    )
  }
}

export default compose(withApollo, graphql(currentUserQuery))(
  FireStartersContainer,
)
