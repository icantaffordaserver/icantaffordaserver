import React, { Component } from 'react'

import {
  Button,
  Content,
  ColumnContainer,
  RowContainer,
  Section,
  Card,
  Title,
  Subheading,
  Tag,
  Text,
  TextLink,
  TextArea,
  Input,
} from '../../../styles'

import ConfirmAndCancel from './shared/ConfirmAndCancel'

import { Flex, Box, Grid } from 'grid-styled'
import { graphql, compose, withApollo } from 'react-apollo'

import currentUserQuery from '../../../shared/graphql/queries/currentUserQuery'

class ChooseInterests extends Component {
  state = {
    selectedTags: [],
    suggestion: '',
  }

  changeColor = id => {
    let index = this.state.selectedTags.indexOf(id)
    console.log('index: ', index)
    if (index === -1) {
      this.setState({ selectedTags: [...this.state.selectedTags, id] }, () =>
        console.log(this.state),
      )
    } else {
      const selectedTags = this.state.selectedTags
      this.setState(
        {
          selectedTags: [
            ...selectedTags.slice(0, index),
            ...selectedTags.slice(index + 1),
          ],
        },
        () => console.log(this.state),
      )
    }
  }

  handleChange = e => {
    if (e.target.value) {
      this.setState({ suggestion: e.target.value })
    }
  }

  handleSubmit = () => {
    let { props } = this.props
    console.log(this.props, ' Choose interests')
    props
      .createConnectionInterest({
        variables: {
          name: this.state.suggestion,
        },
      })
      .then(() => this.setState({ suggestion: '' }))
      .then(() => console.log(this.state))
      .catch(err => console.error(err))
  }

  handleClear = () =>
    this.setState({ selectedTags: [] }, () => this.props.handleEdit())

  handleConfirm = () => {
    let { props } = this.props
    let connectionInterestsIds = this.state.selectedTags
    props
      .updateUser({
        variables: {
          id: props.user.id,
          connectionInterestsIds,
        },
        refetchQueries: [
          {
            query: currentUserQuery,
          },
        ],
      })
      .then(() =>
        this.setState({ selectedTags: [] }, () => this.props.handleEdit()),
      )
      .then(() => console.log(this.state))
      .catch(err => console.error(err))
  }

  componentDidMount() {
    const { connectionInterests } = this.props.data.user
    const { selectedTags } = this.state

    let interestIds = connectionInterests.map(interest => interest.id)
    this.setState({ selectedTags: interestIds })
  }

  render() {
    const { interests } = this.props
    const { selectedTags } = this.state

    return (
      <div style={{ marginLeft: '10px', marginTop: '20px' }}>
        <p>
          Choose your interests:
          <br />
          <i>Multiple interests can be selected.</i>
        </p>
        <Flex width={1} wrap>
          {interests.map((x, i) => (
            <Box width={1 / 7} key={x.id}>
              <div
                style={{
                  justifyContent: 'space-between',
                }}
                onClick={() => this.changeColor(x.id)}
              >
                <Tag isSelected={selectedTags.includes(x.id)}>#{x.name}</Tag>
              </div>
            </Box>
          ))}
        </Flex>
        <Flex wrap width={1}>
          <Box width={1 / 3} ml="8%" pr={2}>
            <p>
              Create your own interest:
              <br />
              <i>
                This will show up in your profile, and if popular enought, we
                may feature it in the future!
              </i>
            </p>
          </Box>
          <Box width={1 / 4} pr={2}>
            <Input
              value={this.state.suggestion}
              type="text"
              onChange={this.handleChange}
            />
          </Box>
          <Box width={1 / 4}>
            <Button
              fontSize={'small'}
              noMargin
              color="accept"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Flex>
        <ConfirmAndCancel
          handleSave={this.handleConfirm}
          handleCancel={this.handleClear}
        />
      </div>
    )
  }
}

export default compose(graphql(currentUserQuery))(ChooseInterests)
