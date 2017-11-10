import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'

import FireStartersComponent from '../components/FireStartersComponent'

import currentUserQuery from '../../../../../shared/graphql/queries/currentUserQuery'
import userAnswerFireStarterMutation from '../../../../../shared/graphql/mutations/userAnswerFireStarterMutation'
import allUserFireStarterAnswersQuery from '../../../../../shared/graphql/queries/allUserFireStarterAnswersQuery'
import getUserFireStartersQuery from '../../../../../shared/graphql/queries/getUserFireStartersQuery'

class FireStartersContainer extends Component {
  state = {
    fireStarterAnswer: '',
    loading: false,
  }

  async componentWillReceiveProps(nextProps) {
    const { loading } = nextProps.data
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

    const getFireStarter = await this.props.client.query({
      query: getUserFireStartersQuery,
      variables: {
        answered: answerIds,
      },
    })

    const currentFireStarter = getFireStarter.data.allFireStarters[0]

    await this.setState({
      fireStarterAnswers,
      currentFireStarter,
    })
  }

  handleAnswerFireStarter = async e => {
    this.setState({ loading: true })
    await this.props.client.mutate({
      mutation: userAnswerFireStarterMutation,
      variables: {
        userId: this.props.data.user.id,
        fireStarterId: this.state.currentFireStarter.id,
        answer: this.state.fireStarterAnswer,
      },
      refetchQueries: [{ query: getUserFireStartersQuery }],
    })

    await this.getFireStarters()
    this.setState({ loading: false })
  }
  render() {
    return (
      <FireStartersComponent
        answers={this.state.fireStarterAnswers}
        question={this.state.currentFireStarter}
        answerFireStarter={this.handleAnswerFireStarter}
        answerChange={this.answerChange}
        loading={this.state.loading}
      />
    )
  }
}

export default compose(withApollo, graphql(currentUserQuery))(
  FireStartersContainer,
)
