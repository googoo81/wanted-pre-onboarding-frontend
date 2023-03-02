import { useState } from "react";
import { getAccessToken } from "../util/AccessToken";
import { fetchJsonData } from "../util/fetch";
import { alertForErrorHttpStatus } from "../util/httpStatus";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";

const TodoItem = ({ todoItemData, todosData, setTodosData, idx }) => {
  const [isCompleted, setIsCompleted] = useState(todoItemData.isCompleted);
  const [todo, setTodo] = useState(todoItemData.todo);
  const [isShowTodo, setIsShowTodo] = useState(false);

  const onChangeCheck = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization: getAccessToken(),
      "Content-Type": "application/json",
    };
    const todoData = await fetchJsonData(
      "/todos/" + todoItemData.id,
      "PUT",
      headers,
      {
        todo: todo,
        isCompleted: !isCompleted,
      }
    );
    if (todoData.id) {
      setIsCompleted(!isCompleted);
      return;
    }

    // http status error인 경우
    alertForErrorHttpStatus(todoData);
  };

  const onUpdateTodoText = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const headers = {
      Authorization: getAccessToken(),
      "Content-Type": "application/json",
    };
    const todoData = await fetchJsonData(
      "/todos/" + todoItemData.id,
      "PUT",
      headers,
      {
        todo: todo,
        isCompleted: isCompleted,
      }
    );
    if (todoData.id) {
      setIsShowTodo(!isShowTodo);
      return;
    }

    // http status error인 경우
    alertForErrorHttpStatus(todoData);
  };

  const onClickDeleteTodo = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말 삭제하시겠습니까?")) {
      const headers = {
        Authorization: getAccessToken(),
      };
      const { status } = await fetchJsonData(
        "/todos/" + todoItemData.id,
        "DELETE",
        headers
      );
      if (status === 204) {
        alert("삭제 되었습니다.");
        const filterTodosData = todosData.filter(
          (todoData) => todoData.id !== todoItemData.id
        );
        setTodosData(filterTodosData);
        return;
      }
    }
  };

  return (
    <TodoItemStyle isCompleted={isCompleted}>
      <div className="No">{`${idx + 1}번째 할 일`}</div>
      <div className="contentArea">
        {isShowTodo ? (
          <>
            <div className="contente">
              <Input
                value={todo}
                type="text"
                name="todo"
                placeholder="내용을 입력해주세요"
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
              ></Input>
            </div>
            <div className="btnArea">
              <Button text="완료" hadleClickFunc={onUpdateTodoText}></Button>
              <Button
                text="취소"
                hadleClickFunc={() => {
                  setIsShowTodo(!isShowTodo);
                }}
              ></Button>
            </div>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              onChange={(e) => onChangeCheck(e)}
              checked={isCompleted}
            ></input>
            <div className="contente">
              <p>{todo}</p>
            </div>
            <div className="btnArea">
              <Button
                text="수정"
                hadleClickFunc={() => setIsShowTodo(!isShowTodo)}
              ></Button>
              <Button text="삭제" hadleClickFunc={onClickDeleteTodo}></Button>
            </div>
          </>
        )}
      </div>
    </TodoItemStyle>
  );
};

const TodoItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 5px;
  border-bottom: 1px solid lightgray;
  height: 80px;
  p {
    margin: 0;
  }
  .contente {
    display: flex;
    margin-top: 10px;
    justify-content: center;
    height: 100%;
    width: 70%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
    color: ${({ isCompleted }) => (isCompleted ? "gray" : "black")};
    text-decoration: ${({ isCompleted }) =>
      isCompleted ? "line-through" : "none"};
  }
  .contentArea {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: space-between;

    .btnArea {
      display: flex;
      height: 35px;
      button {
        margin-right: 5px;
        margin-left: 5px;
        font-size: 13px;
      }
    }
  }
`;

export default TodoItem;
