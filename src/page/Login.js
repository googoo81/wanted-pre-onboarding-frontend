import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchJsonData } from "../util/fetch";
import { alertForErrorHttpStatus } from "../util/httpStatus";
import { setAccessToken } from "../util/AccessToken";
import Button from "../componenet/Button";
import Input from "../componenet/Input";

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onChangeLoginFormData = (e, name) => {
    const value = e.target.value;
    if (name === "아이디") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const loginFormData = { email, password };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const data = await fetchJsonData(
      "/auth/signin",
      "POST",
      { "Content-Type": "application/json" },
      loginFormData
    );
    // access_token 있는 경우 성공
    if (data.access_token) {
      alert("로그인에 성공했습니다.");
      setAccessToken(data.access_token);
      navigate("/todo");
      setIsLogin(true);
      return;
    }
    // http status error인 경우
    alertForErrorHttpStatus(data);
  };
  return (
    <FromStyle>
      <h3 className="title">로그인</h3>
      <Input
        value={email}
        onChange={onChangeLoginFormData}
        type="email"
        name="아이디"
        placeholder={"아이디"}
      ></Input>
      <div className="enter"></div>
      <Input
        value={password}
        onChange={onChangeLoginFormData}
        type="password"
        name="비밀번호"
        placeholder={"비밀번호"}
      ></Input>
      <div className="btnArea">
        <Button text="로그인" hadleClickFunc={onSubmitLogin}></Button>
      </div>
    </FromStyle>
  );
};
const FromStyle = styled.form`
  border: 1px solid lightgray;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  padding: 30px;
  .title {
    margin: 0;
    text-align: center;
    color: lightgray;
    margin-bottom: 20px;
  }
  .enter {
    height: 20px;
  }
  .btnArea {
    width: 100%;
    margin: 0;
    margin-top: 20px;
  }
`;
export default Login;
