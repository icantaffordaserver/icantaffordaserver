/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import EditProfileForm from '../components/EditProfileForm'

import uploadProfileImg from '../helpers/uploadProfileImg'
import currentUserQuery from '../../../../../../../shared/graphql/queries/currentUserQuery'
import updateUserMutation from '../../../../../../../shared/graphql/mutations/updateUserMutation'


class EditProfileFormContainer extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    doneEditing: PropTypes.func.isRequired,
  }
  state = {
    loading: false,
  }

  handleSubmit = async ({ firstName, lastName, gender, location, bio }, droppedPhoto) => {
    try {
      const { id } = this.props.data.viewer.user
      this.setState({ loading: true })
      if (droppedPhoto) {
        await Promise.all([
          this.props.mutate({
            variables: { input: { id, firstName, lastName, gender, location, bio } },
            refetchQueries: [{ query: currentUserQuery }],
          }),
          uploadProfileImg(droppedPhoto, id, firstName, lastName),
        ])
        this.props.doneEditing()
      } else {
        await this.props.mutate({
          variables: { input: { id, firstName, lastName, gender, location, bio } },
          refetchQueries: [{ query: currentUserQuery }],
        })
        this.props.doneEditing()
      }
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  render() {
    if (this.props.data.loading) return null

    const { loading } = this.state
    return (
      <EditProfileForm
        user={this.props.data.viewer.user}
        loading={loading}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default compose(graphql(currentUserQuery), graphql(updateUserMutation))(
  EditProfileFormContainer,
)
