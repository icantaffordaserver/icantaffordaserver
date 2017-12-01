/**
 * Created by alexandermann on 2017-03-28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { Button } from 'semantic-ui-react'

import resendVerificationEmailMutation from '../graphql/resendVerificationEmailMutation'
import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class ResendVerificationEmailButtonContainer extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      buttonStatusMessage: 'Click to resend email',
      success: false,
      error: false,
    }
  }

  handleClick = async () => {
    const { id, email } = this.props.data.viewer.user
    try {
      this.setState({ loading: true })
      await this.props.mutate({
        variables: {
          input: { userId: id, emailToVerify: email },
        },
      })
      this.setState({
        loading: false,
        buttonStatusMessage: 'Email sent!',
        success: true,
      })
    } catch (error) {
      this.setState({
        loading: false,
        buttonStatusMessage: 'An error occurred',
        error: true,
      })
    }
  }

  render() {
    const { loading, success, error, buttonStatusMessage } = this.state
    return (
      <Button
        positive={!error}
        negative={error}
        disabled={success || error}
        onClick={this.handleClick}
        loading={loading}
      >
        {buttonStatusMessage}
      </Button>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(resendVerificationEmailMutation),
)(ResendVerificationEmailButtonContainer)
