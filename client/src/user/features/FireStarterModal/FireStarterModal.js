/**
 * Created by alexandermann on 2017-03-24.
 */
import React from 'react';
import { Modal, ModalHeader, ModalActions, Header, Input, Button, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import isURL from 'validator/lib/isURL';

const VideoContainer = styled.div`
  display: flex;
  padding: 0;
  height: 450px;
`;

const FireStarterMessage = styled(Header)`
  margin: auto !important;
`;

const ModalActionsStyled = styled(ModalActions)`
  display: flex;
`;

const InputFloatedLeft = styled(Input)`
  flex-grow: 1;
  float: left;
`;

const EmbedStyled = styled.iframe`
  flex-grow: 1;
  border-width: 0;
`;

class FireStarterModal extends React.Component {
  static propTypes = {
    modalOpen: React.PropTypes.bool.isRequired,
    fireStarterSrc: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };

  state = {
    suggestion: '',
    error: false,
    submitted: false,
  };

  handleChange = event => {
    this.setState({ suggestion: event.target.value });
  };

  handleSubmit = async () => {
    if (!isURL(this.state.suggestion)) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      await this.props.onSubmit(this.state.suggestion);
      this.setState({ submitted: true });
      await setTimeout(() => this.setState({ submitted: false, suggestion: '' }), 2000); // clear after 2 seconds
    }
  };

  render() {
    const { modalOpen, loading } = this.props;
    const { error, submitted, suggestion } = this.state;
    const fireStarterSrc = `https://www.youtube.com/embed/${this.props.fireStarterSrc}`;
    return (
      <Modal open={modalOpen}>
        {error && <Label color="red" attached="bottom left">Please enter a valid url</Label>}
        <ModalHeader content="Fire Starter" />
        <VideoContainer>
          {fireStarterSrc
            ? <EmbedStyled id="ytplayer" type="text/html" src={fireStarterSrc} frameborder="0" />
            : <FireStarterMessage
                content="Fire Starter is not available yet. Check back when you have a connection!"
              />}
        </VideoContainer>
        <ModalActionsStyled>
          <InputFloatedLeft
            action={{
              color: 'green',
              labelPosition: 'right',
              icon: submitted ? 'checkmark' : 'record',
              content: submitted ? 'Submitted' : 'Suggest',
              onClick: this.handleSubmit,
              loading,
              disabled: submitted,
            }}
            placeholder="Suggest your own video, enter url here"
            onChange={this.handleChange}
            value={suggestion}
          />
          <Button color="blue" content="Return to Dashboard" onClick={this.props.onClose} />
        </ModalActionsStyled>
      </Modal>
    );
  }
}

export default FireStarterModal;
