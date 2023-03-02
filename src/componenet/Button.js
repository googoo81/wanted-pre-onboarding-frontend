import styled from "styled-components";
const Button = ({ text, hadleClickFunc, disabled }) => {
  return (
    <ButtonStyle disabled={disabled} onClick={(e) => hadleClickFunc(e)}>
      {text}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  background-color: gray;
  color: white;
  font-size: 16px;
  font-weight: bold;
  height: 100%;
  width: 100%;
`;

export default Button;
