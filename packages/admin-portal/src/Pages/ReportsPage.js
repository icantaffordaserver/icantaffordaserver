import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const allReportsQuery = gql`
  query {
    reports: allConnectionReports {
      id
      createdAt
      connection {
        id
      }
      reportedBy {
        id
      }
      reportedUser {
        id
      }
      reason
      comment
    }
  }
`
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
            {reports.map(report => {
              return (
                <Row>
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
const PageContainer = styled.div`
  margin-left: 32px;
  width: 100%;
`
const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 80px;
  flex-grow: 1;
  width: 95%;
  height: 600px;
  display: flex;
  border: 1px solid #e1e7ed;
  border-radius: 5px;
  background: #f6f7f8;
  overflow-y: scroll;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
`

const Header = styled.div`
  width: 100px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 8px;
  font-size: 0.75em;
  background: #fdfdfd;
  width: 100%;
  min-height: 50px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(22, 23, 26, 0.25);

  :hover {
    box-shadow: 0 2px 12px 0 rgba(22, 23, 26, 0.25);
  }

  &.active {
    background: lightgreen;
  }
`
const RowSection = styled.div`
  display: flex;
  align-items: center;
`
