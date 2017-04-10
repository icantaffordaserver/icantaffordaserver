/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, MenuItem } from 'semantic-ui-react';
import styled from 'styled-components';

import { generateGravatarUrl } from '../helpers';

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
    const { photoSrc, email } = this.props;
    const gravatarUrl = generateGravatarUrl(email);
    return (
      <MenuItemStyled position="right">
        <Link to="/account">
          <Image avatar src={photoSrc || gravatarUrl} />
          {email}
        </Link>
      </MenuItemStyled>
    );
  }
}

CurrentUserMenuItem.propTypes = propTypes;
CurrentUserMenuItem.defaultProps = defaultProps;

export default CurrentUserMenuItem;
