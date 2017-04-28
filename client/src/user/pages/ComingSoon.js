/**
 * Created by alexandermann on 2017-04-28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Form, Input, Label } from 'semantic-ui-react'
import { isEmail } from 'validator'
import FullHeightContainer from '../components/Dashboard/FullHeightContainer'
import logo from '../../assets/logo.png'

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  max-width: 600px;
`
const Logo = styled.img`
  width: 100%;
`
const H1 = styled.h1``
const H2 = styled.h2``

class ComingSoon extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
  }
  static defaultProps = {}
  state = {
    email: '',
    loading: false,
    message: '',
    error: false,
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { email } = this.state
    this.setState({ error: false, message: '' }) // clear the current message
    if (!isEmail(email)) {
      this.setState({ message: 'Please enter a valid email' })
      return
    }
    try {
      this.setState({ loading: true })
      await this.props.mutate({ variables: { input: { email, referredFrom: 'webapp' } } })
      this.setState({ loading: false, message: 'Request Sent Successfully' })
    } catch (error) {
      console.log(error)
      this.setState({
        loading: false,
        error: true,
        message: 'An error occurred, please try again later',
      })
    }
  }

  render() {
    const { loading, error, message } = this.state
    return (
      <FullHeightContainer>
        <SignUpContainer>
          <Logo alt="logo" src={logo} />
          <H1>Welcome to the community.</H1>
          <H2>
            We are currently in closed beta, to request access send us your email and we'll be sure to get in touch
          </H2>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Input
              fluid
              name="email"
              size="big"
              placeholder="Enter your email"
              action={{
                color: 'teal',
                labelPosition: 'right',
                icon: 'send',
                content: 'Request',
                loading,
              }}
              onChange={this.handleChange}
            />
            {message && <Label basic color={error ? 'red' : 'green'} pointing>{message}</Label>}
          </Form>
        </SignUpContainer>
      </FullHeightContainer>
    )
  }
}

export default graphql(
  gql`
  mutation ($input: CreateInviteRequestsInput!) {
    createInviteRequests(input: $input) {
      changedInviteRequests {
        email
      }
    }
  }
`,
)(ComingSoon)
