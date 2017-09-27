import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import {
  AboutButton,
  ProfileHeader,
  UserColumns,
  UserColumn,
  BioParagraph,
  FireStarterHeader,
  FireStarterColumn,
  FireStarterParagraph,
} from './styles'

class AboutComponent extends Component {
  render() {
    const { firstName, lastName, email, bio, location } = this.props.user

    return (
      <UserColumns className="columns">
        <UserColumn center className="column is-one-third">
          <h1>{firstName + ' ' + lastName}</h1>
          <h3 style={{ margin: '0px', paddingBottom: '1%' }}>{location}</h3>
          <div style={{ width: '100%' }}>
            <AboutButton className="button">Message</AboutButton>
            <AboutButton primary className="button">
              Talk
            </AboutButton>
          </div>

          <BioParagraph>{bio}</BioParagraph>
        </UserColumn>

        <UserColumn className="column">
          <ProfileHeader>Firestarters</ProfileHeader>
          <FireStarterColumn className="column">
            <FireStarterHeader>
              What are things that worry you?
            </FireStarterHeader>
            <FireStarterParagraph>
              Bacon ipsum dolor amet ham hock shoulder drumstick chicken
              meatball ground round beef ribs pork ribeye meatloaf corned beef
              cow picanha. Meatball swine short loin shank, ham pork chop corned
              beef turkey tenderloin burgdoggen tail brisket jerky picanh
            </FireStarterParagraph>
          </FireStarterColumn>
          <FireStarterColumn className="column">
            <FireStarterHeader>
              What are things that worry you?
            </FireStarterHeader>
            <FireStarterParagraph>
              Bacon ipsum dolor amet ham hock shoulder drumstick chicken
              meatball ground round beef ribs pork ribeye meatloaf corned beef
              cow picanha. Meatball swine short loin shank, ham pork chop corned
              beef turkey tenderloin burgdoggen tail brisket jerky picanh
            </FireStarterParagraph>
          </FireStarterColumn>
        </UserColumn>
      </UserColumns>
    )
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  AboutComponent,
)
