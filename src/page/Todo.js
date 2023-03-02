import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoInput from "../componenet/TodoInput";
import TodoList from "../componenet/TodoList";
import { MainStyle } from "../style/MainStyle";
import { getAccessToken } from "../util/AccessToken";
import { fetchJsonData } from "../util/fetch";
import styled from "styled-components";
const Todo = ({ isLogin }) => {
  const navigate = useNavigate();
  const [todosData, setTodosData] = useState([]);
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const headers = {
      Authorization: getAccessToken(),
    };
    fetchJsonData("/todos", "GET", headers).then((data) => {
      setTodosData(data);
    });
  }, []);

  return (
    <MainStyle>
      <h2>할 일 목록</h2>
      <TodoStyle>
        <TodoInput
          todosData={todosData}
          setTodosData={setTodosData}
        ></TodoInput>
        <TodoList todosData={todosData} setTodosData={setTodosData}></TodoList>
      </TodoStyle>
    </MainStyle>
  );
};

const TodoStyle = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 15px;
  width: 30%;
  height: 80%;
  padding: 20px;

  background-color: white;
`;

export default Todo;
