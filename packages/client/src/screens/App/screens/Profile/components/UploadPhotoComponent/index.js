import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import ReactCrop, { makeAspectCrop } from 'react-image-crop' // eslint-disable-line
import ReactModal from 'react-modal'
import 'react-image-crop/dist/ReactCrop.css'
import { Flex, Box } from 'grid-styled'
import SVG from 'react-inlinesvg'

import EditIcon from '../../../../../../assets/icons/icon.svg'

import { TrophyColorPicker } from '../../style'

import ConfirmAndCancel from '../shared/ConfirmAndCancel'

import currentUserQuery from '../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../shared/graphql/mutations/updateUserMutation'

class UploadPhotoComponent extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      files: [],
      uploadBoxDisplay: 'inline',
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
      topColor: '',
      bottomColor: '',
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
        this.setState({
          naturalHeight: image.naturalHeight,
          naturalWidth: image.naturalWidth,
        }),
    )
  }

  onCropComplete = (crop, pixelCrop) => {
    this.setState({ pixelCrop })
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  handleSave = () => {
    let gradientColors = {
      top: this.state.topColor,
      bottom: this.state.bottomColor,
    }

    if (this.state.files.length > 0) {
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
          return this.props.mutate({
            variables: {
              id: this.props.data.user.id,
              profilePhotoUrl: url,
              gradientColors,
            },
            refetchQueries: [
              {
                query: currentUserQuery,
              },
            ],
          })
        })
        .then(() => this.setState({ showModal: false }))
        .catch(err => console.error(err))
    } else {
      this.props
        .mutate({
          variables: {
            id: this.props.data.user.id,
            gradientColors,
          },
          refetchQueries: [
            {
              query: currentUserQuery,
            },
          ],
        })
        .then(() => this.setState({ showModal: false }))
        .catch(err => console.error(err))
    }
  }
  handleCancel = () => this.setState({ showModal: false })

  handleSelect = (topColor, bottomColor) =>
    this.setState({ topColor, bottomColor })

  componentDidMount = () => {
    const { gradientColors } = this.props.data.user
    if (gradientColors) {
      this.setState({
        topColor: gradientColors.top,
        bottomColor: gradientColors.bottom,
      })
    } else {
      this.setState({ topColor: '#F9A0AC', bottomColor: '#F9F9F9' })
    }
  }

  render() {
    let dropzoneRef
    let gradientChoices = [
      { top: '#F9A0AC', bottom: '#F9F9F9' },
      { top: '#7F00FF', bottom: '#E100FF' },
      { top: '#667DB6', bottom: '#0082C8' },
      { top: '#5A3F37', bottom: '#2C7744' },
      { top: '#FF9966', bottom: '#FF5E62' },
      { top: '#ACB6E5', bottom: '#ACE5DE' },
      { top: '#D9A7C7', bottom: '#FFFCDC' },
      { top: '#E1EEC3', bottom: '#F59597' },
      { top: '#00D2FF', bottom: '#928DAB' },
      { top: '#474340', bottom: '#8C8FA3' },
    ]
    const { topColor, bottomColor } = this.state
    return (
      <div>
        <div onClick={this.handleOpenModal}>
          <SVG src={EditIcon} />
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
            content: {
              width: '60%',
              height: '80%',
              margin: 'auto auto',
            },
          }}
        >
          <Flex wrap>
            <Box width={95 / 100} ml="5%">
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
                Upload Picture
              </button>
            </Box>
            <Box
              width={9 / 10}
              ml="5%"
              pt={2}
              style={{ display: this.state.uploadBoxDisplay }}
            >
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
                  this.setState({ files: accepted, uploadBoxDisplay: 'none' })
                }}
              >
                <p style={{ margin: '20px' }}>
                  Drag and drop a picture here, or click Upload Picture above
                </p>
              </Dropzone>
            </Box>
            <Box width={9 / 10} ml="5%">
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
            </Box>
            <Box width={9 / 10} ml="5%" pt={2}>
              <h4>Pick your colour scheme</h4>
            </Box>
            <Flex wrap width={4 / 5} ml="10%" pt={2}>
              {gradientChoices.map(x => (
                <Box width={1 / 5} key={x.top}>
                  <TrophyColorPicker
                    bottomColor={x.bottom}
                    topColor={x.top}
                    isSelected={x.top === topColor && x.bottom === bottomColor}
                    onClick={() => this.handleSelect(x.top, x.bottom)}
                  />
                </Box>
              ))}
            </Flex>
            <ConfirmAndCancel
              handleSave={this.handleSave}
              handleCancel={this.handleCancel}
            />
          </Flex>
        </ReactModal>
      </div>
    )
  }
}

const CropBox = props => {
  if (props.file) {
    return (
      <div
        style={
          props.naturalHeight > 255 && props.naturalWidth > 255
            ? { display: 'inline' }
            : { display: 'none' }
        }
      >
        <h4>Crop your photo below. </h4>
        <ReactCrop
          src={props.file.preview}
          crop={props.crop}
          onChange={props.onChange}
          onImageLoaded={props.onImageLoaded}
          onComplete={props.onComplete}
        />
        <div
          style={
            props.naturalHeight < 256 || props.naturalWidth < 256
              ? { display: 'inline' }
              : { display: 'none' }
          }
        >
          <p>Please upload an image that is atleast 256x256 px.</p>
        </div>
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
