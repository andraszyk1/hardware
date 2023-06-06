import { styled, keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const RotateThing = styled.div`
  display: inline-block;
  margin-left: 40%;
  margin-top: 10%;
  animation: ${rotate} 1s linear infinite;
  padding: 2rem 1rem;
  font-weight: 500;
  background-image:url("./images/Maflow.jpg");
  background-position: center;
  background-repeat:no-repeat;
  background-size: 230px;
  border:3px rgb(6,6,6) dotted ;
  width: 200px;
  height: 200px;
  text-align: center;
  border-radius: 100px;
  text-transform: uppercase;
  font-size: 2rem;
  text-shadow: 5px silver;
`;