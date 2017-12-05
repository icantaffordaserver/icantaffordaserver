import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { Box, Grid } from 'grid-styled'

import { Title, Tag } from '../../../styles'
import { ProfileSection } from '../style'

import ChooseInterests from './ChooseInterestsComponent'

import EditIcon from '../../../../../assets/icons/icon.svg'

class UserInfo extends Component {
  state = {
    edit: false,
  }

  handleEditButton = () => this.setState({ edit: !this.state.edit })

  render() {
    let { firstName, lastName, connectionInterests } = this.props.user
    let { allConnectionInterestses } = this.props.data
    let { user } = this.props
    let { updateUser, loading } = this.props.props
    const name = firstName + ' ' + lastName
    return (
      <Box width={1} py={2}>
        <ProfileSection>
          <Box width={1} p="20px">
            <Grid width={1 / 3}>
              <Title fullWidth darkGray left>
                {name}
              </Title>
            </Grid>

            <Grid width={1 / 20} ml="61%">
              <div onClick={this.handleEditButton}>
                <ReactSVG path={EditIcon} />
              </div>
            </Grid>
          </Box>
          <Box width={1} p={2}>
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
              }}
            >
              {connectionInterests.map(x => <Tag key={x.id}>#{x.name}</Tag>)}
            </div>
          </Box>
          {this.state.edit ? (
            <ChooseInterests
              interests={allConnectionInterestses}
              loading={loading}
              user={user}
              updateUser={updateUser}
              handleEdit={this.handleEditButton}
            />
          ) : null}
        </ProfileSection>
      </Box>
    )
  }
}

export default UserInfo
