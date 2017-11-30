import React, { Component } from 'react'
import { graphql, withApollo, compose } from 'react-apollo'
import moment from 'moment'
import styled from 'styled-components'
import UserTable from '../components/UserTable'
import createConnection from '../graphql/mutations/createConnectionMutation'
import { overlappingTimes } from '../utils/availabilityUtils'
import allUsersQueue from '../graphql/queries/allUsersQueue'

class UsersPage extends Component {
  state = {}
  handleSearchUser = async id => {}
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
        <Row>
          <TableContainer>
            <UserTable
              users={queue}
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
        </Row>
      </PageContainer>
    )
  }
}

export default compose(graphql(allUsersQueue), withApollo)(UsersPage)
const PageContainer = styled.div`
  margin-left: 32px;
  width: 100%;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const ConnectionContainer = styled.div`
  height: 600px;
  width: 48%;
  overflow-y: scroll;
`
const Slot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(22, 23, 26, 0.25);

  :hover {
    box-shadow: 0 2px 12px 0 rgba(22, 23, 26, 0.25);
  }
`
const Button = styled.button`
  padding: 2% 5%;
  background: #bdef87;
  color: #fff;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5em;
`
const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 80px;
  flex-grow: 1;
  width: 48%;
  height: 600px;
  display: flex;
  border: 1px solid #e1e7ed;
  border-radius: 5px;
  background: #f6f7f8;
`

const PageTitle = styled.h1`
  margin: 0;
`
