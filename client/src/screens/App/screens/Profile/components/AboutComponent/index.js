import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import { AboutButton, ProfileHeader, UserColumns, UserColumn } from './styles'

class AboutComponent extends Component {
  render() {
    const { firstName, lastName, email, bio, location } = this.props.user
    return (
      <UserColumns className="columns">
        <UserColumn
          style={{ textAlign: 'center' }}
          className="column is-one-third"
        >
          <h1>{firstName + ' ' + lastName}</h1>
          <h3>{location}</h3>
          <AboutButton className="button">Message</AboutButton>
          <span style={{ padding: '2%' }} />
          <AboutButton primary className="button">
            Talk
          </AboutButton>

          <p style={{ paddingTop: '3%' }}>{bio}</p>
        </UserColumn>

        <UserColumn className="column">
          <ProfileHeader>Firestarters</ProfileHeader>
          <h4 style={{ textAlign: 'center' }}>
            The world is waiting to hear your thoughts
          </h4>
        </UserColumn>
      </UserColumns>
    )
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  AboutComponent,
)
