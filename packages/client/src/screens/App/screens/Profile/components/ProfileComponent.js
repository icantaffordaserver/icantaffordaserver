import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'

import SettingsComponent from './SettingsComponent'
import AvailabilityComponent from './AvailabilityComponent'
import FireStartersComponent from './FireStartersComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

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
import { Modal } from 'semantic-ui-react'

import SettingsComponent from './SettingsComponent'
import AvailabilityComponent from './AvailabilityComponent'
import UploadPhotoComponent from './UploadPhotoComponent'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

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
        <Section inline gray>
          <Section inline gray>
            <Title medium left>
              General Info
            </Title>
            <Title medium left>
              Bio
            </Title>
          </Section>
          <RowContainer>
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

            <Card>
              <Text left small fullWidth>
                {this.props.user.bio}
              </Text>
            </Card>
          </RowContainer>
        </Section>

        <ColumnContainer>
          <Title medium left fullWidth>
            Schedule
          </Title>
          <AvailabilityComponent />
        </ColumnContainer>
        <FireStartersComponent />
      </ColumnContainer>
    )
  }
}

export default graphql(currentUserQuery)(ProfileComponent)
