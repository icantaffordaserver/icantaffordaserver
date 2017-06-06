/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { Dimmer, Loader } from 'semantic-ui-react'
import styled from 'styled-components'

import DashboardContextViewWrapper from '../../../../../shared/components/DashboardContextViewWrapper'
import currentUserQuery from '../../../../../../../shared/graphql/queries/currentUserQuery'
import generateToken from '../helpers/generateToken'

const IFrameStyled = styled.iframe`
  border-width: 0;
  flex-grow: 1;
`

// TODO: this needs to be generated dynamically from server side
function generateTypeformUrl({ firstName, userId, token }) {
  return `https://shiftwithus.typeform.com/to/aHq8UA?first_name=${firstName}&user_id=${userId}&response_id=${token}`
}

class ProfileBuilder extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    typeformUrl: '',
    token: '',
  }

  // on the case the data is in the cache
  async componentWillMount() {
    if (!this.props.data.loading) {
      const { firstName, id: userId } = this.props.data.viewer.user
      const typeformUrl =
        !this.props.data.loading &&
        generateTypeformUrl({
          firstName,
          userId,
          token: await generateToken(),
        })
      this.setState({
        typeformUrl,
      })
    }
  }

  // on the case the data is loaded from graphql
  async componentWillReceiveProps(nextProps) {
    if (this.props.data.loading && !nextProps.data.loading) {
      const { id: userId, firstName } = nextProps.data.viewer.user
      const token = this.state.token || (await generateToken())
      this.setState({
        typeformUrl: generateTypeformUrl({ firstName, userId, token }),
      })
    }
  }

  navigateTo = to => {
    this.props.history.push(to)
  }

  handleLeftLinkClick = () => {
    this.props.data.refetch()
    this.navigateTo('/dashboard')
  }

  handleRightLinkClick = () => {
    this.props.data.refetch()
    console.log('saving')
  }

  render() {
    if (this.props.data.loading) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )
    }
    return (
      <DashboardContextViewWrapper
        leftLinkText="Return to Dashboard"
        leftLinkClick={this.handleLeftLinkClick}
        rightLinkText="Save"
        rightLinkClick={this.handleRightLinkClick}
      >
        <IFrameStyled src={this.state.typeformUrl} />
      </DashboardContextViewWrapper>
    )
  }
}

export default compose(withRouter, graphql(currentUserQuery))(ProfileBuilder)
