/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react'
import { Segment, Header, Image, Label, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SegmentContainer = styled.div`
  flex-grow: 1;
  min-width: 150px;
  max-width: 250px;
`

const propTypes = {
  imgSrc: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  labelPosition: PropTypes.string,
  labelColor: PropTypes.string,
  labelMessage: PropTypes.string,
  labelIcon: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

const defaultProps = {
  labelMessage: '',
  loading: false,
}

function LaunchPadItem(props) {
  return (
    <Segment
      raised
      padded
      loading={props.loading}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.labelMessage &&
        <Label attached={props.labelPosition} color={props.labelColor}>
          {props.labelIcon && <Icon name={props.labelIcon} />}
          {props.labelMessage}
        </Label>}
      <Image src={props.imgSrc} centered />
      <Header as="h2" color="blue" textAlign="center">{props.header}</Header>
    </Segment>
  )
}

LaunchPadItem.propTypes = propTypes
LaunchPadItem.defaultProps = defaultProps

export default LaunchPadItem
