/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react';
import { Header, Image } from 'semantic-ui-react';

function LaunchPadItem(props) {
  return (
    <div>
      <Image src={props.imgSrc} centered />
      <Header as="h2" color="blue" textAlign="center">{props.header}</Header>
    </div>
  );
}

export default LaunchPadItem;