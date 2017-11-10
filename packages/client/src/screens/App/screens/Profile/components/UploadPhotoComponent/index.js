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
  ButtonText,
  TextLink,
} from '../../../../styles'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'

import ReactModal from 'react-modal'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { Page, Row, Column } from 'hedron'

class UploadPhotoComponent extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      files: [],
      display: 'inline',
      crop: {
        x: 0,
        y: 0,
        aspect: 1,
      },
      height: 0,
      width: 0,
      pixelCrop: {},
      naturalHeight: 0,
      naturalWidth: 0,
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  onImageLoaded = image => {
    this.setState(
      {
        crop: makeAspectCrop(
          {
            x: 50,
            y: 50,
            aspect: 1,
            width: 20,
          },
          image.naturalWidth / image.naturalHeight,
        ),
        image,
      },
      () =>
        this.setState(
          {
            naturalHeight: image.naturalHeight,
            naturalWidth: image.naturalWidth,
          },
          () =>
            console.log(
              'image: ',
              this.state.naturalHeight,
              this.state.naturalWidth,
            ),
        ),
    )
  }

  onCropComplete = (crop, pixelCrop) => {
    this.setState({ pixelCrop }, () =>
      console.log('onCropComplete, pixelCrop:', pixelCrop),
    )
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  handleSave = () => {
    let data = new FormData()

    data.append('file', this.state.files[0])
    data.append('tags', `toktumi`)
    data.append('upload_preset', 'cqovpxkc')
    data.append('api_key', '425252445786336')
    data.append('timestamp', (Date.now() / 1000) | 0)

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    axios
      .post('https://api.cloudinary.com/v1_1/toktumi/image/upload', data, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then(response => {
        const data = response.data
        const fileURL = data.secure_url
        console.log('data : ', data, 'fileURL: ', fileURL)
        return data
      })
      .then(data => {
        let url =
          'https://res.cloudinary.com/toktumi/image/upload/' +
          'c_crop,h_' +
          this.state.pixelCrop.height +
          ',w_' +
          this.state.pixelCrop.width +
          ',x_' +
          this.state.pixelCrop.x +
          ',y_' +
          this.state.pixelCrop.y +
          '/v' +
          data.version +
          '/' +
          data.public_id +
          '.png'
        console.log(url)
        return this.props.mutate({
          variables: {
            id: this.props.data.user.id,
            profilePhotoUrl: url,
          },
        })
      })
      .then(() => this.setState({ showModal: false }))
      .catch(err => console.error(err))
  }

  render() {
    let dropzoneRef
    return (
      <div>
        <button onClick={this.handleOpenModal}>Upload/Crop Photo!</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Inline Styles Modal Example"
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            content: {
              width: '60%',
              height: '60%',
              margin: 'auto auto',
            },
          }}
        >
          <Page fluid>
            <Row>
              <Column>
                <h4>Upload Profile Photo!</h4>
                <p>
                  <i>
                    Upload a picture of yourself doing your favourite hobby or
                    one of your proudest accomplishments!
                  </i>
                </p>
              </Column>
            </Row>
            <Row
              style={
                this.state.naturalHeight > 255 && this.state.naturalWidth > 255
                  ? { display: 'inline', marginBottom: '20px' }
                  : { display: 'none' }
              }
            >
              <Column>
                <button
                  style={{
                    backgroundColor: '#E0E0E0',
                    margin: '0 auto',
                    height: '3vh',
                    width: '10vw',
                  }}
                  onClick={() => {
                    dropzoneRef.open()
                  }}
                >
                  <ButtonText>Choose Photo</ButtonText>
                </button>
              </Column>
            </Row>
            <Row style={{ display: this.state.display }}>
              <Column xs={12} md={12}>
                <Dropzone
                  ref={node => {
                    dropzoneRef = node
                  }}
                  style={{
                    width: '100%',
                    height: '32vh',
                    borderWidth: '2px',
                    borderColor: 'rgb(102, 102, 102)',
                    borderStyle: 'dashed',
                    borderRadius: '5px',
                    //margin: '20px 5vw 20px 5vw'
                  }}
                  accept="image/*"
                  onDrop={(accepted, rejected) => {
                    this.setState({ files: accepted, display: 'none' }, () =>
                      console.log(accepted),
                    )
                  }}
                >
                  <p style={{ margin: '20px' }}>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                </Dropzone>
              </Column>
            </Row>
            <CropBox
              file={this.state.files[0]}
              crop={this.state.crop}
              onChange={this.onCropChange}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              pixelCrop={this.state.pixelCrop}
              naturalHeight={this.state.naturalHeight}
              naturalWidth={this.state.naturalWidth}
            />
            <Row>
              <Column mdShift={3} md={6}>
                <button
                  style={{
                    backgroundColor: '#27AE60',
                    margin: '0 auto',
                    height: '6vh',
                    width: '25vw',
                  }}
                  onClick={this.handleSave}
                >
                  <ButtonText style={{ color: 'white' }}>
                    Confirm Changes
                  </ButtonText>
                </button>
              </Column>
            </Row>
          </Page>
        </ReactModal>
      </div>
    )
  }
}

const CropBox = props => {
  console.log('CropBox props: ', props)
  if (props.file) {
    return (
      <div>
        <Row
          style={
            props.naturalHeight > 255 && props.naturalWidth > 255
              ? { display: 'inline' }
              : { display: 'none' }
          }
        >
          <Column>
            <h4>Introduction Preview: </h4>
            <p>
              <i>
                This is what your introduction card will look like to others:
              </i>
            </p>
            <ReactCrop
              src={props.file.preview}
              crop={props.crop}
              onChange={props.onChange}
              onImageLoaded={props.onImageLoaded}
              onComplete={props.onComplete}
            />
          </Column>
        </Row>
        <Row
          style={
            props.naturalHeight < 256 || props.naturalWidth < 256
              ? { display: 'inline' }
              : { display: 'none' }
          }
        >
          <Column>
            <p>Please upload an image that is atleast 256x256 px.</p>
          </Column>
        </Row>
      </div>
    )
  } else return <div />
}

export default compose(
  withApollo,
  withRouter,
  graphql(currentUserQuery),
  graphql(updateUserMutation),
)(UploadPhotoComponent)
