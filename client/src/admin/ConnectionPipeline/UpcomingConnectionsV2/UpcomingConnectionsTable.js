/**
 * Created by alexandermann on 2017-04-13.
 */
import React from 'react';
import { Table } from 'antd';

import 'antd/lib/table/style/css';
import moment from 'moment';

const { Column } = Table;

function sortByDate(a, b) {
  return moment(a.connectionTime).valueOf() - moment(b.connectionTime).valueOf();
}

class UpcomingConnectionsTable extends React.Component {
  render() {
    return (
      <Table dataSource={this.props.allConnections} rowKey={record => record.id}>
        <Column
          title="Connection Date"
          key="connectionTime"
          sorter={sortByDate}
          render={text => moment(text.connectionTime).format('MMM Do, h:mm a')}
        />
        <Column
          title="User 1"
          key="user1"
          render={text =>
            `${text.participants.edges[0].node.firstName} ${text.participants.edges[0].node.lastName}`}
        />
        <Column
          title="User 2"
          key="user2"
          render={text =>
            `${text.participants.edges[1].node.firstName} ${text.participants.edges[1].node.lastName}`}
        />
        <Column
          title="Matched by"
          key="matchedBy"
          render={text => `${text.matchedBy.firstName} ${text.matchedBy.lastName}`}
        />
        <Column title="Video Chat Link" key="videoChatLink" render={text => 'Link goes here'} />
      </Table>
    );
  }
}

export default UpcomingConnectionsTable;
