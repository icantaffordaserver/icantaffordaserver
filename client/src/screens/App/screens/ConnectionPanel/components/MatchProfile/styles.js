/**
 * Created by alexandermann on 2017-04-15.
 */
import styled from 'styled-components';

export const MatchProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 5px #05ffb0 solid;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 30px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
`;

export const ImgWrapper = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 100%;
`

export const ProfileImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 100%
`;

export const ProfileHeaderText = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 15px;
`;

export const Name = styled.h2`
  margin: 5px 0 5px 0;
`;

export const Location = styled.h3`
  margin: 5px 0 5px 0;
`;

export const Fact = styled.h4`
  margin: 5px 0 5px 0; 
`;

export const ProfileContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  
`;

export const ContentTitle = styled.h3`
  margin: 0 0 10px 0;
`;

export const ContentText = styled.p`
  font-size: 14px;
  margin: 10px 0 0 0;
`;
