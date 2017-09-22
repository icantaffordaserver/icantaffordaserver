import styled from 'styled-components'

export const SettingsForm = styled.form`
  display: flex;
  margin: auto;
  justify-content: space-between;
  flex-direction: column;
  width: 60%;
`

export const SettingsFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`

export const SettingsFormLabel = styled.label`
  flex: none;
  font-weight: bold;
  font-size: 1.75em;
  font-family: Lato;
  font-weight: 300;
  min-width: 10%;
  margin-bottom: 10px;
`

export const SettingsFormInput = styled.input`
  flex: 1 1 auto;
  width: fill-available;
  padding: 10px;
  font-size: 1.25em;
  border: solid 1px lightgray;
  border-radius: 5px;
`

export const SettingsFormTextArea = styled.textarea`
  flex: 1 1 auto;
  width: fill-available;
  padding: 10px;
  font-size: 1.25em;
  border: solid 1px lightgray;
  border-radius: 5px;
  height: 250px;
`
export const SettingsFormButton = styled.button`
  transition: all 0.25s ease;
  padding: 5% 0;
  background: #fff;
  border: solid 1px #ff9839;
  border-radius: 5px;
  margin-bottom: 10%;
  font-size: 2em;
  color: #ff9839;
  &:hover {
    color: #fff;
    border: solid 1px #ff9839;
    background: #ff9839;
  }
`
