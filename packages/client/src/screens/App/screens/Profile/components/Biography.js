import React, { Component } from 'react'
import SubTitleSection from './shared/SubTitleSection'
import ConfirmAndCancel from './shared/ConfirmAndCancel'

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

import { ProfileSection } from '../style'

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
              <ConfirmAndCancel
                handleSave={this.handleSave}
                handleCancel={this.handleClear}
              />
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

export default Biography
