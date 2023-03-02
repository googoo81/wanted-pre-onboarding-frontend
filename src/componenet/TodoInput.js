import { useState } from "react";
import { getAccessToken } from "../util/AccessToken";
import { fetchJsonData } from "../util/fetch";
import { alertForErrorHttpStatus } from "../util/httpStatus";
import Button from "./Button";
import Input from "./Input";
import styled from "styled-components";
const TodoInput = ({ todosData, setTodosData }) => {
  const [todoValue, setTodoValue] = useState("");
  const onClickCreateTodo = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization: getAccessToken(),
      "Content-Type": "application/json",
    };
    const todoData = await fetchJsonData("/todos", "POST", headers, {
      todo: todoValue,
    });
    if (todoData.id) {
      alert("todo 입력 성공");
      setTodoValue("");
      setTodosData([todoData, ...todosData]);
      return;
    }

    // http status error인 경우
    alertForErrorHttpStatus(todoData);
  };

  const onChangeTodoValue = (e) => {
    e.preventDefault();
    setTodoValue(e.target.value);
  };

  return (
    <TodoInputStyle>
      <Input
        value={todoValue}
        onChange={(e) => onChangeTodoValue(e)}
        type="text"
        name="todoInput"
        placeholder="할 일을 입력해주세요."
        onKeyPressFunc={onClickCreateTodo}
      ></Input>
      <div className="btnArea">
        <Button text="등록" hadleClickFunc={onClickCreateTodo}></Button>
      </div>
    </TodoInputStyle>
  );
};

const TodoInputStyle = styled.div`
  width: 100%;
  .btnArea {
    height: 35px;
    margin-top: 10px;
  }
`;

export default TodoInput;
