import styled from "styled-components";
import { MainStyle } from "../style/MainStyle";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";

const Home = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/todo");
    }
  }, []);
  return (
    <MainStyle>
      <HomeConent>
        <h1>TodoList</h1>
        <Login setIsLogin={setIsLogin}></Login>
      </HomeConent>
    </MainStyle>
  );
};

const HomeConent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: gray;
  font-size: 20px;
  font-weight: bold;
  .btnArea {
    margin-right: 30px;
    color: black;
    a:visited {
      color: black;
    }
    > a {
      text-decoration: none;
    }
    .loginBtn {
      margin-right: 30px;
    }
  }
`;

export default Home;
