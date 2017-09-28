import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'

import TagsComponent from './components/TagsComponent'
import FireStatersComponent from './components/FireStartersComponent'
import {
  AboutButton,
  ProfileHeader,
  UserColumns,
  UserColumn,
  BioParagraph,
} from './styles'

class AboutComponent extends Component {
  render() {
    const { firstName, lastName, email, bio, location } = this.props.user
    // placeholder data will be replaced when user query is refactored
    const tags = {
      data: {
        tags: [
          { tag: 'Development' },
          { tag: 'People' },
          { tag: 'Space' },
          { tag: 'Dogs' },
        ],
      },
    }
    const FireStaters = {
      data: {
        FireStaters: [
          { id: 1, title: 'What are things that worry you?', answer: bio },
          { id: 2, title: 'What are things that worry you?', answer: bio },
        ],
      },
    }
    // placeholder

    return (
      <UserColumns className="columns">
        <UserColumn center className="column is-one-third">
          <h1 style={{ margin: '0px' }}>{firstName + ' ' + lastName}</h1>
          <h3 style={{ margin: '0px', paddingBottom: '1%' }}>{location}</h3>
          <div style={{ width: '100%', padding: '1%' }}>
            {/* <AboutButton className="button">Message</AboutButton>
            <AboutButton primary className="button">
              Talk
            </AboutButton> */}
            <TagsComponent tags={tags} />
          </div>

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
