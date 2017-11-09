import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import Dropzone from 'react-dropzone'

import axios from 'axios'
import { Message, Modal } from 'semantic-ui-react'

import {
  ColumnContainer,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button,
  TextLink,
} from '../../../../styles'

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
      <Modal
        trigger={
          <TextLink to="" onClick={this.props.open}>
            Edit profile
          </TextLink>
        }
        basic
        open={this.props.editing}
        onClose={this.props.open}
      >
        <ColumnContainer white>
          <Form onSubmit={e => this.onSubmit(e)}>
            {this.renderMessages()}
            <FormGroup>
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                name="firstName"
                type="text"
                placeholder={this.props.user.firstName}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                name="lastName"
                type="text"
                placeholder={this.props.user.lastName}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email:</Label>
              <Input
                name="email"
                type="text"
                placeholder={this.props.user.email}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="bio">Bio:</Label>
              <TextArea
                maxLength="250"
                name="bio"
                placeholder={this.props.user.bio}
                onChange={e => this.handleChange(e)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Profile Photo:</Label>
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

            <Button
              className={this.props.className ? this.props.className : ''}
              loading={this.props.loading}
            >
              Submit
            </Button>
          </Form>
        </ColumnContainer>
      </Modal>
    )
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  SettingsComponent,
)
