/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { Dimmer, Loader } from 'semantic-ui-react'
import styled from 'styled-components'

import ContextView from '../../../../../../../shared/components/ContextView'
import generateToken from '../util/generateToken'
import currentUserQuery from '../../../../../../../shared/graphql/queries/currentUserQuery'

const IFrameStyled = styled.iframe`
  border-width: 0;
  flex-grow: 1;
  height: ${props => (props.height ? props.height : '600px')};
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
    height: '0',
  }

  // on the case the data is in the cache
  async componentWillMount() {
    if (!this.props.data.loading) {
      const { firstName, id: userId } = this.props.data.user
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

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  // on the case the data is loaded from graphql
  async componentWillReceiveProps(nextProps) {
    if (this.props.data.loading && !nextProps.data.loading) {
      const { id: userId, firstName } = nextProps.data.user
      const token = this.state.token || (await generateToken())
      this.setState({
        typeformUrl: generateTypeformUrl({ firstName, userId, token }),
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  navigateTo = to => {
    this.props.history.push(to)
  }

  handleLeftButtonClick = () => {
    this.props.data.refetch()
    this.props.history.goBack()
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
      <ContextView
        title="Build My Profile"
        leftButton={{ title: 'Back', handler: this.handleLeftButtonClick }}
      >
        <IFrameStyled height={this.state.height * 0.65} src={this.state.typeformUrl} />
      </ContextView>
    )
  }
}

export default compose(withRouter, graphql(currentUserQuery))(ProfileBuilder)
