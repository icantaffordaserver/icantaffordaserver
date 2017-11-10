import React, { Component } from 'react'
import styled from 'styled-components'

class SideNavProfileHeader extends Component {
  render() {
    return (
      <Wrapper>
        <ImageContainer>
          <Badge>Admin</Badge>
          <ImageWrapper>
            <Image
              src="http://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg"
              alt=""
            />
          </ImageWrapper>
        </ImageContainer>
        <Name>Billy Walsh</Name>
        <Location>Toronto, ON</Location>
      </Wrapper>
    )
  }
}

export default SideNavProfileHeader

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 16px;
`

const ImageContainer = styled.div`
  position: relative;
  width: 80px;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
`

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: -25px;
  margin: 0;
  color: white;
  background-color: red;
  border-radius: 10px;
  padding: 5px 5px;
  z-index: 1;
  font-size: 12px;
`

const Name = styled.h3`
  margin: 0;
`
const Location = styled.h5`
  margin: 0;
  margin-top: 10px;
`
