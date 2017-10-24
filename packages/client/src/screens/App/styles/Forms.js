import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export const Form = styled.form`
  display: flex;
  margin: auto;
  justify-content: space-between;
  flex-direction: column;
  width: fill-available;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`

export const FormLabel = styled.label`
  flex: none;
  font-weight: bold;
  font-size: 1.75em;
  font-family: Lato;
  font-weight: 300;
  min-width: 10%;
  margin-bottom: 10px;
`

export const FormInput = styled.input`
  flex: 1 1 auto;
  width: fill-available;
  padding: 10px;
  font-size: 1.25em;
  border: solid 1px lightgray;
  border-radius: 5px;
`

export const FormTextArea = styled.textarea`
  flex: 1 1 auto;
  width: fill-available;
  padding: 10px;
  font-size: 1.25em;
  border: solid 1px lightgray;
  border-radius: 5px;
  height: 250px;
`
export const FormButton = styled(Button)`
  transition: all 0.25s ease !important;
  padding: 5% 0 !important;
  background: #fff !important;
  border: solid 1px #ff9839 !important;
  border-radius: 5px !important;
  margin-bottom: 10% !important;
  font-size: 2em !important;
  color: #ff9839 !important;
  line-height: 0 !important;
  &:hover {
    color: #fff !important;
    border: solid 1px #ff9839 !important;
    background: #ff9839 !important;
  }
`
