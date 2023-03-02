import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeAccessToken } from "../util/AccessToken";
import Button from "./Button";

const Header = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    removeAccessToken();
    setIsLogin(false);
    navigate("/");
  };

  return (
    <HeaderStyle>
      <div className="title">TodoList</div>
      {isLogin ? (
        <div className="btnArea">
          <Button text="로그아웃" hadleClickFunc={onClickLogout}></Button>
        </div>
      ) : (
        <div className="btnArea">
          <Link className="loginBtn" to="/">
            로그인
          </Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  .title {
    font-size: 20px;
    margin-left: 30px;
    font-weight: bold;
  }
  .btnArea {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    margin-right: 30px;
    color: black;
    a:visited {
      color: black;
    }
    .loginBtn {
      margin-right: 30px;
    }
  }
`;

export default Header;
