import React from 'react'

export default props => {
  return <li>{`${props.author}: ${props.message}`}</li>
}
