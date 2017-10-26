import React, { Component } from 'react'

import { Modal, Header, Icon, Message, Dropdown } from 'semantic-ui-react'
import {
  Form,
  FormGroup,
  Label,
  TextArea,
  Content,
  Title,
  Button,
} from '../../../../../styles'

class ReportComponent extends Component {
  state = {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    e.preventDefault()

    const reportType = this.state.reportType
    this.props.onSubmit(reportType)
  }

  reportOptions = [
    {
      text: `Report ${this.props.firstName}`,
      value: 'HARASSMENT',
    },
    {
      text: `Service Issue`,
      value: 'SERVICE',
    },
    {
      text: 'Bad Quality',
      value: 'QUALITY',
    },
  ]

  renderMessages() {
    return this.props.error ? (
      <Message warning>An error occured!</Message>
    ) : (
      this.props.success && <Message success>Report Sent!</Message>
    )
  }
  render() {
    return (
      <Modal trigger={<a />} basic>
        <Content>
          <Form onSubmit={this.handleSubmit}>
            <Title>
              <Icon name="send" /> Report
            </Title>
            {this.renderMessages()}
            <FormGroup>
              <Label>Issue</Label>
              <Dropdown
                placeholder="Select an issue"
                fluid
                selection
                name="reportType"
                options={this.reportOptions}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Comment</Label>
              <TextArea
                placeholder="Extra comments."
                onChange={this.props.onChange}
              />
            </FormGroup>

            <Button medium loading={this.props.loading}>
              Submit
            </Button>
          </Form>
        </Content>
      </Modal>
    )
  }
}

export default ReportComponent
