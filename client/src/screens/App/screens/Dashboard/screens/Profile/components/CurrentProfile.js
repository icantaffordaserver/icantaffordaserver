/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import EditProfile from '../screens/EditProfile';
import ViewProfileContainer from '../screens/CurrentProfile/ViewProfileContainer'
import DashboardContextViewWrapper from '../../../shared/components/DashboardContextViewWrapper'

class CurrentProfile extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = {
    editButtonText: 'Edit',
    isEditing: false,
  }

  setEditing = () => {
    const { isEditing } = this.state
    if (isEditing) {
      this.setState({ editButtonText: 'Edit', isEditing: false })
    } else {
      this.setState({ editButtonText: 'Done', isEditing: true })
    }
  }

  render() {
    const { editButtonText, isEditing } = this.state
    return (
      <DashboardContextViewWrapper
        title="My Profile"
        leftLinkText="Return to Dashboard"
        leftLinkClick={() => this.props.history.push('/dashboard')}
        rightLinkText={editButtonText}
        rightLinkClick={this.setEditing}
      >
        {isEditing
          ? <EditProfile doneEditing={this.setEditing} />
          : <ViewProfileContainer />}
      </DashboardContextViewWrapper>
    )
  }
}

export default withRouter(CurrentProfile)
