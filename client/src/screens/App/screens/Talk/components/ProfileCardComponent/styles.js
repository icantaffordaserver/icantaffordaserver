import styled, { keyframes, css } from 'styled-components'

export const ProfileImage = styled.img`
  height: 75px;
  border-radius: 100px;
`
export const CardHeader = styled.header`
  display: flex;
  flex-flow: row;
  align-content: center;
  align-items: center;
  background: #333;
  color: #fff;
`
export const CardTimer = styled.p`
  width: 100%;
  margin: 0;
  padding-left: calc(0.625em - 1px);
`
export const CloseCardButton = styled.button`
  display: flex;
  font-size: 1rem;
  height: 2.25rem;
  position: relative;
  background: transparent;
  border: none;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  color: #fff;
`
export const TalkButton = styled.button`
  width: 100%;
  padding: 3%;
  border: none;
  background: linear-gradient(180deg, #ff9839 0%, #ff7f50 100%);

  &:hover {
    background: linear-gradient(180deg, #ff7f50 0%, #ff9839 100%);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }
`
export const CardContent = styled.div`
  max-height: 180px;
  text-align: center;
  overflow-y: scroll;
  min-height: 180px;
  &::-webkit-scrollbar {
    display: none;
  }
`
