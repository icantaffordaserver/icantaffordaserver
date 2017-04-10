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

class CurrentUserMenuItem extends React.Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired,
    photoSrc: React.PropTypes.string,
  };
  static defaultProps = {
    photoSrc: null,
  };

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

export default CurrentUserMenuItem;
