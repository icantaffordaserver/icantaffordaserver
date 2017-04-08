/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Segment, Header, Image, Label, Icon } from 'semantic-ui-react';

const propTypes = {
  imgSrc: React.PropTypes.string.isRequired,
  header: React.PropTypes.string.isRequired,
  labelPosition: React.PropTypes.string,
  labelColor: React.PropTypes.string,
  labelMessage: React.PropTypes.string,
  labelIcon: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

const defaultProps = {
  labelMessage: '',
  loading: false,
};

function LaunchPadItem(props) {
  return (
    <Segment padded loading={props.loading} disabled={props.disabled} onClick={props.onClick}>
      {props.labelMessage &&
        <Label attached={props.labelPosition} color={props.labelColor}>
          {props.labelIcon && <Icon name={props.labelIcon} />}{props.labelMessage}
        </Label>}
      <Image src={props.imgSrc} centered />
      <Header as="h2" color="blue" textAlign="center">{props.header}</Header>
    </Segment>
  );
}

LaunchPadItem.propTypes = propTypes;
LaunchPadItem.defaultProps = defaultProps;

export default LaunchPadItem;
