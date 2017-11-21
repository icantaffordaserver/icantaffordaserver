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

class ChooseInterests extends Component {
  state = {
    selectedTags: [],
    suggestion: '',
  }

  changeColor = id => {
    let index = this.state.selectedTags.indexOf(id)
    console.log('index: ', index)
    if (index === -1) {
      this.setState({ selectedTags: [...this.state.selectedTags, id] }, () =>
        console.log(this.state),
      )
    } else {
      const selectedTags = this.state.selectedTags
      this.setState(
        {
          selectedTags: [
            ...selectedTags.slice(0, index),
            ...selectedTags.slice(index + 1),
          ],
        },
        () => console.log(this.state),
      )
    }
  }

  handleChange = e => {
    if (e.target.value) {
      this.setState({ suggestion: e.target.value })
    }
  }

  handleSubmit = () => {
    let { props } = this.props
    console.log(this.props, ' Choose interests')
    props
      .createConnectionInterest({
        variables: {
          name: this.state.suggestion,
        },
      })
      .then(() => this.setState({ suggestion: '' }))
      .then(() => console.log(this.state))
      .catch(err => console.error(err))
  }

  handleClear = () => this.setState({ selectedTags: [] })

  handleConfirm = () => {
    let { props } = this.props
    let exisitingTags = props.user.connectionInterests.map(x => x.id)
    let connectionInterestsIds = [...exisitingTags, ...this.state.selectedTags]
    props
      .updateUser({
        variables: {
          id: props.user.id,
          connectionInterestsIds,
        },
        refetchQueries: [
          {
            query: currentUserQuery,
          },
        ],
      })
      .then(() => this.setState({ selectedTags: [] }))
      .then(() => console.log(this.state))
      .catch(err => console.error(err))
  }

  render() {
    let { interests } = this.props
    const { selectedTags } = this.state

    return (
      <div style={{ marginLeft: '10px', marginTop: '20px' }}>
        <p>
          Choose your interests:
          <br />
          <i>Multiple interests can be selected.</i>
        </p>
        <Flex wrap>
          {interests.map((x, i) => (
            <Box width={1 / 5} key={x.id}>
              <div
                style={{
                  justifyContent: 'space-between',
                }}
                onClick={() => this.changeColor(x.id)}
              >
                <Tag isSelected={selectedTags.includes(x.id)}>#{x.name}</Tag>
              </div>
            </Box>
          ))}
        </Flex>
        <p>
          Create your own interest:
          <br />
          <i>
            This will show up in your profile, and if popular enought, we may
            feature it in the future!
          </i>
        </p>
        <input
          value={this.state.suggestion}
          type="text"
          onChange={this.handleChange}
        />
        <Button small noMargin color="accept" onClick={this.handleSubmit}>
          Submit
        </Button>
        <div
          style={{
            margin: '1% auto',
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%',
          }}
        >
          <Button small noMargin color="cancel" onClick={this.handleClear}>
            Clear
          </Button>
          <Button noMargin onClick={this.handleConfirm} small>
            Confirm
          </Button>
        </div>
      </div>
    )
  }
}

class UserInfo extends Component {
  state = {
    edit: false,
  }

  handleEditButton = () => this.setState({ edit: !this.state.edit })

  render() {
    console.log(this.props, ' User Info')
    let { firstName, lastName, connectionInterests } = this.props.user
    let { allConnectionInterestses } = this.props.data
    let { props } = this.props
    return (
      <ProfileSection>
        <div style={{ marginLeft: '10px' }}>
          <Title darkGray fullWidth>
            <Grid width={1 / 5}>
              {firstName} {lastName}
            </Grid>
            <Grid width={1 / 9} ml="68.8%">
              <div onClick={this.handleEditButton}>
                <SVG src={EditIcon} />
              </div>
            </Grid>
          </Title>
        </div>
        <div
          style={{
            display: 'inline-flex',
            justifyContent: 'space-between',
          }}
        >
          {connectionInterests.map(x => <Tag key={x.id}>#{x.name}</Tag>)}
        </div>
        {this.state.edit ? (
          <ChooseInterests interests={allConnectionInterestses} props={props} />
        ) : null}
      </ProfileSection>
    )
  }
}

class Biography extends Component {
  state = {
    edit: false,
    bio: this.props.user.bio,
  }

  handleEditButton = () => this.setState({ edit: !this.state.edit })

  handleChange = e => {
    if (e.target.value) {
      this.setState({ bio: e.target.value })
    }
  }

  handleClear = () => this.setState({ bio: '' })

  handleSave = e => {
    e.preventDefault()
    this.props.onSubmit({
      id: this.props.user.id,
      bio: this.state.bio,
    })

    this.setState({ edit: false })
  }

  render() {
    return (
      <div>
        <SubTitleSection
          title={'BIOGRAPHY'}
          handleEdit={this.handleEditButton}
        />
        <ProfileSection>
          {this.state.edit ? (
            <div>
              <TextArea
                value={this.state.bio}
                maxLength="250"
                name="bio"
                onChange={this.handleChange}
              />
              <div
                style={{
                  margin: '1% auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '50%',
                }}
              >
                <Button
                  small
                  noMargin
                  color="cancel"
                  onClick={this.handleClear}
                  style={
                    this.state.edit
                      ? { display: 'inline' }
                      : { display: 'none' }
                  }
                >
                  Clear
                </Button>
                <Button
                  noMargin
                  onClick={this.handleSave}
                  small
                  style={
                    this.state.edit
                      ? { display: 'inline' }
                      : { display: 'none' }
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <Text small fullWidth style={{ padding: '20px' }}>
              {this.props.user.bio}
            </Text>
          )}
        </ProfileSection>
      </div>
    )
  }
}

const SubTitleSection = ({ title, handleEdit }) => {
  return (
    <ProfileSection>
      <Title fullWidth darkGray style={{ padding: '20px' }}>
        <Grid width={1 / 3} ml="33%">
          {title}
        </Grid>
        <Grid width={1 / 20} ml="28%">
          <div onClick={handleEdit}>
            <SVG src={EditIcon} />
          </div>
        </Grid>
      </Title>
    </ProfileSection>
  )
}

class Availabilty extends Component {
  state = {
    edit: false,
  }

  handleEditButton = () => this.setState({ edit: !this.state.edit })

  render() {
    return (
      <div>
        <SubTitleSection
          title={'AVAILABILITY'}
          handleEdit={this.handleEditButton}
        />
        <AvailabilityScheduleComponent
          edit={this.state.edit}
          handleEdit={this.handleEditButton}
        />
      </div>
    )
  }
}
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
        <Box width={1}>
          <FireStartersComponent />
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
