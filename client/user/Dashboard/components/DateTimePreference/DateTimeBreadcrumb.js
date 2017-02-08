/**
 * Created by alexandermann on 2017-02-07.
 */
import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

class DateTimeBreadcrumb extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.currentDay !== null ?
      (
        <Breadcrumb size="huge">
          <Breadcrumb.Section link active onClick={this.props.chooseDay}>Time Preference</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section>{this.props.currentDay}</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section>Choose Times</Breadcrumb.Section>
        </Breadcrumb>
      ) : (
        <Breadcrumb size="huge">
          <Breadcrumb.Section link active>Time Preference</Breadcrumb.Section>
        </Breadcrumb>
      );
  }
}

export default DateTimeBreadcrumb;
