import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../app/stores';
import { postAdded } from './postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const onSavePostClicked = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      dispatch(
        postAdded(title, content)
      );
      setTitle('');
      setContent('');
    }
  };

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
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type='submit'>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;