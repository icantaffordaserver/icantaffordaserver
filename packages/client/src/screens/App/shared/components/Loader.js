import React from 'react'

import { Loader } from 'semantic-ui-react'

export default () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader active size="massive" />
    </div>
  )
}
