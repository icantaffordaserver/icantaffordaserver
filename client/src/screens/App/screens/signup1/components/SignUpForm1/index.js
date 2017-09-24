import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import {
  FormH1,
  SignUpImg,
  Div,
  OverLay,
  ImageDiv,
  FormSegment,
  FormHeaderP,
  FormNextButton,
  FormSubmitButton,
  ImageH1,
  ImageP,
  InterestsImg,
  InterestsDiv,
  GenericCenterP,
} from './styles'

import { Form, Header, Checkbox, Message } from 'semantic-ui-react'

import productShot from '../../assets/images/signup-shot1.jpg'

import { validateSignUp } from './helpers'

class SignUp1 extends React.Component {
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
    birthday: '',
    bio: '',
    location: '',
    interests: [],
    suggestedInterest: '',
    tags: [],
    error: '',
    showPassword: false,
    formStep: 0,
  }

  onSubmit = (event, data) => {
    event.preventDefault() // prevent page reload

    this.setState({ error: '' }) // clear any old errors
    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   birthday,
    //   bio,
    //   location,
    //   interests,
    //   suggestedInterest,
    // } = this.state

    const signUpErrors = validateSignUp(this.state)
    if (typeof signUpErrors === 'string') {
      // if validate sign up returns string we have an error
      this.setState({
        error: signUpErrors,
      })
      return
    }
    this.props.onSubmit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      birthday: this.state.birthday,
      bio: this.state.bio,
    })
  }
  addInterest = (interest, event) => {
    const image = event.target

    if (this.state.interests.includes(interest)) {
      this.state.interests.splice(this.state.interests.indexOf(interest), 1)
      image.classList.remove('active')
    } else {
      this.state.interests.push(interest)
      image.classList.add('active')
    }
    console.log(this.state.interests)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTagChange = event => {
    this.setState({ tags: event })
  }

  renderErrors = () => {
    if (this.state.error !== '') {
      return <Message error header={this.state.error} />
    }
    if (this.props.error !== '') {
      return <Message error header={this.props.error} />
    }
    return null
  }

  getNextStep = () => {
    this.setState({ formStep: (this.state.formStep += 1) })
  }

  goBack = () => {
    this.setState({ formStep: (this.state.formStep -= 1) })
  }

  showHidePass = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  FormSection1() {
    return (
      <FormSegment padded>
        <FormH1>SIGN UP</FormH1>
        <Div className="columns">
          <Div className="column">
            <FormHeaderP>Account Info</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>Select Interests</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>Personal Bio</FormHeaderP>
          </Div>
        </Div>
        {this.renderErrors()}
        <Div className="columns">
          <Div className="column is-half">
            <Form.Field>
              <Div className="control">
                <input
                  className="input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </Div>
            </Form.Field>
          </Div>
          <Div className="column is-half">
            <Form.Field>
              <Div className="control">
                <input
                  className="input"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </Div>
            </Form.Field>
          </Div>
        </Div>
        <Form.Field>
          <Div className="control">
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Div>
        </Form.Field>

        <Div className="field">
          <Div className="control">
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              type={this.state.showPassword ? 'text' : 'password'}
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Div>
          <span>&nbsp;&nbsp;</span>
          <Checkbox onClick={this.showHidePass} label="Show password" />
        </Div>
        <Form.Field>
          <Div className="control">
            <input
              className="input"
              type="text"
              name="birthday"
              placeholder="DD/MM/YYYY"
              onChange={this.handleChange}
              value={this.state.birthday}
            />
          </Div>
        </Form.Field>

        {/* <Button
        fluid
        color="teal"
        size="large"
        loading={this.props.loading}
      >
        Create Account
      </Button> */}
        <FormNextButton
          className="button is-primary"
          onClick={this.getNextStep}
        >
          Select your interests!
        </FormNextButton>

        {/* TODO: facebook auth */}
        {/* <Divider horizontal>Or</Divider>*/}
        {/* <Button fluid color="blue" size="large">Create Account with Facebook</Button>*/}
        <Header textAlign="center" size="tiny">
          By signing up, you agree to the{' '}
          <Link to="/termsofservice">Terms of Service</Link>.
        </Header>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log in</Link>.
        </p>
      </FormSegment>
    )
  }

  FormSection2() {
    return (
      <FormSegment padded>
        <FormH1>SIGN UP</FormH1>
        <Div className="columns">
          <Div className="column">
            <FormHeaderP>Account Info</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>Select Interests</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>Personal Bio</FormHeaderP>
          </Div>
        </Div>
        {this.renderErrors()}
        <Form.Field>
          <Div className="columns">
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest1', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest1"
                  className={this.state.grayScale ? 'active' : ''}
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest2', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest2"
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest3', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest3"
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest4', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest4"
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
          </Div>
          <Div className="columns">
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest5', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest5"
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest6', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest6"
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest7', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest7"
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
            <InterestsDiv className="column">
              <a
                onClick={event => {
                  this.addInterest('Interest8', event)
                }}
              >
                <InterestsImg
                  style={{ borderRadius: '50px' }}
                  src="http://via.placeholder.com/64/EE7600"
                  alt="interest8"
                />
              </a>
              <GenericCenterP>Interest Name</GenericCenterP>
            </InterestsDiv>
          </Div>
        </Form.Field>
        <Form.Field>
          <Div className="column">
            <TagsInput
              value={this.state.tags}
              onChange={this.handleTagChange}
            />
          </Div>
        </Form.Field>

        {/* <Button
              fluid
              color="teal"
              size="large"
              loading={this.props.loading}
            >
              Create Account
            </Button> */}
        <Div className="columns">
          <Div className="column">
            <FormNextButton className="button is-primary" onClick={this.goBack}>
              Go back
            </FormNextButton>
          </Div>
          <Div className="column">
            <FormNextButton
              className="button is-primary"
              onClick={this.getNextStep}
            >
              Tell us a bit more!
            </FormNextButton>
          </Div>
        </Div>
        {/* TODO: facebook auth */}
        {/* <Divider horizontal>Or</Divider>*/}
        {/* <Button fluid color="blue" size="large">Create Account with Facebook</Button>*/}
        <Header textAlign="center" size="tiny">
          By signing up, you agree to the{' '}
          <Link to="/termsofservice">Terms of Service</Link>.
        </Header>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log in</Link>.
        </p>
      </FormSegment>
    )
  }
  FormSection3() {
    return (
      <FormSegment padded>
        <FormH1>SIGN UP</FormH1>
        <Div className="columns">
          <Div className="column">
            <FormHeaderP>Account Info</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>Select Interests</FormHeaderP>
          </Div>
          <Div className="column">
            <FormHeaderP>Personal Bio</FormHeaderP>
          </Div>
        </Div>
        {this.renderErrors()}
        <p style={{ FontSize: '2em' }}>
          What are your interests? What are your passions? Are you a cat person
          or a dog person? Share anything you want here!
        </p>
        <Form.Field>
          <Div className="field">
            <Div className="control">
              <textarea
                style={{ resize: 'none' }}
                className="textarea"
                type="text"
                name="bio"
                onChange={this.handleChange}
                value={this.state.bio}
              />
            </Div>
          </Div>
        </Form.Field>

        <Form.Field>
          <Div className="control">
            <input
              className="input"
              type="text"
              name="location"
              placeholder="location"
              onChange={this.handleChange}
              value={this.state.location}
            />
          </Div>
        </Form.Field>

        <Div className="columns">
          <Div className="column">
            <FormNextButton className="button is-primary" onClick={this.goBack}>
              Go back
            </FormNextButton>
          </Div>
          <Div className="column">
            <FormSubmitButton
              className="button is-primary is-fullwidth"
              loading={this.props.loading}
            >
              Create Account
            </FormSubmitButton>
          </Div>
        </Div>
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
      </FormSegment>
    )
  }
  render() {
    let form = null
    if (this.state.formStep === 0) {
      form = this.FormSection1()
    }
    if (this.state.formStep === 1) {
      form = this.FormSection2()
    }
    if (this.state.formStep === 2) {
      form = this.FormSection3()
    }
    const error = this.state.error !== '' || this.props.error !== ''

    return (
      <Div style={{ margin: '0', padding: '0' }} className="columns">
        <ImageDiv className="column is-two-thirds">
          <OverLay>
            <SignUpImg src={productShot} alt="coffee shop" />
            <ImageH1 style={{ fontFamily: 'fabfeltscriptbold' }}>
              Toktumi
            </ImageH1>
            <ImageP>Join The Community</ImageP>
          </OverLay>
        </ImageDiv>
        <Div className="column">
          <Form onSubmit={this.onSubmit} size="large" error={error}>
            {form}
          </Form>
        </Div>
      </Div>
    )
  }
}

export default SignUp1
