import styled from 'styled-components'

export const UpcomingWrapper = styled.div`position: relative;`

export const Upcoming = styled.div`
  width: 100%;
  min-height: 150px;
  background: #333
    url(${props =>
      props.img
        ? props.img
        : 'https://api.adorable.io/avatars/285/abott@adorable.png'})
    no-repeat;
  margin: 1em auto;
  position: relative;
  z-index: 1;
`
export const TalkButton = styled.button`
  position: absolute;
  top: 20px;
  left: -4%;
  width: 15%;
  min-height: 45px;
  color: #333;
  background: linear-gradient(
    90deg,
    #ffe6e8 27.27%,
    rgba(255, 230, 232, 0) 94.21%
  );
  padding: 1% 2%;
  border: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: none;
  &.countdown {
    width: 12%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: linear-gradient(
      90deg,
      #7781c8 27.27%,
      rgba(119, 129, 200, 0) 94.21%
    );
    color: #fff;
  }
`

export const PassButton = styled.button`
  transition: all 0.25s ease-in-out;
  position: absolute;
  right: -2%;
  top: 30px;
  min-height: 50px !important;
  padding: 1% 2%;
  width: 15%;
  background: crimson;
  border: none;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  color: #fff;
  & > p {
    color: transparent;
    text-align: right;
    margin: 0;
  }
  &:hover {
    cursor: pointer;
    right: -8%;
    & > p {
      transition-delay: 0.25s;
      color: #fff;
    }
  }
`
export const UserInfo = styled.div`
  position: absolute;
  padding: 5px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  letter-spacing: 1px;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
`
export const UserTags = styled.div`
  position: absolute;
  left: 5px;
  bottom: 40px;
  min-width: 30%;
  display: flex;
  justify-content: space-evenly;
`
