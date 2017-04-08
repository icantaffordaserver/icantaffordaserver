/**
 * Created by alexandermann on 2017-02-19.
 */
import React from 'react';
import VideoCallComponent from './VideoChat';

class VideoEmbedContainer extends React.Component {

  render() {
    return (
      <div>
        <VideoCallComponent
          conversationTimeUTC={'2017-02-19 16:38:23.765'}
          conversationId="hello12345621343"
        />
      </div>
    );
  }
}

export default VideoEmbedContainer;
