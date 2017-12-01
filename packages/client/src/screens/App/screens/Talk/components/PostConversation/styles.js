import styled from 'styled-components'

export const PostConvoWrapper = styled.div`
  margin-top: 2em;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-template-areas: 'title' 'tech-feedback' 'convo-feedback' 'buttons';
  grid-gap: 20px;
`
export const TitleWrapper = styled.div`
  grid-area: title;
  background: #fff;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr;
  padding: 2% 5%;
  & > h1 {
    margin: 1% auto;
  }
  & > p {
    font-size: 1.25em;
    font-weight: 300;
    text-align: center;
  }
`
export const TechnicalFeedback = styled.div`
  grid-area: tech-feedback;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'heading heading' 'sound video';
  grid-gap: 15px;
`
export const Heading = styled.h1`
  grid-area: heading;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2%;
`
export const SoundQuality = styled.div`
  grid-area: sound;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 5%;
  background: #fff;
`
export const VideoQuality = styled.div`
  grid-area: video;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 5%;
  background: #fff;
`
export const ConversationFeedback = styled.div`
  grid-area: convo-feedback;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'heading heading' 'comment journal';
  grid-gap: 15px;
`

export const Comments = styled.div`
  grid-area: comment;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 5%;
  background: #fff;
`
export const Journal = styled.div`
  grid-area: journal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 5%;
  background: #fff;
`
export const Buttons = styled.div`
  grid-area: buttons;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ToggleButton = styled.button`
  margin: 0;
  border: none;
  padding: 2%;
  height: 50px;
  width: 200px;
  color: #fff;
  :focus {
    outline: none;
  }
  &.yes {
    background: #ff7f50;
  }
  &.no {
    background: red;
  }
`
