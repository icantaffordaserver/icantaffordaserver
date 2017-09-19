import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import Dropzone from 'react-dropzone'

import axios from 'axios'

import { SettingsForm, SettingsFormGroup, SettingsFormItem } from './style'

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
    this.props.history.push('/profile')
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
      .then(() => {
        this.props.onSubmit(this.state)
      })
      .catch(err => console.error(err))
  }
  render() {
    return (
      <SettingsForm onSubmit={e => this.onSubmit(e)}>
        <SettingsFormGroup>
          <SettingsFormItem style={{ flex: ' 1 auto', order: '1' }}>
            <label htmlFor="firstName">First Name:</label>
            <input
              name="firstName"
              type="text"
              onChange={e => this.handleChange(e)}
            />
          </SettingsFormItem>
          <SettingsFormItem style={{ flex: ' 1 auto', order: '1' }}>
            <label htmlFor="lastName">Last Name:</label>
            <input
              name="lastName"
              type="text"
              onChange={e => this.handleChange(e)}
            />
          </SettingsFormItem>
          <SettingsFormItem style={{ flex: ' 1 100%', order: '2' }}>
            <label htmlFor="bio">Bio:</label>
            <textarea
              maxLength="250"
              name="bio"
              onChange={e => this.handleChange(e)}
            />
          </SettingsFormItem>

          <SettingsFormItem style={{ flex: ' 1 100%', order: '3' }}>
            {!this.state.imageId && (
              <Dropzone
                onDrop={this.onFileUpload}
                accept="image/*"
                multiple={false}
              >
                <div>Drop an image or click to choose</div>
              </Dropzone>
            )}
          </SettingsFormItem>
        </SettingsFormGroup>
        <input type="submit" />
      </SettingsForm>
    )
  }
}

export default compose(withApollo, withRouter, graphql(currentUserQuery))(
  SettingsComponent,
)
