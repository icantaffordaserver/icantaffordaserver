import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import { AboutButton, ProfileHeader } from './styles'

class AboutComponent extends Component {
  render() {
    const { firstName, lastName, email, bio } = this.props.user
    return (
      <div className="columns">
        <div className="column is-one-third">
          <h1>{firstName + ' ' + lastName}</h1>

          <AboutButton className="button">Message</AboutButton>
          <span style={{ padding: '2%' }} />
          <AboutButton primary className="button">
            Talk
          </AboutButton>
          <h4>{email}</h4>
          <p>{bio}</p>
        </div>

        <div className="column is-offset-one-quarter">
          <ProfileHeader className="title is-4">Firestarters</ProfileHeader>
          <h4 style={{ textAlign: 'center' }}>
            The world is waiting to hear your thoughts
          </h4>
        </div>
      </div>
    )
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  AboutComponent,
)
