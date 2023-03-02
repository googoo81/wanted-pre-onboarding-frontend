import { MainStyle } from "../style/MainStyle";
import styled from "styled-components";
import { useState } from "react";
import Input from "../componenet/Input";
import { useNavigate } from "react-router-dom";
import { alertForErrorHttpStatus } from "../util/httpStatus";
import { fetchJsonData } from "../util/fetch";
import { setAccessToken } from "../util/AccessToken";
import Button from "../componenet/Button";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const signUpFormData = { email, password };
  const regex = /^[0-9A-Za-z._-]+@[0-9A-Za-z._-]+\.[a-zA-Z]{2,3}$/;
  const navigate = useNavigate();
  
  const onChangeinputValue = (e, name) => {
    const value = e.target.value;
    if (name === "아이디") {
      setEmail(value);
    }
    if (name === "비밀번호") {
      setPassword(value);
    }
    if (name === "비밀번호 확인") {
      setConfirmPassword(value);
    }
    if (
      regex.test(email) &
        (password !== "") &
        (password.length > 7) &
        (e.target.value === password) ||
      e.target.value === confirmPassword
    ) {
      setIsSignUp(false);
    } else {
      setIsSignUp(true);
    }
  };

  const onClickSignUp = async (e) => {

    e.preventDefault();

    const data = await fetchJsonData(
      "/auth/signup",
      "POST",
      { "Content-Type": "application/json" },
      signUpFormData
    );
    // access_token 있는 경우 성공
    if (data.access_token) {
      alert("회원가입에 성공했습니다.");
      setAccessToken(data.access_token);
      navigate("/todo");
      return;
    }
    // http status error인 경우
    alertForErrorHttpStatus(data);
  };

  return (
    <MainStyle>
      <h2 className="title">회원가입</h2>
      <Main>
        <form className="form">
          <Input
            value={email}
            type="email"
            name="아이디"
            placeholder="아이디를 입력해주세요"
            onChange={onChangeinputValue}
          ></Input>
          <p className="error_message">
            {regex.test(email) ? null : "이메일 형식으로 입력해주세요."}
          </p>
          <Input
            value={password}
            type="password"
            name="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeinputValue}
          ></Input>
          <p className="error_message">
            {password.length < 8 ? " 8자리 이상 입력해주세요." : null}
          </p>
          <Input
            value={confirmPassword}
            type="password"
            name="비밀번호 확인"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeinputValue}
          ></Input>
          <p className="error_message">
            {confirmPassword !== password
              ? "동일한 비밀번호를 입력해주세요."
              : null}
          </p>
          <div className="btnArea">
            <Button
              text="회원가입"
              disabled={isSignUp}
              hadleClickFunc={onClickSignUp}
            ></Button>
          </div>
        </form>
      </Main>
    </MainStyle>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 30px;
  width: 20%;
  height: 300px;
  background-color: white;
  padding: 15px;
  .form {
    width: 100%;
  }
  .error_message {
    height: 15px;
    font-size: 12px;
    color: red;
  }
  .btnArea {
    height: 30px;
  }
`;
export default SignUp;
