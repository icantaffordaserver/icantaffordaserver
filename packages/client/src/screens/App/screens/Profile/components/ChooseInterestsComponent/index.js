import React, { Component } from 'react'

import ConfirmAndCancel from '../shared/ConfirmAndCancel'

import { graphql, compose } from 'react-apollo'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import createConnectionInterest from '../../../../shared/graphql/mutations/createConnectionInterest.js'

import ChooseInterests from './components/ChooseInterests'
import SuggestInterests from './components/SuggestInterests'
class ChooseInterestsComponent extends Component {
  state = {
    selectedTags: [],
    suggestion: '',
  }

  changeColor = id => {
    let index = this.state.selectedTags.indexOf(id)
    console.log('index: ', index)
    if (index === -1) {
      this.setState({ selectedTags: [...this.state.selectedTags, id] }, () =>
        console.log(this.state),
      )
    } else {
      const selectedTags = this.state.selectedTags
      this.setState(
        {
          selectedTags: [
            ...selectedTags.slice(0, index),
            ...selectedTags.slice(index + 1),
          ],
        },
        () => console.log(this.state),
      )
    }
  }

  handleChange = e => {
    if (e.target.value) {
      this.setState({ suggestion: e.target.value })
    }
  }

  handleSubmit = () => {
    console.log(this.props, ' Choose interests')
    this.props
      .createConnectionInterest({
        variables: {
          name: this.state.suggestion,
        },
      })
      .then(() => this.setState({ suggestion: '' }))
      .then(() => console.log(this.state))
      .catch(err => console.error(err))
  }

  handleClear = () =>
    this.setState({ selectedTags: [] }, () => this.props.handleEdit())

  handleConfirm = () => {
    let connectionInterestsIds = this.state.selectedTags
    console.log(this.props)
    this.props
      .updateUser({
        variables: {
          id: this.props.user.id,
          connectionInterestsIds,
        },
        refetchQueries: [
          {
            query: currentUserQuery,
          },
        ],
      })
      .then(() =>
        this.setState({ selectedTags: [] }, () => this.props.handleEdit()),
      )
      .then(() => console.log(this.state))
      .catch(err => console.error(err))
  }

  componentDidMount() {
    console.log('Choose Interests : ', this.props)

    if (this.props.user) {
      const { connectionInterests } = this.props.user
      let interestIds = connectionInterests.map(interest => interest.id)
      this.setState({ selectedTags: interestIds })
    }
  }

  render() {
    const { interests } = this.props

    if (this.props.loading) return null
    return (
      <div style={{ marginLeft: '10px', marginTop: '20px' }}>
        <p>
          Choose your interests:
          <br />
          <i>Multiple interests can be selected.</i>
        </p>

        <ChooseInterests
          interests={interests}
          changeColor={this.changeColor}
          selectedTags={this.state.selectedTags}
        />
        <SuggestInterests
          suggestion={this.state.suggestion}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <ConfirmAndCancel
          handleSave={this.handleConfirm}
          handleCancel={this.handleClear}
        />
      </div>
    )
  }
}

export default compose(
  graphql(currentUserQuery, { name: 'currentUser' }),
  graphql(createConnectionInterest, { name: 'createConnectionInterest' }),
)(ChooseInterestsComponent)
