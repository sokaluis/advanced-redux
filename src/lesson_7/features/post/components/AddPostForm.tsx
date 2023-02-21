import { ChangeEvent, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../app/stores';
import { selectAllUsers } from '../../users/userSelector';
import { TStatus } from '../../../typescript';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from '../postsSlice';

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useAppSelector(selectAllUsers);

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId: Number(userId) }).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
        navigate('/');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };


  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          name="postAuthor"
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type='submit' disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;