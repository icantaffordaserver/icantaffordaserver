import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import {
  Content,
  ColumnContainer,
  Section,
  Card,
  Title,
  Subheading,
  Tag,
  Text,
  TextLink,
} from '../../../styles'
import { Modal } from 'semantic-ui-react'

import SettingsComponent from './SettingsComponent'
import AvailabilityComponent from './AvailabilityComponent'
import UploadPhotoComponent from './UploadPhotoComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'
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

    return (
      <ColumnContainer>
        <Content
          style={{
            margin: '1% auto',
            height: '461px',
            width: '100%',
            background: ' #F2C94C',
          }}
        >
          I think pictures are supposed to go here?
        </Content>
        <SettingsComponent
          user={this.props.user}
          onSubmit={this.props.onSubmit}
          error={this.props.error}
          loading={this.props.loading}
          success={this.props.success}
          editing={this.props.editing}
          open={this.props.open}
        />
        <UploadPhotoComponent />
        <Section inline gray>
          <ColumnContainer>
            <Title medium left fullWidth>
              General Info
            </Title>
            <Card>
              <Title small darkGray fullWidth>
                {user.firstName} {user.lastName}
              </Title>
              <Subheading darkGray small fullWidth>
                Toronto, Canada | UTC - 4:00
              </Subheading>

              <Section inline className="compressed">
                <Tag>#Stuff</Tag>
                <Tag>#That</Tag>
                <Tag>#I</Tag>
                <Tag>#Like</Tag>
              </Section>
            </Card>
          </ColumnContainer>
          <ColumnContainer>
            <Title medium left fullWidth>
              Bio
            </Title>
            <Card>
              <Text left small>
                {this.props.user.bio}
              </Text>
            </Card>
          </ColumnContainer>
        </Section>

        <ColumnContainer>
          <Title medium left fullWidth>
            Schedule
          </Title>
          <AvailabilityComponent />
        </ColumnContainer>

        <Section inline gray>
          <ColumnContainer>
            <Title medium left fullWidth>
              Q & A
            </Title>
            <Card>
              <Text left small>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Card>
          </ColumnContainer>
          <ColumnContainer>
            <Card className="pushed">
              <Text left small>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Card>
          </ColumnContainer>
        </Section>
      </ColumnContainer>
    )
  }
}

export default compose(graphql(currentUserQuery), withApollo, withRouter)(
  ProfileComponent,
)
