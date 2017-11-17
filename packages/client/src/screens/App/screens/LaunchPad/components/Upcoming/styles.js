import styled from 'styled-components'

export const UpcomingWrapper = styled.div`
  position: relative;
  display: grid;
  grid-flow: column;
  grid-template-columns: 70%;
  grid-template-rows: 200px 20px 20px auto auto auto;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  background: #fff;
`

export const Avatar = styled.img`
  border-radius: 50%;
  height: 120px;
  width: 120px;
  margin: auto;
`

export const Tags = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
