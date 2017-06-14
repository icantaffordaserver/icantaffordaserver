import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import { lighten } from 'polished'

class ContextView extends React.Component {
  static propTypes = {}
  static defaultProps = {}

  render() {
    return (
      <div style={{ margin: 'auto' }}>
        <Container>
          <div style={{ border: '5px solid black' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '55px',
                backgroundColor: lighten(0.1, '#FF7F50'),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1>Title</h1>
            </div>
            <div
              style={{
                padding: '10px',
                backgroundColor: lighten(0.2, '#FF7F50'),
              }}
            >
              {this.props.children}
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default ContextView
