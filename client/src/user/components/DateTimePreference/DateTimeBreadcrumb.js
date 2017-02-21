/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

const propTypes = {
  currentDay: React.PropTypes.string,
  chooseDay: React.PropTypes.func.isRequired,
};

const defaultProps = {
  currentDay: null,
};

function DateTimeBreadcrumb(props) {
  return props.currentDay !== null ?
    (
      <Breadcrumb size="small">
        <Breadcrumb.Section link active onClick={props.chooseDay}>Time
          Preference</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section>{props.currentDay}</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section>Choose Times</Breadcrumb.Section>
      </Breadcrumb>
    ) : (
      <Breadcrumb size="small">
        <Breadcrumb.Section active>Time Preference</Breadcrumb.Section>
      </Breadcrumb>
    );
}

DateTimeBreadcrumb.propTypes = propTypes;
DateTimeBreadcrumb.defaultProps = defaultProps;

export default DateTimeBreadcrumb;
