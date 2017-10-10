import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { GenericCenterP } from '../../styles'

import { Header } from 'semantic-ui-react'

class FormFooterComponent extends Component {
  render() {
    return (
      <div>
        {/* TODO: facebook auth */}
        {/* <Divider horizontal>Or</Divider>*/}
        {/* <Button fluid color="blue" size="large">Create Account with Facebook</Button>*/}
        <Header textAlign="center" size="tiny">
          By signing up, you agree to the{' '}
          <Link to="/termsofservice">Terms of Service</Link>.
        </Header>
        <GenericCenterP>
          Already have an account? <Link to="/login">Log in</Link>.
        </GenericCenterP>
      </div>
    )
  }
}
export default FormFooterComponent
