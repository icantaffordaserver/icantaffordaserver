/**
 * Created by alexandermann on 2017-03-13.
 */
import React from 'react';
import { Container, Segment, Header, Menu, MenuItem } from 'semantic-ui-react';
import styled from 'styled-components';

const ContainerWithStyle = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-bottom: 30px;
    max-width: 1000px !important;
  }
`;

const Panel = styled(Segment)`
  &&& {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 20px;
  }
`;

const TitleItem = styled(MenuItem)`
  flex-grow: 1 !important;
  margin-left: auto;
  margin-right: auto;
  border-width: 0;
`;

const Title = styled(Header)`
  margin: auto !important;
`;

const propTypes = {
  title: React.PropTypes.string,
  leftLinkText: React.PropTypes.string,
  leftLinkClick: React.PropTypes.func,
  rightLinkText: React.PropTypes.string,
  rightLinkClick: React.PropTypes.func,
};

const defaultProps = {
  title: null,
  leftLinkText: null,
  leftLinkClick: null,
  rightLinkText: null,
  rightLinkClick: null,
};

const DashboardViewDetail = props => (
  <ContainerWithStyle>
    <Menu attached="top">
      {props.leftLinkText &&
        <MenuItem content={props.leftLinkText} onClick={props.leftLinkClick} />}
      {props.title && <TitleItem><Title content={props.title} textAlign="center" /></TitleItem>}
      {props.rightLinkText &&
        <MenuItem position="right" content={props.rightLinkText} onClick={props.rightLinkClick} />}
    </Menu>
    <Panel attached="bottom">
      {props.children}
    </Panel>
  </ContainerWithStyle>
);

DashboardViewDetail.propTypes = propTypes;
DashboardViewDetail.defaultProps = defaultProps;

export default DashboardViewDetail;
