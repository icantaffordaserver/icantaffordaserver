/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react';
import { Modal, ModalHeader, ModalActions, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import ReviewPreview from './ReviewPreview';
import CreateReflectionView from './CreateReflectionView';
import SubmittedReflectionView from './SubmittedReflectionView';

const ModalContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
  height: 350px;
`;

const HistoryContainer = styled.div`
  width: 225px;
  background: #eeeeee;
  overflow-y: auto;
`;

const propTypes = {
  modalOpen: React.PropTypes.bool.isRequired,
};

const defaultProps = {};

class ReflectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      comment: '',
      activeMatch: null,
    };
  }

  handleRatingClick = rating => {
    this.setState({
      rating,
    });
  };

  handleCommentChange = event => {
    this.setState({
      comment: event.target.value,
    });
  };

  handleSave = () => {
    console.log(this.state.rating, this.state.comment);
  };

  setActiveMatch = id => {
    this.setState({ activeMatch: id });
    console.log(id);
  };

  render() {
    const reflectionCompletedBool = true; // change this with active match data

    return (
      <Modal open={this.props.modalOpen} size="small">
        <ModalHeader content="Reflection" />
        <ModalContentStyled>
          {reflectionCompletedBool
            ? <CreateReflectionView
                rating={this.state.rating}
                onRatingClick={this.handleRatingClick}
                onCommentChange={this.handleCommentChange}
              />
            : <SubmittedReflectionView id={1} />}
          <HistoryContainer>
            <ReviewPreview
              id={1}
              firstName={'Blake'}
              date={'Mar 9, 2018'}
              rating={4}
              completed={true}
              onClick={this.setActiveMatch}
            />
          </HistoryContainer>
        </ModalContentStyled>
        <ModalActions>
          <Button negative content="Cancel" onClick={this.props.onClose} />
          <Button
            positive
            labelPosition="right"
            icon="save"
            content="Save"
            onClick={this.handleSave}
            disabled={this.state.rating === null}
          />
        </ModalActions>
      </Modal>
    );
  }
}

ReflectionModal.propTypes = propTypes;
ReflectionModal.defaultProps = defaultProps;

export default ReflectionModal;
