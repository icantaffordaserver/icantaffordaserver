/**
 * Created by alexandermann on 2017-04-03.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import FireStarterModal from './FireStarterModal';
import createFireStarterSuggestionMutation from '../../graphql/createFireStarterSuggestionMutation';
import currentUserQuery from '../../../graphql/user/currentUserQuery';

const propTypes = {
  modalOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  mutate: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class FireStarterModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = async suggestion => {
    const { id } = this.props.data.viewer.user;
    try {
      this.setState({ loading: true });
      await this.props.mutate({ variables: { input: { userId: id, url: suggestion } } });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { modalOpen, onClose } = this.props;
    return (
      <FireStarterModal
        modalOpen={modalOpen}
        onClose={onClose}
        onSubmit={this.handleSubmit}
        loading={this.state.loading}
      />
    );
  }
}

FireStarterModalContainer.propTypes = propTypes;
FireStarterModalContainer.defaultProps = defaultProps;

export default compose(graphql(currentUserQuery), graphql(createFireStarterSuggestionMutation))(
  FireStarterModalContainer,
);
