import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { IPost, IPostsState } from '../../typescript';
import { apiSlice } from '../api/apiSlice';
import { sub } from 'date-fns';
import { initReactions } from '../../utils';

export interface EntityPostState extends IPostsState, EntityState<IPost> { }

export interface EntityPost extends IPost, EntityState<IPost> { }

export const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query<any, void>({
      query: () => '/posts',
      transformResponse: (responseData: any) => {
        let min = 1;
        const loadedPosts = responseData.map((post: any) => {
          if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions) post.reactions = initReactions;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result: any, _error, _arg) => [
        { type: 'Post', id: "LIST" },
        ...result.ids.map((id: any) => ({ type: 'Post', id }))
      ]
    }),
    getPostsByUserId: builder.query({
      query: id => `/posts/?userId=${id}`,
      transformResponse: (responseData: any) => {
        let min = 1;
        const loadedPosts = responseData.map((post: any) => {
          if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions) post.reactions = initReactions;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result: any, error, arg) => [
        ...result.ids.map((id: any) => ({ type: 'Post', id }))
      ]
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: initReactions
        }
      }),
      invalidatesTags: [
        { type: 'Post', id: "LIST" }
      ]
    }),
    updatePost: builder.mutation({
      query: initialPost => ({
        url: `/posts/${initialPost.id}`,
        method: 'PUT',
        body: {
          ...initialPost,
          date: new Date().toISOString()
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.id }
      ]
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.id }
      ]
    }),
  })
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} = extendedApiSlice;