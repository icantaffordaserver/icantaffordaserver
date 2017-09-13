import styled from "styled-components";
import productShot from "../../assets/images/signup-shot1.jpg";

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
    width: 100%;
    height: 100%;
    
  }
`;

export const Div = styled.div`
  &&& {
    padding: 0;
    overflow-y: hidden;
  }
`;

export const FormDiv = styled.div`
  &&&{
      padding: 1%;
      overflow-y: hidden;
  }
`;

export const OverLayText = styled.h2`
  &&& {
      position: absolute;
      left: 25%;
      top: 25%;
      transform: translate(-25%, -25%);
  }
`;
