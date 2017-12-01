import styled from 'styled-components'

export const IntroductionsContainer = styled.div`
  grid-area: intros;
  display: grid;
  grid-template-rows: 400px;
  grid-template-columns: repeat(4, minmax(22%, 275px)) 50px;
  grid-gap: 20px;
`

export const Introduction = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 0.63fr 0.36fr;
  grid-template-columns: auto;
  grid-template-areas: 'photo' 'info';
  grid-gap: 5px;
`

export const ProfilePhoto = styled.div`
  grid-area: photo;
  opacity: 0.6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  & > p {
    width: 60%;
    font-weight: bold;
  }
  background: #fff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #b20a2c,
    #fff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #b20a2c,
    #fff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

export const Info = styled.div`
  grid-area: info;
  background: #fff;
  padding: 15px;
  position: relative;
`
export const View = styled.img`
  position: absolute;
  top: -20px;
  right: 2em;
  &:hover {
    cursor: pointer;
  }
`

export const Tags = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, auto);
  grid-template-rows: auto;
  grid-auto-flow: column;
  grid-gap 10px;
  margin-top: 1em;
  width: 90%;
  & > p {
    grid-column-start: auto;
    grid-row-start: auto;
    background: #ccc;
    color: #fff;
    width: min-content;
    height: min-content;
    padding: 1px 10px;
  }

  & > p:last-child{
    margin: 0 0 1em !important;
  }
`
export const Pass = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  color: #333;
  z-index: 1;
  &:hover {
    cursor: pointer;
    color: #fff;
  }
`
