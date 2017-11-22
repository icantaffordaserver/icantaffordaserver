import React, { Component } from 'react'
import SubTitleSection from './shared/SubTitleSection'
import Schedule from './ScheduleComponent'

class Availabilty extends Component {
  state = {
    edit: false,
  }

  handleEditButton = () => this.setState({ edit: !this.state.edit })

  render() {
    return (
      <div>
        <SubTitleSection
          title={'AVAILABLITY'}
          handleEdit={this.handleEditButton}
        />
        <Schedule edit={this.state.edit} handleEdit={this.handleEditButton} />
      </div>
    )
  }
}

export default Availabilty
