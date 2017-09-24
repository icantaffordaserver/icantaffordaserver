import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { GenericCenterP, InterestsDiv, InterestsImg, Div } from '../../styles'
class InterestsComponent extends Component {
  renderInterests = () => {
    const interestsData = this.props.getInterests
    const listItems = interestsData.data.allConnectionInterests.map(
      interest => {
        return (
          <InterestsDiv key={interest.name} className="column">
            <a
              onClick={event => {
                this.props.addInterest(interest.name, event)
              }}
            >
              <figure style={{ margin: '10px' }} className="image is-64x64">
                <InterestsImg
                  key={interest.name}
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt={interest.name}
                />
              </figure>
            </a>

            <GenericCenterP>Interest Name</GenericCenterP>
          </InterestsDiv>
        )
      },
    )

    return listItems
  }
  render() {
    const interestsList = this.renderInterests()

    return <Div className="columns">{interestsList}</Div>
  }
}
export default InterestsComponent
