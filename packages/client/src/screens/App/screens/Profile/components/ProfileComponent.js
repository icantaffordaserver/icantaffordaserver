import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import {
  Button,
  Content,
  ColumnContainer,
  RowContainer,
  Section,
  Card,
  Title,
  Subheading,
  Tag,
  Text,
  TextLink,
  TextArea,
} from '../../../styles'

import { TrophyContainer, ProfileSection, FireStarterContainer } from '../style'

import UploadPhotoComponent from './UploadPhotoComponent'
import FireStartersComponent from './FireStartersComponent'

import Schedule from './ScheduleComponent'
import Biography from './Biography'
import Availabilty from './Availability'
import SubTitleSection from './shared/SubTitleSection'
import UserInfo from './UserInfo'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
import allConnectionInterests from '../../../shared/graphql/queries/allConnectionInterests'
import updateUserMutation from '../../../shared/graphql/mutations/updateUserMutation'
import createConnectionInterest from '../../../shared/graphql/mutations/createConnectionInterest.js'
import { Flex, Box, Grid } from 'grid-styled'
import SVG from 'react-inlinesvg'

import EmptyAvatar from '../../../../../assets/pictures/empty_avatar.jpg'
import EditIcon from '../../../../../assets/icons/icon.svg'

/* 
user background will actually be pulled from the user but for now we will just import a static image
static will become user.background for example
*/
const FireStarters = props => {
  return (
    <FireStarterContainer>
      <div
        style={{
          width: '95%',
          marginBottom: '20px',
          marginRight: '-200px',
        }}
      >
        <div
          style={{
            backgroundColor: '#7781C8',
            width: '100%',
            padding: '5px',
            marginBotton: '10px',
          }}
        >
          <Title small fullWidth left darkGray style={{ color: 'white' }}>
            What are some topics you’re passionate about?
          </Title>
        </div>
        <Text left small fullWidth>
          I’m extremely interested in placeholder text. I find it very
          interesting and there’s always a lot to talk about. I could talk for
          hours just about the characters and the direction that the field is
          going in. My peers are also very opinionated about palceholder text.
          Sometimes we just sit in my living room on a Friday night and have
          very heated discussions about placeholder text. I’ve lost touch with
          some of my friends over arguments we’ve had about placeholder text.
        </Text>
      </div>
    </FireStarterContainer>
  )
}

const QA = props => {
  return (
    <div>
      <SubTitleSection title={'Q&A'} />
    </div>
  )
}

class ProfileComponent extends Component {
  state = {
    loading: false,
    error: '',
  }

  render() {
    if (!this.props.user) return null
    const user = this.props.user
    const data = this.props.data
    console.log('User : ', user)
    let gradient
    if (user.gradientColors) {
      gradient = user.gradientColors
    } else {
      gradient = { top: '#F9A0AC', bottom: '#F9F9F9' }
    }
    //console.log(user.gradientColors.top, user.gradientColors.bottom)

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
          <QA user={user} />
        </Box>
        <Box width={1 / 2}>
          <FireStarters />
        </Box>
        <Box width={1 / 2}>
          <FireStarters />
        </Box>
        {/* 
            <FireStartersComponent /> // Does not work
          */}
      </Flex>
    )
  }
}

const ProfilePhoto = props => {
  return (
    <div style={{ marginTop: '-250px', width: '100%' }}>
      {props.url ? (
        <img src={props.url} height="300" width="300" />
      ) : (
        <img src={EmptyAvatar} height="300" width="300" />
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
