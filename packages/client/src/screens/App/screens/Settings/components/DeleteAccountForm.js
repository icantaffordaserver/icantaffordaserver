import React from 'react'

import { Input } from '../../../styles/Inputs/index.js'

import { DeleteButton } from '../style'
import { Flex, Box } from 'grid-styled'
import ReactModal from 'react-modal'
import { ProfileSection } from '../../Profile/style'

const Modal = Box.extend`
  margin: auto auto;
`
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    overflow: 'hidden',
    outline: 'none',
    padding: '20px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

function DeleteAccountForm({
  deleteAccount,
  feedback,
  handleInputChange,
  handleDelete,
  handleCloseModal,
  handleOpenModal,
  showModal,
}) {
  return (
    <div>
      <Box width={1 / 3} ml="33%">
        <DeleteButton
          color="#EB5757"
          inverseColor="white"
          onClick={handleOpenModal}
        >
          Delete Account
        </DeleteButton>
      </Box>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <ProfileSection>
          <Flex wrap>
            <Modal>
              <Box width={3 / 4} p={2} ml="12.5%">
                <Box width={1} py={2}>
                  We’re sad to see you go! Before leaving, it would be amazing
                  if you could leave some feedback as to why you decided to
                  delete your account.
                </Box>
                <Input
                  value={feedback}
                  name="feedback"
                  onChange={handleInputChange}
                />
              </Box>
              <Box width={3 / 4} p={2} ml="12.5%">
                <Box width={1} py={2}>
                  Type “GOODBYE” below to delete your account permenently
                </Box>
                <Input
                  value={deleteAccount}
                  name="deleteAccount"
                  onChange={handleInputChange}
                />
              </Box>
              <Box width={1 / 3} py={2} ml="33%">
                <DeleteButton
                  color="#EB5757"
                  inverseColor="white"
                  onClick={handleDelete}
                >
                  Delete Account
                </DeleteButton>
              </Box>
            </Modal>
          </Flex>
        </ProfileSection>
      </ReactModal>
    </div>
  )
}

export default DeleteAccountForm
