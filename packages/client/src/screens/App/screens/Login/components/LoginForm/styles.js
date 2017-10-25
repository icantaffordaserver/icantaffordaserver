/**
 * Created by alexandermann on 2017-06-06.
 * edited by Georgios Psarakis 2017-09-19. 
 */
import styled from 'styled-components'
import BackgroundImage from '../../../../shared/assets/signup-shot1.jpg'

export const LoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`
export const LoginImageContainer = styled.div`
  width: 66%;
  background: url(${BackgroundImage});
  background-size: cover;
  background-repeat: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LoginFormWrapper = styled.div`
  width: 33%;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -15px 0px 35px 1px rgba(0, 0, 0, 0.14);
`
