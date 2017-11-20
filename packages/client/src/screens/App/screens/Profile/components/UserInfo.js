import React, { Component } from 'react'
import SubTitleSection from './shared/SubTitleSection'

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

import { Flex, Box, Grid } from 'grid-styled'
import { ProfileSection } from '../style'
import ChooseInterests from './ChooseInterestsComponent'
import EditIcon from '../../../../../assets/icons/icon.svg'
import SVG from 'react-inlinesvg'

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
          <ChooseInterests
            interests={allConnectionInterestses}
            props={props}
            handleEdit={this.handleEditButton}
          />
        ) : null}
      </ProfileSection>
    )
  }
}

export default UserInfo
