/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import { Embed } from 'semantic-ui-react';

function Firestarter() {
  const youtubeId = 'EISu_yHpfkk';
  return (
    <Embed
      id={youtubeId}
      source="youtube"
    />
  );
}

export default Firestarter;
