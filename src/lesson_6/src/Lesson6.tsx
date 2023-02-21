import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import TodoList from "./features/todos/TodoList";
import { apiSlice } from './features/api/apiSlice';
import './styles.css';

const Lesson6 = () => {
  return (
    <ApiProvider api={apiSlice}>
      <TodoList />
    </ApiProvider>
  );
};

export default Lesson6;
