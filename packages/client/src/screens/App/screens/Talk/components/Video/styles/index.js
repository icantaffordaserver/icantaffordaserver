import styled from 'styled-components'

/* Video Controls */

export const VideoControls = styled.div`
  width: 50%;
  display: flex;
  position: fixed;
  background: #c4c4c4;
`

export const VideoPlayer = styled.div`
  height: 720px;
  width: 1280px;
  display: block;
  background: #333;

  & > video {
    transform: rotateY(180deg);
    &:-webkit-full-screen {
      width: 100%;
      height: 100%;
      transform: rotateY(180deg) !important;
    }
  }
`
