import React from 'react'

import {
  Button,
  Modal,
  Header,
  Icon,
  Message,
  Dropdown,
} from 'semantic-ui-react'
import {
  Form,
  FormButton,
  FormGroup,
  FormInput,
  FormLabel,
  FormTextArea,
} from '../../../../../styles/Forms'

import ReportIcon from './ReportIconComponent'

export default props => {
  const reportOptions = [
    {
      text: 'Jenny Hess',
      value: '1',
    },
    {
      text: 'Jenny Hess',
      value: '2',
    },
    {
      text: 'Jenny Hess',
      value: '3',
    },
    {
      text: 'Jenny Hess',
      value: '4',
    },
    {
      text: 'Jenny Hess',
      value: '5',
    },
    {
      text: 'Jenny Hess',
      value: '6',
    },
  ]
  return (
    <Modal
      trigger={
        <a>
          <ReportIcon />
        </a>
      }
      basic
    >
      <div
        className="hnbfcgjknm"
        style={{
          marginTop: '20%',
          height: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          color: '#333',
          padding: '2em',
        }}
      >
        <Form>
          <Header
            size={'huge'}
            style={{ textAlign: 'center', marginBottom: '1em' }}
          >
            <Icon name="send" /> Report
          </Header>
          <FormGroup>
            <FormLabel>Issue:</FormLabel>
            <Dropdown
              placeholder="Select an issue"
              fluid
              selection
              options={reportOptions}
            />
          </FormGroup>
          <FormGroup>
            <FormTextArea placeholder="Extra comments." />
          </FormGroup>

          <FormButton loading={props.loading}>Submit</FormButton>
        </Form>
      </div>
    </Modal>
  )
}
