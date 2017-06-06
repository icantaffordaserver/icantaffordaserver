/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react'
import { graphql } from 'react-apollo'
import { Header } from 'semantic-ui-react'

import ProfileHeader from '../../components/ProfileHeader'
import AllCards from '../../components/AllCards'

import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

class ViewProfileContainer extends React.Component {
  render() {
    if (this.props.data.loading) return null

    const {
      profilePhoto,
      typeformProfile: { profileResponses, dateSubmit },
    } = this.props.data.viewer.user
    return (
      <div>
        <ProfileHeader user={this.props.data.viewer.user} />
        <Header as="h2" content="My Cards" textAlign="center" />
        <AllCards profileResponses={profileResponses} />
      </div>
    )
  }
}

export default graphql(currentUserQuery)(ViewProfileContainer)
