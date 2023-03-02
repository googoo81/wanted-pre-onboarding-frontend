import React from "react";
import styled from "styled-components";
const Input = ({
  value,
  type,
  name,
  placeholder,
  onChange,
  onKeyPressFunc,
}) => {
  return (
    <InputStyle
      value={value}
      onChange={(e) => {
        onChange(e, name);
      }}
      type={type}
      name={name}
      placeholder={placeholder}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter") onKeyPressFunc(e);
      // }}
    ></InputStyle>
  );
};

const InputStyle = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 5px;
  :focus {
    outline: none;
  }
`;

export default Input;
