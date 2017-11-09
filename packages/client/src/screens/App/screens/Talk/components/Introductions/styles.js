import styled from 'styled-components'

export const IntroductionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-contetn: space-between;
  margin: 0 auto;
`

export const Introduction = styled.div`
  flex: 0 1 calc(30% - 1em);
  margin: 1em;
  min-height: 300px;
  background: url(${props =>
      props.img
        ? props.img
        : 'https://api.adorable.io/avatars/285/abott@adorable.png'})
    no-repeat;
  background-size: cover;
  position: relative;
  & > .info {
    transition: all 0.25s ease-in-out;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #333;
  }

  & > .overlay {
    height: 80%;
    width: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;

    & > i:hover {
      cursor: pointer;
      color: #999;
    }
  }

  &:nth-child(3n + 1) {
    margin-left: 4%;
  }

  &:hover {
    & > .overlay {
      display: flex;
    }
  }
`
