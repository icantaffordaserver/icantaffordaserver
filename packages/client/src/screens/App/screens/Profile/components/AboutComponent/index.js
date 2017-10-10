import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'

import ProfileTagsWrapper from './components/ProfileTagsWrapper'
import ProfileTag from './components/ProfileTag'
import ProfileName from './components/ProfileName'
import ProfileLocation from './components/ProfileLocation'
import FireStatersComponent from './components/FireStartersComponent'
import {
  AboutButton,
  ProfileHeader,
  UserColumns,
  UserColumn,
  BioParagraph,
} from './styles'

// placeholder data will be replaced when user query is refactored
const tagsPlaceholderData = {
  data: {
    tags: [
      { tag: 'Development' },
      { tag: 'People' },
      { tag: 'Space' },
      { tag: 'Dogs' },
      { tag: 'Dogs' },
      { tag: 'Dogs' },
      { tag: 'Dogs' },
      { tag: 'Dogs' },
    ],
  },
}
const FireStaters = {
  data: {
    FireStaters: [
      {
        id: 1,
        title: 'What are things that worry you?',
        answer:
          'Bacon ipsum dolor amet ham hock shoulder drumstick chicken meatball ground round beef ribs pork ribeye meatloaf corned beef cow picanha. Meatball swine short loin shank, ham pork chop corned beef turkey tenderloin burgdoggen tail brisket jerky picanh',
      },
      {
        id: 2,
        title: 'What are things that worry you?',
        answer:
          'Bacon ipsum dolor amet ham hock shoulder drumstick chicken meatball ground round beef ribs pork ribeye meatloaf corned beef cow picanha. Meatball swine short loin shank, ham pork chop corned beef turkey tenderloin burgdoggen tail brisket jerky picanh',
      },
    ],
  },
}

class AboutComponent extends Component {
  renderTags = () => (
    <ProfileTagsWrapper>
      {tagsPlaceholderData.data.tags.map(({ tag }) => (
        <ProfileTag>{`#${tag}`}</ProfileTag>
      ))}
    </ProfileTagsWrapper>
  )

  render() {
    const { firstName, lastName, email, bio, location } = this.props.user

    return (
      <UserColumns className="columns">
        <UserColumn center className="column is-one-third">
          <ProfileName>{`${firstName} ${lastName}`}</ProfileName>
          <ProfileLocation>{location}</ProfileLocation>
          {/* <AboutButton className="button">Message</AboutButton>
            <AboutButton primary className="button">
              Talk
            </AboutButton> */}
          {this.renderTags()}

          <BioParagraph>{bio}</BioParagraph>
        </UserColumn>
        <UserColumn className="column">
          <FireStatersComponent firestarters={FireStaters} />
        </UserColumn>
      </UserColumns>
    )
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  AboutComponent,
)
