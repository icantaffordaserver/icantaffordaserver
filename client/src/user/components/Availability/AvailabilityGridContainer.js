/**
 * Created by alexandermann on 2017-03-20.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import AvailabilityComponent from './components/AvailabilityGrid';
import currentUserQuery from '../../../graphql/user/currentUserQuery';
import updateUserMutation from '../../../graphql/account/updateUserMutation';

const propTypes = {
  data: React.PropTypes.object.isRequired,
  mutate: React.PropTypes.func.isRequired,
  history: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class AvailabilityContainer extends React.Component {
  handleSave = async availability => {
    try {
      await this.props.mutate({
        variables: {
          input: {
            id: this.props.data.viewer.user.id,
            availability: { ...availability },
          },
        },
        refetchQueries: [{ query: currentUserQuery }],
      });
      this.props.history.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.props.data.loading) return null;
    const { availability } = this.props.data.viewer.user;

    return (
      <AvailabilityComponent
        onSave={this.handleSave}
        savedAvailability={availability}
        push={this.props.history.push}
      />
    );
  }
}

AvailabilityContainer.propTypes = propTypes;
AvailabilityContainer.defaultProps = defaultProps;

export default compose(graphql(currentUserQuery), graphql(updateUserMutation))(
  AvailabilityContainer,
);
