import styled from 'styled-components'

import { Icon } from 'semantic-ui-react'

export const Wrapper = styled.div`
  grid-area: cal;
  background: #fff;
  display: grid;
  grid-template-rows: minmax(10%, 100px) auto;
  grid-template-areas: 'heading' 'calendar-body';
`
export const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > h1 {
    margin: 0 2em !important;
  }
`

export const CalendarWrapper = styled.div`
  grid-area: calendar-body;
  display: grid;
  grid-template-rows: minmax(10%, 60px) 1fr;
`

export const Header = styled.div`
  border-top: 3px solid #eee;
  display: grid;
  margin: auto;
  width: 90%;
  grid-template-rows: 80px;
  grid-template-columns: repeat(7, minmax(10%, 100px));
  & > h3:first-child {
    margin-top: 25px;
  }
  & > h3 {
    text-align: center;
  }
`
export const Calendar = styled.div`
  margin-top: 1em;
  padding: 2% 5%;
  display: grid;
  text-align: center;
  grid-auto-rows: minmax(10%, 85px);
  grid-template-columns: repeat(7, [col] minmax(10%, 100px));
`

export const LeftChev = styled(Icon).attrs({
  name: 'left chevron',
  size: 'big',
})`
  cursor: pointer;
`
export const RightChev = styled(Icon).attrs({
  name: 'right chevron',
  size: 'big',
})`
  cursor: pointer;
`
export const Day = styled.div`
  padding: 5px;
  grid-column: col ${props => props.dow};
  font-size: 1em;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  position: relative;
  &:hover {
    background: #eee;
    cursor: pointer;
  }
  &.event:before {
    content: '•';
    font-size: 30px;
    color: red;
    margin-left: 3vw;
  }
  &.today {
    background: #ff7f50;
  }
  &.past {
    background: #d7d7d7;
  }
`
