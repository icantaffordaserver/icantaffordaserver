import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import { TrophyContainer } from '../style'

import UploadPhotoComponent from './UploadPhotoComponent'

import Biography from './Biography'
import Availabilty from './Availability'
import SubTitleSection from './shared/SubTitleSection'
import UserInfo from './UserInfo'
import FireStartersComponent from './FireStartersComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import allConnectionInterests from '../../../shared/graphql/queries/allConnectionInterests'
import updateUserMutation from '../../../shared/graphql/mutations/updateUserMutation'
import createConnectionInterest from '../../../shared/graphql/mutations/createConnectionInterest.js'
import { Flex, Box } from 'grid-styled'

import EmptyAvatar from '../../../../../assets/pictures/empty_avatar.jpg'

/* 
user background will actually be pulled from the user but for now we will just import a static image
static will become user.background for example
*/
class ProfileComponent extends Component {
  state = {
    loading: false,
    error: '',
  }

  render() {
    if (!this.props.user) return null
    const user = this.props.user
    const data = this.props.data
    let gradient
    if (user.gradientColors) {
      gradient = user.gradientColors
    } else {
      gradient = { top: '#F9A0AC', bottom: '#F9F9F9' }
    }
    //console.log(user.gradientColors.top, user.gradientColors.bottom)
    if (this.props.loading) return null
    return (
      <Flex wrap>
        <Box width={1} mx="auto">
          <TrophyContainer
            topColor={gradient.top}
            bottomColor={gradient.bottom}
          />
        </Box>
        <Box width={1 / 4} ml="2%" mt="5%">
          <ProfilePhoto url={user.profilePhotoUrl} />
          <UploadPhotoComponent />
        </Box>
        <Box width={1} ml="25%" mt="-10%">
          <UserInfo user={user} data={data} props={this.props} />
        </Box>
        <Box width={1} mx="auto">
          <Biography user={user} onSubmit={this.props.onSubmit} />
        </Box>
        <Box width={1} mx="auto">
          <Availabilty user={user} />
        </Box>

        <Box width={1} mx="auto">
          <SubTitleSection title={'Q&A'} />
          <FireStartersComponent />
        </Box>
      </Flex>
    )
  }
}

const ProfilePhoto = props => {
  return (
    <div style={{ marginTop: '-250px', width: '100%' }}>
      {props.url ? (
        <img alt="profile_photo" src={props.url} height="300" width="300" />
      ) : (
        <img alt="empty_avatar" src={EmptyAvatar} height="300" width="300" />
      )}
    </div>
  )
}

export default compose(
  graphql(currentUserQuery),
  graphql(allConnectionInterests),
  graphql(createConnectionInterest, { name: 'createConnectionInterest' }),
  graphql(updateUserMutation, { name: 'updateUser' }),
)(ProfileComponent)
