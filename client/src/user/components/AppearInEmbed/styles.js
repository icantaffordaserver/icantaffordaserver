/**
 * Created by alexandermann on 2017-04-15.
 */
import styled from 'styled-components';

export const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%
  height: 100%;
  border: 0;
`;

export const EmbedWrapper = styled.div`
  position: relative;
  width: 100%
  height: 0;
  padding-bottom: 51%;
  border: 5px #05ffb0 solid;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  `;

export const CountdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%
  height: 100%;
`;

export const Countdown = styled.div`
  margin: auto;
`;
