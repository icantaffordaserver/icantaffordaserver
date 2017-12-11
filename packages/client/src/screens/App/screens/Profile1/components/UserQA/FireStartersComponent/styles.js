import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

export const FireStarters = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  grid-template-areas: 'select' 'answers';
  grid-gap: 40px;
`
export const QuestionSelector = styled.div`
  position: relative;
  grid-area: select;
  width: 100%;
  padding: 1% 5%;
  background: #fff;
`
export const QuestionList = styled.ul`
  margin: 1% auto;
  width: 80%;
  padding: 0;
  list-style: none;
  max-height: 250px;
  overflow-y: scroll;
  & > :nth-child(odd) {
    background: #f7f7f7;
  }
`

export const Question = styled.li`
  font-size: 1.25em;
  padding: 2% 5%;
  background: #e7e7e7;
  position: relative;
  & > i {
    float: right;
    position: absolute;
    right: 1px;
    top: 30%;
  }
`

export const FireStarterAnswers = styled.div`
  grid-area: answers;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 1em;
`
export const Answer = styled.div`
  background: #fff;
  padding: 0;
  & > h1 {
    background: #7781c8;
    min-height: 50px;
    font-size: 1vw;
    padding: 3% 1%;
    margin-top: 0;
    width: 100%;
    color: #fff;
    text-align: center;
  }
  min-height: 200px;
`

export const Back = styled(Icon).attrs({
  name: 'arrow left',
  size: 'big',
  color: 'grey',
})`
  position: absolute;
  top: 25px;
  left: 15px;
`
