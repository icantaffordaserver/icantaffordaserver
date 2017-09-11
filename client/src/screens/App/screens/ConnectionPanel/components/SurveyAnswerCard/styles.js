/**
 * Created by alexandermann on 2017-04-15.
 */
import styled from 'styled-components'

export const AllSurveyCards = styled.div`
  width: 100%;
  height: auto;
  float: left;
  overflow-x: scroll;
  white-space: nowrap;
`

export const CardWrapper = styled.div`
  display: inline-block;
  margin: 25px;
  position: relative;
  border: 5px #05ffb0 solid;
  border-radius: 5px;
  width: 350px;
  height: 250px;
  padding: 15px;
  background-color: #05ffb0;
`

export const CardAccent = styled.h1`
  position: absolute;
  top: 0px;
  left: 15px;
  font-size: 70px;
  color: #fff;
  font-weight: bolder;
`

export const CardQuestion = styled.p`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 225px;
  font-size: 20px;
  color: #fff;
  white-space: normal;
`

export const CardAnswers = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 300px;
`

export const CardAnswer = styled.p`
  font-size: 16px;
  color: navy;
  font-style: italic;
  text-align: right;
  line-height: 10px;
`
