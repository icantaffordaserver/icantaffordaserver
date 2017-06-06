/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Header } from 'semantic-ui-react'
import styled from 'styled-components'

import DashboardContextViewWrapper from '../../../../shared/components/DashboardContextViewWrapper'

import currentUserQuery from '../../../../../../shared/graphql/queries/currentUserQuery'

const TextContainer = styled.div`
  padding: 100px
`

class GettingStarted extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  navigateTo = to => {
    this.props.history.push(to)
  }

  handleLeftLinkClick = () => {
    this.navigateTo('/dashboard')
  }

  handleRightLinkClick = () => {
    this.navigateTo('/dashboard/profile/builder')
  }

  render() {
    if (this.props.data.loading) return null

    const { firstName } = this.props.data.viewer.user
    return (
      <DashboardContextViewWrapper
        leftLinkText="Return to Dashboard"
        leftLinkClick={this.handleLeftLinkClick}
        rightLinkText="Let's get started"
        rightLinkClick={this.handleRightLinkClick}
      >
        <TextContainer>
          <Header as="h1" textAlign="center">Hey {firstName},</Header>
          <Header as="h3">
            Two recent university grads created this project with the
            goal to connect with others who shared similar interests, passions and curiosities. If
            you're a recent grad then you probably understand how different the real world can be
            from school. It is much harder to meet new people and most tend to stay close to our
            pre-existing friend groups, networks, etc.
          </Header>
          <Header as="h3">
            Both myself and my co-founder love to learn. In our personal experiences we have
            found that we learn about new ideas, concepts, and perspectives most easily through
            others. People are a vast network of knowledge, everyone experiences different cultures,
            studies, jobs, etc and we want to speak to those people to learn more about the world
            that
            we live in. Maybe you are working on a school project and you need to speak to someone
            in
            geology - our hope is that we can connect you with that person easily, for your benefit.
          </Header>
          <Header as="h3">
            The end idea is that connecting with others makes us feel good, it makes life
            interesting
            and eventful, and helps expand our minds to think from different perspectives. Please
            note
            that this is a beta version of our end product and that we expect it only to get better.
          </Header>
          <Header as="h3">
            Thanks,
          </Header>
          <Header as="h3">
            Alex and Blake.
          </Header>
        </TextContainer>
      </DashboardContextViewWrapper>
    )
  }
}

export default withRouter(graphql(currentUserQuery)(GettingStarted))
