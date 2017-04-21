/**
 * Created by alexandermann on 2017-03-23.
 */
import React from 'react'
import { Header } from 'semantic-ui-react'
import styled from 'styled-components'

const View = styled.div`
  flex-grow: 1;
  padding: 20px;
`

class ConnectionNotCompletedYetView extends React.Component {
  render() {
    return (
      <View>
        <Header
          textAlign="center"
          content="You have not had this conversation yet"
        />
      </View>
    )
  }
}

export default ConnectionNotCompletedYetView
