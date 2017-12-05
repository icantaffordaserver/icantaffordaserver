import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'

export const FormH1 = styled.h1`
  &&& {
    text-align: center;
    color: #ff7f50;
    font-family: 'Montserrat', 'Lucida Sans', 'Lucida Sans Regular',
      'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
`
export const SignUpImg = styled.img`
  &&& {
    position: relative;
    opacity: 0.7;
    width: 100%;
    height: 100%;
  }
`

export const Div = styled.div`
  &&& {
    padding: 1%;
    height: 100%;
    overflow-y: hidden;
  }
`

export const ImageDiv = styled.div`
  &&& {
    padding: 0;
    height: 100%;
    overflow-y: hidden;
  }
`

export const FormDiv = styled.div`
  &&& {
    padding: 1%;
    overflow-y: hidden;
  }
`

export const FormInterests = styled.div`
  &&& {
    overflow-y: hidden;
    display: flex;
    justify-content: center;
  }
`

export const OverLay = styled.div`
  &&& {
    background: rgb(6, 81, 119);
    height: 100%;
  }
`

export const FormSegment = styled(Segment)`
  &&& {
    padding-top: 18vh !important;
    box-shadow: none !important;
    border: none !important;
  }
`

export const FormHeaderP = styled.p`
  &&& {
    text-align: center;
  }
`

export const FormNextButton = styled.a`
  &&& {
    font-size: 1.2em;
    display: flex;
    padding: 4% 8%;
    background: rgb(6, 81, 119);
    transition: background 350ms ease-in-out;

    &:hover {
      background: rgba(6, 81, 119, 0.7);
    }
  }
`

export const FormSubmitButton = styled.button`
  &&& {
    font-size: 1.2em;
    margin: 0;
    background: rgb(6, 81, 119);
    transition: background 350ms ease-in-out;

    &:hover {
      background: rgba(6, 81, 119, 0.7);
    }
  }
`

export const ImageH1 = styled.h1`
  &&& {
    left: 0;
    color: #ff7f50;
    font-size: 6em;
    position: absolute;
    text-align: center;
    top: 40%;
    width: 66%;
  }
`

export const ImageP = styled.p`
  &&& {
    left: 0;
    color: #fff;
    font-size: 1.3em;
    position: absolute;
    text-align: center;
    top: 55%;
    width: 66.6%;
    letter-spacing: 3px;
  }
`

export const InterestsImg = styled.img`
  &&& {
    &.active {
      box-shadow: 0 0 0 3px #4183c4;
    }
  }
`
export const InterestsDiv = styled.div`
  &&& {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
`

export const GenericCenterP = styled.p`
  &&& {
    text-align: center;
  }
`