import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'

import moment from 'moment'
import UserTable from '../components/UserTable'
import createConnection from '../graphql/mutations/createConnectionMutation'
import { overlappingTimes } from '../utils/availabilityUtils'
import allUsersQueue from '../graphql/queries/allUsersQueue'

import {
  PageContainer,
  RowContainer,
  PageTitle,
  ConnectionContainer,
  Button,
  Slot,
  TableContainer,
  SearchArea,
  SearchBar,
} from '../styles'

class UsersPage extends Component {
  state = {}
  handleSearchUser = async e => {
    if (e.target.value === '') {
      this.setState({
        searchQueue: null,
      })
      return
    }
    const users = this.props.data.queue.filter(
      u => u.email.indexOf(e.target.value) > -1,
    )
    this.setState({
      searchQueue: users,
    })
  }
  handleBanUser = async id => {}
  handleConnection = async connectionTime => {
    const participantsIds = this.state.potentialConnection.users.map(u => u.id)
    await this.props.client.mutate({
      mutation: createConnection,
      variables: {
        connectionTime,
        participantsIds,
      },
    })
  }
  selectUser = user => {
    if (!user.availability) {
      alert('User does not have availability set.')
      return
    }
    const selectedUser = this.state.currentUser

    //Unselect
    if (selectedUser === user) {
      this.setState({
        currentUser: null,
        potentialConnection: null,
      })
      return
    }
    if (selectedUser) {
      this.setState({
        potentialConnection: {
          potentialTimes: overlappingTimes(
            selectedUser.availability,
            user.availability,
          ),
          users: [selectedUser, user],
        },
      })
    } else
      this.setState({
        currentUser: user,
      })
  }

  renderPotentialTimes = () => {
    const times = this.state.potentialConnection.potentialTimes

    return times.map(time => {
      // Get the full Date of the available slot
      const date = time.day

      return time.slots.map((slot, i) => {
        const [hours, minutes] = slot.split(':')

        // Set the connection to the full date + the timeslots provided
        // by user availability.
        const connectionTime = moment(date, 'dddd MMMM Do YYYY').set({
          hours,
          minutes,
        })
        return (
          <Slot key={i}>
            {connectionTime.format('dddd MMMM Do YYYY [at] hh:mmA')}
            <Button onClick={() => this.handleConnection(connectionTime)}>
              Schedule
            </Button>
          </Slot>
        )
      })
    })
  }
  render() {
    const { data } = this.props
    if (data.loading) return null
    const queue = data.queue.filter(u => u.availability !== null)
    const { potentialConnection, currentUser } = this.state
    return (
      <PageContainer>
        <PageTitle>User's Queue</PageTitle>
        <SearchArea>
          <h3>Search User</h3>
          <SearchBar
            placeholder="Enter user's email."
            onChange={this.handleSearchUser}
          />
        </SearchArea>
        <RowContainer>
          <TableContainer>
            <UserTable
              users={this.state.searchQueue ? this.state.searchQueue : queue}
              selectUser={this.selectUser}
              currentUser={currentUser}
            />
          </TableContainer>
          {potentialConnection && (
            <ConnectionContainer>
              <h3>
                Connection for {potentialConnection.users[0].firstName} and{' '}
                {potentialConnection.users[1].firstName}
              </h3>
              Potential Times:
              {this.renderPotentialTimes()}
            </ConnectionContainer>
          )}
        </RowContainer>
      </PageContainer>
    )
  }
}

export default compose(graphql(allUsersQueue), withApollo)(UsersPage)
