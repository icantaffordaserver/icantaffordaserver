import React from 'react'
import { Flex, Box, Grid } from 'grid-styled'
import SVG from 'react-inlinesvg'
import Graphic from './assets/Graphic1.svg'
import { Title, SubTitle, TextLink } from './style'

const FullScreen = Flex.extend`
  width: 100vw;
  height: 100vh;
`
const Modal = Box.extend`
  margin: auto auto;
  background: white;
`

const NotFound404 = () => (
  <FullScreen>
    <Modal width={1 / 2} ml="25%" p={4}>
      <Flex wrap>
        <Box width={1} p={2}>
          <Title>Oops!</Title>
        </Box>
        <Box width={1 / 2} ml="25%" p={2}>
          <SVG src={Graphic} />
        </Box>
        <Box width={1} p={2}>
          <SubTitle>Looks like something went wrong.</SubTitle>
        </Box>
        <Flex width={1} align="center" p={2}>
          <TextLink to="/talk">
            <div
              style={{
                paddingBottom: '10px',
                borderBottom: '1px solid #000',
                display: 'inline-block',
              }}
            >
              Click here to go back to the Launchpad
            </div>
          </TextLink>
        </Flex>
      </Flex>
    </Modal>
  </FullScreen>
)

export default NotFound404
