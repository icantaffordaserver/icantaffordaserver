import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

export const ProfilePageWrapper = styled.div`
  display: grid;
  margin-top: 1vw;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  grid-template-areas: 'userInfo' 'userBio' 'userAvail' 'userQA';
  grid-gap: 15px;
`

export const UserInfoSection = styled.div`
  grid-area: userInfo;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'photo info';
  grid-gap: 15px;
`

export const UserBioSection = styled.div`
  grid-area: userBio;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'heading' 'bio';
  grid-gap: 15px;
`

export const UserAvailabilitySection = styled.div`
  grid-area: userAvail;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'heading' 'availability';
  grid-gap: 15px;
`

export const UserQASection = styled.div`
  grid-area: userQA;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 'heading' 'qa';
  grid-gap: 15px;
`

export const Heading = styled.div`
  background: #fff;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60px;
  grid-area: heading;
  position: relative;
`

export const UserPhotoSection = styled.div`
  height: 260px;
  width: 260px;
  padding: 10px;
  background: #fff;
  grid-area: photo;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const UserPhoto = styled.img`
  height: 250px;
  width: 250px;
`
export const UserInfo = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2% 5%;
  position: relative;
`
export const UserBio = styled.div`
  grid-area: bio;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  background: #fff;
  min-height: 200px;
  padding: 2%;
`
export const UserAvailability = styled.div`
  grid-area: availability;
  background: #fff;
`
export const EditButton = styled(Icon).attrs({ name: 'edit', size: 'large' })`
  background: transparent;
  color: #333;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`
export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
`
export const SelectInterestsWrapper = styled.div`
  margin-top: 2em;
  border-top: 2px solid #c4c4c4;
  padding: 20px 0;
`

export const SuggestionInput = styled.input.attrs({
  placeholder: '#',
})`
  width: 15vw;
  height: 2vw;
  padding-left: 1rem;
`

export const SuggestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & > p {
    width: 15vw;
  }

  & > button {
    width: 6vw !important;
    height: 2vh !important;
    font-size: 1vw !important;
    line-height: 0 !important;
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
