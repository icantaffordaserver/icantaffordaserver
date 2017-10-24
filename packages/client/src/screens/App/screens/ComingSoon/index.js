/**
 * Created by alexandermann on 2017-04-28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import styled from 'styled-components'

import { Form, FormGroup, FormButton, FormInput } from '../../styles/Forms'
import { Button } from '../../styles'
import { Label, Icon } from 'semantic-ui-react'
import { isEmail } from 'validator'

import logo from '../../shared/assets/logo.png'

import currentUserQuery from '../../shared/graphql/queries/currentUserQuery'
import inviteRequestMutation from '../../shared/graphql/mutations/inviteRequestMutation'

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  max-width: 600px;
`
const Logo = styled.img`width: 100%;`

class ComingSoon extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    loading: false,
    success: false,
    error: false,
    message: '',
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { firstName, lastName, email } = this.state

    try {
      if (!isEmail(email)) {
        this.setState({
          loading: false,
          message: 'Prease enter a valid email.',
        })
        return
      }
      this.setState({
        loading: true,
        error: false,
        success: false,
        message: '',
      }) // clear the current message

      await this.props.mutate({
        variables: {
          email,
          firstName,
          lastName,
        },
      })
      this.setState({
        loading: false,
        success: true,
        message: 'Request Sent Successfully',
      })
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
    if (this.props.data.loading) return null
    if (this.props.data && this.props.data.user)
      return <Redirect to="/profile" />
    const { loading, error, message } = this.state

    return (
      <SignUpContainer>
        <Logo alt="logo" src={logo} />
        <h1>Welcome to the community.</h1>
        <h2>
          We are currently in closed beta, to request access send us your email
          and we'll be sure to get in touch
        </h2>
        <br />
        <Form
          style={{
            width: 'fill-available !important',
          }}
          onSubmit={this.handleSubmit}
        >
          <FormGroup>
            <FormInput
              name="firstName"
              placeholder="First Name"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              name="lastName"
              placeholder="Last Name"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              name="email"
              placeholder="Email Address"
              onChange={this.onChange}
            />
          </FormGroup>
          <Button loading={loading}>
            <Icon name="send" />
            Send
          </Button>
          {message && (
            <Label basic color={error ? 'red' : 'green'} pointing="left">
              {message}
            </Label>
          )}
        </Form>
      </SignUpContainer>
    )
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(inviteRequestMutation),
)(ComingSoon)
