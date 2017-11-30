import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import styled, { ThemeProvider } from 'styled-components'
import { Flex, Box } from 'grid-styled'

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

import EmptyAvatar from '../../../../../assets/pictures/empty_avatar.jpg'

/* 
user background will actually be pulled from the user but for now we will just import a static image
static will become user.background for example
*/

const InlineBlock = styled(Flex)`
  display: inline-block;
`

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
      <ThemeProvider
        theme={{
          space: [0, 6, 12, 18, 24],
          breakpoints: [32, 48, 64, 80, 96, 112, 128],
        }}
      >
        <Flex wrap>
          <Box width={1} mx="auto">
            <TrophyContainer
              topColor={gradient.top}
              bottomColor={gradient.bottom}
            />
          </Box>
          <Box width={[1 / 5]} ml="2%">
            <Box width={1}>
              <ProfilePhoto url={user.profilePhotoUrl} />
              <Box width={1 / 10} ml="90%" mt="-100%">
                <UploadPhotoComponent />
              </Box>
            </Box>
          </Box>
          <Box width={[0.77]} ml={['23%']} mt="-10%">
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
      </ThemeProvider>
    )
  }
}

const ProfilePhoto = props => {
  return (
    <InlineBlock
      width={1}
      mt={['-1vw', '-1vw', '-5vw', '-7vw', '-9vw', '-11vw', '-20vw']}
    >
      {props.url ? (
        <img alt="profile_photo" src={props.url} height="auto" width="100%" />
      ) : (
        <img alt="empty_avatar" src={EmptyAvatar} height="auto" width="100%" />
      )}
    </InlineBlock>
  )
}

export default compose(
  graphql(currentUserQuery),
  graphql(allConnectionInterests),
  graphql(createConnectionInterest, { name: 'createConnectionInterest' }),
  graphql(updateUserMutation, { name: 'updateUser' }),
)(ProfileComponent)
