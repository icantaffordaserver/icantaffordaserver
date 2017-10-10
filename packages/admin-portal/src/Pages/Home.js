import React, { Component } from "react";
import styled from "styled-components";

class Home extends Component {
  render() {
    return (
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Invites</PageTitle>
          <ToggleContainer>
            <Text bold>Pending</Text>
            <Spacer />
            <Text>Accepted</Text>
          </ToggleContainer>
          <Button>Send Invite</Button>
        </HeaderContainer>
        <TableContainer>Hello World</TableContainer>
      </PageContainer>
    );
  }
}

export default Home;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  width: 960px;
  height: 100vh;
  margin-left: 32px;
`;

const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 80px;
  flex-grow: 1;
  width: 960px;
  display: flex;
  border: 1px solid #e1e7ed;
  border-radius: 5px;
  background: #f6f7f8;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-left: 80px;
`;

const PageTitle = styled.h1`margin: 0;`;

const ToggleContainer = styled.div`
  display: flex;
  margin: 0;
  margin-left: auto;
  margin-right: 80px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #90c3ff;
  width: 100px;
  height: 24px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
`;

const Text = styled.h4`
  margin: 0;
  ${props => (props.bold ? "font-weight: bold" : "font-weight: normal")};
  ${props => props.bold && "color: #668CFF"};
  ${props => !props.bold && "cursor: pointer"};
`;

const Spacer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  border-right: 2px solid black;
`;
