import TodoItem from "./TodoItem";
import styled from "styled-components";
const TodoList = ({ todosData, setTodosData }) => {
  return (
    <TodoListStyle>
      {todosData
        .sort((prveTodo, currTodo) => currTodo.id - prveTodo.id)
        .map((todo, idx) => {
          return (
            <TodoItem
              key={todo.id}
              todoItemData={todo}
              todosData={todosData}
              setTodosData={setTodosData}
              idx={idx}
            ></TodoItem>
          );
        })}
    </TodoListStyle>
  );
};
const TodoListStyle = styled.div`
  margin-top: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
  }
`;

export default TodoList;
