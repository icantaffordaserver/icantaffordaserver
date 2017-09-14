import styled from "styled-components";
import productShot from "../../assets/images/signup-shot1.jpg";
import {Segment} from "semantic-ui-react";

export const FormH1 = styled.h1`
  &&& {
    text-align: center;
    color: #ff7f50;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
`;
export const SignUpImg = styled.img`
  &&& {
    position: relative;
    filter: blur(2px);
    opacity: 0.7;
    width: 100%;
    height: 100%;
  }
`;

export const Div = styled.div`
  &&& {
    overflow-y: hidden;
  }
`;

export const ImageDiv = styled.div`
  &&& {
    padding: 0;
    overflow-y: hidden;
  }
`;

export const FormDiv = styled.div`
  &&& {
    padding: 1%;
    overflow-y: hidden;
  }
`;

export const OverLay = styled.div`
  &&& {
    background: rgb(6, 81, 119);
  }
`;

export const FormSegment = styled(Segment)`
  &&&{
    box-shadow: none !important;
    border: none !important;
  }
`;
