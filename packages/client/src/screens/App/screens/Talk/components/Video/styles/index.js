import styled from 'styled-components'

/* Video Controls */

export const ControlsWrapper = styled.div`
  position: absolute;
  bottom: -5px;
  right: 1em;
  z-index: 1;
  height: 250px;
  width: 250px;
  border-radius: 50%;
`
export const Controls = styled.div`
  position: relative;
  height: 250px;
  width: 250px;
  border-radius: 50%;
  & > img {
    transition: all 0.25s ease;
    position: absolute;
    bottom: -75px;
    right: 0;
  }
  &:hover {
    & > img {
      bottom: 0;
    }
    & > :nth-child(1) {
      transform: translateX(-122px) translateY(-21px) !important;
      opacity: 1;
    }
    & > :nth-child(2) {
      transform: translateX(-81px) translateY(-91px) !important;
      opacity: 1;
    }
    & > :nth-child(3) {
      transform: translateX(-4px) translateY(-105px) !important;
      opacity: 1;
    }
    & > :nth-child(4) {
      transform: translateX(59px) translateY(-60px) !important;
      opacity: 1;
    }

    & > :nth-child(5) {
      transform: translateX(-95px) translateY(55px) !important;
      opacity: 1;
    }
  }
`
export const Control = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 35%;
  right: 30%;
  height: 50px;
  width: 50px;
  opacity: 0;
  background: #56ccf2;
  border-radius: 50%;
  transition: all 0.25s ease;
  transform-origin: bottom right;
  transform: translateX(50%) translateY(50%);
  cursor: pointer;
  & > i {
    z-index: 2 !important;
    color: #fff;
    margin: 0 !important;
  }
`

export const VideoPlayer = styled.div`
  position: relative;
  height: 94vh;
  width: 100vw;
  background: #333;
  display: flex;

  & > video {
    height: 100%;
    transform: rotateY(180deg);
    margin: 0 auto !important;
  }
`

export const ConversationPrompt = styled.div`
  transition: all 0.25s ease;

  background: #2d9cdb;
  height: 50px;
  min-width: 400px;
  position: absolute;
  bottom: 1em;
  left: -350px;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  padding-right: 15%;
  & > p {
    font-size: 1.25em;
    color: #fff;
    margin: auto;
  }
  & > i {
    position: absolute;
    bottom: 0px;
    right: -5px;
    background: #2f80ed;
    color: #fff;
    height: 100% !important;
    width: 15% !important;
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;
    padding: 3% 0 0 2%;
  }

  &:hover {
    left: 0;
  }
`
