import styled from 'styled-components'

export const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 60px auto auto;
  grid-template-areas: 'invites' 'title' 'schedule' 'history';
  grid-gap: 40px;
`

export const Invitations = styled.div`
  grid-area: invites;
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-areas: ' title' ' intros';
  grid-gap: 20px;
`

export const Schedule = styled.div`
  grid-area: schedule;
  display: grid;
  grid-template-columns: [col] auto [col] 400px;
  grid-template-rows: [row] 70px [row] auto;
  grid-template-areas: 'cal title' 'cal upcoming';
  grid-gap: 20px;
`

export const History = styled.div`
  background: #fff;
  grid-row: row 3;
`
export const Title = styled.div`
  background: #fff;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-area: title;
`

export const Calendar = styled.div`
  background: #fff;
  grid-area: cal;

  & > .DayPicker {
    border: none;
    box-shadow: none;
    margin: auto;

    & > .DayPicker_weekHeader {
      margin-bottom: 10px;
    }
  }
`

export const UpcomingComponent = styled.div`
  background: #fff;
  grid-area: upcoming;
`

export const HistoryComponent = styled.div`
  background: #333;
  grid-area: intros;
  height: 300px;
`
