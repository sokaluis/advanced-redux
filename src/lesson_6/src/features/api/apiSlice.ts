import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
  }),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      transformResponse: (res: Todo[]) => res.sort((a, b) => b.id - a.id),
      providesTags: ['todos']
    }),
    addTodo: builder.mutation<void, Todo>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['todos']
    }),
    updateTodo: builder.mutation<void, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['todos']
    }),
    deleteTodo: builder.mutation<void, Todo>({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['todos']
    })
  }),
});


export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = apiSlice;