/**
 * Created by alexandermann on 2017-03-29.
 */
import React from 'react';
import { Image, Reveal, RevealContent, Header, Loader, Dimmer, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

const DropzoneStyled = styled(Dropzone)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SegmentStyled = styled(Segment)`
  margin: 15px auto 15px auto !important;
  padding: 0 !important;
  width: 250px !important;
  height: 250px !important;
`;

const HeaderPadded = styled(Header)`
  padding: 10px !important;
`;

class ProfileImageDropzone extends React.Component {
  static propTypes = {
    onDrop: React.PropTypes.func.isRequired,
    src: React.PropTypes.string,
  };
  static defaultProps = {
    src: '',
  };
  state = {
    error: false,
    message: 'Drop or click to upload a photo',
    blobUrl: this.props.src ? this.props.src : '',
  };

  handleDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ error: false, message: '' }); // clear the error state
    if (rejectedFiles.length > 0) {
      this.setState({
        error: true,
        message: 'Please make sure the file is under 50 kb and is an image',
      });
      return;
    }
    this.setState({ blobUrl: acceptedFiles[0].preview });
    this.props.onDrop(acceptedFiles[0]);
  };

  render() {
    const { error, message, blobUrl } = this.state;
    return (
      <SegmentStyled>
        <DropzoneStyled multiple={false} accept="image/*" onDrop={this.handleDrop} maxSize={50000}>
          {blobUrl === ''
            ? <HeaderPadded as="h2" color={error ? 'red' : 'green'}>{message}</HeaderPadded>
            : <Image src={blobUrl} />}
        </DropzoneStyled>
      </SegmentStyled>
    );
  }
}

export default ProfileImageDropzone;
