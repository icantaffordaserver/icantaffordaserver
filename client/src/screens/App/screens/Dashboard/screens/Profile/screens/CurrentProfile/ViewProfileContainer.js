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
      typeformProfile,
    } = this.props.data.user
    return (
      <div>
        <ProfileHeader user={this.props.data.user} />
        <Header as="h2" content="My Cards" textAlign="center" />
        <AllCards profileResponses={typeformProfile ? typeformProfile.profileResponses : {}} />
      </div>
    )
  }
}

export default graphql(currentUserQuery)(ViewProfileContainer)
