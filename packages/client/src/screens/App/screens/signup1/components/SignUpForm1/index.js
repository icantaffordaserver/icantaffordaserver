import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import FormHeaderComponent from './components/FormHeaderComponent'
import InputComponent from './components/InputComponent'
import FormFooterComponent from './components/FormFooterComponent'
import InterestsComponent from './components/InterestsComponent'
import TextareaComponent from './components/TextareaComponent'
import InputLocationComponent from './components/InputLocationComponent'

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
    interests: [''],
    suggestedInterest: '',
    tags: [],
    error: '',
    showPassword: false,
    formStep: 0,
  }

  onSubmit = (event, data) => {
    event.preventDefault() // prevent page reload

    this.setState({ error: '' }) // clear any old errors
    const {
      firstName,
      lastName,
      email,
      password,
      birthday,
      bio,
      location,
      interests,
      suggestedInterest,
    } = this.state

    const signUpErrors = validateSignUp(this.state)
    if (typeof signUpErrors === 'string') {
      // if validate sign up returns string we have an error
      this.setState({
        error: signUpErrors,
      })
      return
    }
    this.props.onSubmit({
      firstName,
      lastName,
      email,
      password,
      birthday,
      bio,
      location,
    })
  }
  getInterestsData = () => {
    const data = {
      data: {
        allConnectionInterests: [
          {
            name: 'interest1',
          },
          {
            name: 'interest2',
          },
          {
            name: 'interest3',
          },
          {
            name: 'interest4',
          },
          {
            name: 'interest5',
          },
          {
            name: 'interest6',
          },
          {
            name: 'interest7',
          },
          {
            name: 'interest8',
          },
        ],
      },
    }
    return data
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
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLocationChange = event => {
    this.setState({ location: event })
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
      <div>
        {this.renderErrors()}
        <Div className="columns">
          <Div className="column is-half">
            <Form.Field>
              <InputComponent
                name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                handleChange={this.handleChange.bind(this)}
              />
            </Form.Field>
          </Div>
          <Div className="column is-half">
            <Form.Field>
              <InputComponent
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                handleChange={this.handleChange.bind(this)}
              />
            </Form.Field>
          </Div>
        </Div>
        <Form.Field>
          <InputComponent
            name="email"
            placeholder="Email"
            value={this.state.email}
            handleChange={this.handleChange.bind(this)}
          />
        </Form.Field>

        <Div className="field">
          <InputComponent
            type={this.state.showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={this.state.password}
            handleChange={this.handleChange.bind(this)}
          />
          <span>&nbsp;&nbsp;</span>
          <Checkbox onClick={this.showHidePass} label="Show password" />
        </Div>
        <Form.Field>
          <InputComponent
            name="birthday"
            placeholder="DD/MM/YYYY"
            value={this.state.birthday}
            handleChange={this.handleChange.bind(this)}
          />
        </Form.Field>

        <Div className="columns">
          <Div className="column">
            <FormNextButton
              className="button is-primary is"
              onClick={this.getNextStep}
            >
              Select your interests!
            </FormNextButton>
          </Div>
        </Div>
        <FormFooterComponent />
      </div>
    )
  }

  FormSection2() {
    const interestsData = this.getInterestsData()

    return (
      <div>
        {this.renderErrors()}
        <Form.Field>
          <InterestsComponent
            getInterests={interestsData}
            addInterest={this.addInterest.bind(this)}
          />
        </Form.Field>
        <Form.Field>
          <Div className="column">
            <TagsInput
              value={this.state.tags}
              onChange={this.handleTagChange}
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
            <FormNextButton
              className="button is-primary"
              onClick={this.getNextStep}
            >
              Tell us a bit more!
            </FormNextButton>
          </Div>
        </Div>
        <FormFooterComponent />
      </div>
    )
  }
  FormSection3() {
    return (
      <div>
        {this.renderErrors()}
        <GenericCenterP style={{ FontSize: '2em', paddingTop: '4%' }}>
          What are your interests? What are your passions? Are you a cat person
          or a dog person? Share anything you want here!
        </GenericCenterP>
        <Form.Field>
          <TextareaComponent
            name="bio"
            value={this.state.bio}
            handleChange={this.handleChange.bind(this)}
          />
        </Form.Field>

        <Form.Field>
          <InputLocationComponent
            location={this.state.location}
            handleLocationChange={this.handleLocationChange.bind(this)}
            name="location"
          />
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
        <FormFooterComponent />
      </div>
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
            <FormSegment padded>
              <FormHeaderComponent
                title="SIGN UP"
                headerOne="Account Info"
                headerTwo="Select Interests"
                headerThree="Personal Bio"
              />
              {form}
            </FormSegment>
          </Form>
        </Div>
      </Div>
    )
  }
}

export default SignUp1
