/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, MenuItem } from 'semantic-ui-react';
import styled from 'styled-components';
import crypto from 'crypto';

const MenuItemStyled = styled(MenuItem)`
  margin-top: auto !important;
  margin-bottom: auto !important;
`;

const propTypes = {
  email: React.PropTypes.string.isRequired,
  photoSrc: React.PropTypes.string,
};

const defaultProps = {
  photoSrc: null,
};

class CurrentUserMenuItem extends React.Component {
  render() {
    const md5 = crypto.createHash('md5').update(this.props.email).digest('hex');
    const gravatarUrl = `https://gravatar.com/avatar/${md5}?s=200&d=monsterid`;
    return (
      <MenuItemStyled position="right">
        <Link to="/account">
          <Image avatar src={this.props.picture || gravatarUrl} />
          {this.props.email}
        </Link>
      </MenuItemStyled>
    );
  }
}

CurrentUserMenuItem.propTypes = propTypes;
CurrentUserMenuItem.defaultProps = defaultProps;

export default CurrentUserMenuItem;
