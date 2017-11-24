/**
 * Created by alexandermann on 2017-06-06.
 * edited by Georgios Psarakis 2017-09-19. 
 */
import styled from 'styled-components'
import BackgroundImage from '../../../../shared/assets/product-hunt-landing.jpg'

export const LoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: url(${BackgroundImage});
  opacity: 0.9;
  background-size: cover;
  background-repeat: none;
  display: flex;
  flex-direction: row;
`
export const LoginImageContainer = styled.div`
  width: 66%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`

export const LoginFormWrapper = styled.div`
  width: 34%;
  padding: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: -15px 0px 35px 1px rgba(0, 0, 0, 0.14);
`
export const Links = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2em;
`
