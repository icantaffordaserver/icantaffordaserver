import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import { lighten } from 'polished'
import styled from 'styled-components'

const ContextButton = styled.h3`
  &:hover {
    cursor: pointer;
    color: white;
  }
`

class ContextView extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    leftButton: PropTypes.shape({
      title: PropTypes.string,
      handler: PropTypes.func,
    }),
    rightButton: PropTypes.shape({
      title: PropTypes.string,
      handler: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
  }
  static defaultProps = {
    leftButton: {},
    rightButton: {},
  }

  render() {
    const { title, leftButton, rightButton } = this.props
    return (
      <div
        style={{
          margin: 'auto',
          border: '2px solid black',
        }}
      >
        <Container>
          <div>
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
              <div style={{ flex: 1, marginLeft: '10px' }}>
                <div style={{ display: 'flex' }}>
                  {leftButton.title &&
                    <ContextButton left onClick={leftButton.handler}>
                      {leftButton.title}
                    </ContextButton>}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{ textAlign: 'center' }}>
                  {title}
                </h1>
              </div>
              <div style={{ flex: 1, marginRight: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {rightButton.title &&
                    <ContextButton right onClick={rightButton.handler}>
                      {rightButton.title}
                    </ContextButton>}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
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
