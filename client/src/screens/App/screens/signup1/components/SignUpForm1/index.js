import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import{
 Form,
 Header,
 Segment,
 Grid,
 Button,
 Container,
 Checkbox,
 Message,
} from 'semantic-ui-react'

import { validateSignUp } from './helpers'

class SignUp1 extends React.Component{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
      }
      static defaultProps = {
        error: '',
      }
    
      state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: '', 
        error: '',
        showPassword: false
      }
    
      onSubmit = (event, data) => {
        event.preventDefault() // prevent page reload
        this.setState({ error: '' }) // clear any old errors
        const { firstName, lastName, email, password } = data.formData
        const signUpErrors = validateSignUp(firstName, lastName, email, password)
        if (typeof signUpErrors === 'string') {
          // if validate sign up returns string we have an error
          this.setState({ error: signUpErrors })
          return
        }
        this.props.onSubmit(firstName, lastName, email, password)
      }
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
      }
    
      renderErrors = () => {
        if (this.state.error !== '')
          return <Message error header={this.state.error} />
        if (this.props.error !== '')
          return <Message error header={this.props.error} />
        return null
      }

      showHidePass = () => {
        this.setState({showPassword:!this.state.showPassword})
      }
    render(){
        const error = this.state.error !== '' || this.props.error !== ''
        return(
            <Grid centered verticalAlign="middle">
            <Grid.Column width={6} textAlign="left">
              <Form onSubmit={this.onSubmit} size="large" error={error}>
                <Segment padded>
                  <Header textAlign="center" as="h2" color="teal">
                    Create an account
                  </Header>
                  {this.renderErrors()}
                  <Form.Field>
                    <Form.Input
                      label="First Name"
                      name="firstName"
                      icon="quote left"
                      iconPosition="left"
                      placeholder="First Name"
                      onChange={this.handleChange}
                      value={this.state.firstName}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Last Name"
                      name="lastName"
                      icon="quote left"
                      iconPosition="left"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                      value={this.state.lastName}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Email"
                      name="email"
                      icon="mail"
                      iconPosition="left"
                      placeholder="Email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      label="Password"
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type={this.state.showPassword?"text":"password"}
                      id="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                    />
                    <Checkbox onClick={this.showHidePass}  label="Show password" />
                  </Form.Field>
                  <Form.Field>
                      <Form.Input
                        label="Date Of Birth"
                        name="dateOfBirth"
                        icon="calendar outline"
                        iconPosition="left"
                        placeholder="MM/DD/YYYY"
                        type="date"
                        value={this.dob}
                    />
                 </Form.Field>
                  <Button
                    fluid
                    color="teal"
                    size="large"
                    loading={this.props.loading}
                  >
                    Create Account
                  </Button>
                  {/* TODO: facebook auth */}
                  {/*<Divider horizontal>Or</Divider>*/}
                  {/*<Button fluid color="blue" size="large">Create Account with Facebook</Button>*/}
                  <Header textAlign="center" size="tiny">
                    By signing up, you agree to the{' '}
                    <Link to="/termsofservice">Terms of Service</Link>.
                  </Header>
                  <p style={{ textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Log in</Link>.
                  </p>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        )
    }
}

export default SignUp1