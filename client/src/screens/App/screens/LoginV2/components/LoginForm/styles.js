/**
 * Created by alexandermann on 2017-06-06.
 */
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const LoginButton = styled(Button)`
  &&& {
    color: white;
    background-color: #ff7c58;
    width: 20%;
    padding: 1em;
  }
`;

export const SignUpButton = styled(Button)`
  &&& {
    color: #5492e1;
    border: 5px #5492e1 solid;
    background-color: white;
  }
`;

export const FormLabel = styled.label`
  &&& {
    text-align: left;
    width: 20% !important;
  }
`;

export const FormLink = styled.a`
  &&& {
    margin-left: 2em;
  }
`;
