import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import allReportsQuery from '../graphql/queries/allReportsQuery'
import {
  PageContainer,
  TableContainer,
  HeaderRow,
  Header,
  Row,
  RowSection,
  Table,
} from '../styles'

class ReportsPage extends Component {
  state = {}

  render() {
    if (this.props.data.loading) return <div>Loading...</div>
    const { reports } = this.props.data
    return (
      <PageContainer>
        <TableContainer>
          <Table>
            <HeaderRow>
              <Header>ID</Header>
              <Header>Created At</Header>
              <Header>Connection</Header>
              <Header>Reported By</Header>
              <Header>Reported User</Header>
              <Header>Reason</Header>
              <Header>Comment</Header>
            </HeaderRow>
            {reports.map((report, i) => {
              return (
                <Row key={i}>
                  <RowSection>{report.id}</RowSection>
                  <RowSection>{report.createdAt}</RowSection>
                  <RowSection>{report.connection.id}</RowSection>
                  <RowSection>{report.reportedBy.id}</RowSection>
                  <RowSection>
                    {report.reportedUser && report.reportedUser.id}
                  </RowSection>
                  <RowSection>{report.reason}</RowSection>
                  <RowSection>{report.comment}</RowSection>
                </Row>
              )
            })}
          </Table>
        </TableContainer>
      </PageContainer>
    )
  }
}

export default graphql(allReportsQuery)(ReportsPage)
