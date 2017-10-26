import styled from 'styled-components'

/* Video Controls */

export const ControlsWrapper = styled.ul`
  width: 20%;
  display: flex;
  flex-direction: column;
  height: 720px;
  align-items: center;
  background: #c4c4c4;
  list-style: none;
  padding: 0;
`

export const Control = styled.li`
  margin: 0;
  padding: 0;
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
