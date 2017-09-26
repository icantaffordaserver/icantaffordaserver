import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import Dropzone from 'react-dropzone'

import axios from 'axios'
import { Message } from 'semantic-ui-react'

import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormButton,
} from '../../../../styles/Forms.js'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'

class SettingsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.onFileUpload = this.onFileUpload.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // Set user id when recieved
    if (!nextProps.data.loading && nextProps.data.user) {
      this.setState({ id: nextProps.data.user.id })
    }
  }

  handleChange(e) {
    if (e.target.value) {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
    //this.props.history.push('/profile')
  }

  onFileUpload(files) {
    let data = new FormData()
    data.append('data', files[0])
    axios
      .post('https://api.graph.cool/file/v1/toktumi-dev', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        const { id, url } = response.data
        this.setState({ profilePhoto: id, imageUrl: url })
      })
      .catch(err => console.error(err))
  }

  renderMessages() {
    if (this.props.error) return <Message>An error occured</Message>
    if (this.props.success) return <Message>Successful!</Message>
  }
  render() {
    return (
      <div style={{ width: '60%', margin: 'auto' }}>
        <Form onSubmit={e => this.onSubmit(e)}>
          {this.renderMessages()}
          <FormGroup>
            <FormLabel htmlFor="firstName">First Name:</FormLabel>
            <FormInput
              name="firstName"
              type="text"
              placeholder={this.props.user.firstName}
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="lastName">Last Name:</FormLabel>
            <FormInput
              name="lastName"
              type="text"
              placeholder={this.props.user.lastName}
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <FormInput
              name="email"
              type="text"
              placeholder={this.props.user.email}
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="bio">Bio:</FormLabel>
            <FormTextArea
              maxLength="250"
              name="bio"
              placeholder={this.props.user.bio}
              onChange={e => this.handleChange(e)}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Profile Photo:</FormLabel>
            {!this.state.imageId && (
              <Dropzone
                onDrop={this.onFileUpload}
                accept="image/*"
                multiple={false}
                style={{
                  display: 'flex',
                  width: 'fill-available',
                  padding: '10px',
                  border: 'solid 1px lightgray',
                  borderRadius: '5px',
                  height: '250px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2em',
                  color: 'lightgray',
                }}
              >
                Click or drag and drop an image.
              </Dropzone>
            )}
          </FormGroup>

          <FormButton loading={this.props.loading}>Submit</FormButton>
        </Form>
      </div>
    )
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  SettingsComponent,
)
