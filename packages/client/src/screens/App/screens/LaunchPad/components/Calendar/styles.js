import styled from 'styled-components'

import { Icon } from 'semantic-ui-react'

export const Wrapper = styled.div`
  grid-area: cal;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const Header = styled.div`
  border-top: 3px solid #eee;
  display: grid;
  grid-template-rows: 80px;
  grid-template-columns: repeat(7, 100px);
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
  grid-template-columns: repeat(7, [col] 100px);
`

export const LeftChev = styled(Icon).attrs({
  name: 'left chevron',
  size: 'big',
})`
  position: absolute;
  left: 105px;
  top: 40px;
  cursor: pointer;
`
export const RightChev = styled(Icon).attrs({
  name: 'right chevron',
  size: 'big',
})`
  position: absolute;
  right: 105px;
  top: 40px;
  cursor: pointer;
`
export const Day = styled.div`
  padding: 5px;
  grid-column: col ${props => props.dow};
  height: 100px;
  font-size: 1em;
  display: flex;
  flex-direction: column;
  position: relative;
  &:hover {
    background: #eee;
    cursor: pointer;
  }
  &.event {
    border-top: 3px solid red;
  }
  &.today {
    background: #ff7f50;
  }
`
