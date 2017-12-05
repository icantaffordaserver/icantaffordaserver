import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Title = styled.h1`
  color: black;
  font-size: 40px;
  text-align: center;
  width: 100%;
  font-weight: 500;
`
export const SubTitle = styled.h4`
  color: black;
  font-size: 30px;
  line-height: 43px;
  text-align: center;
  font-weight: 500;
  width: 100%;
`
export const TextLink = styled(Link)`
  transition: all 0.15s ease;
  color: black;
  font-size: 24px;
  text-align: center;
  width: 100%;

  &:hover {
    color: black;
    cursor: pointer;
  }
`
