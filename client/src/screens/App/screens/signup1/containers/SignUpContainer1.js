import React from 'react'
import PropTypes from 'prop-types'
import { graphql, withApollo, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import SignUpForm1 from '../components/SignUpForm1'

import signUpMutation from '../graphql/signUpMutation'
import signInMutation from '../../../shared/graphql/mutations/signInMutation'

class SignUpContainer1 extends React.Component{

    state = {
        loading: false,
        error: '', 
    }

    render(){
        return(
            <SignUpForm1
                onSubmit={this.handleSignUp}
                loading={this.state.loading}
                error={this.state.error}
            />
        )
    }
}

export default SignUpContainer1