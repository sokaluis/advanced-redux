import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/stores";
import { selectPostById } from "../postsSelector";
import { selectAllUsers } from "../../users/userSelector";
import { ChangeEvent, useState } from "react";
import { IPost, TStatus } from "../../../typescript";
import { deletePostThunk, updatePostThunk } from "../../../app/thunks";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const post = useAppSelector((state) => selectPostById(state, Number(postId)));
  const users = useAppSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title ?? '');
  const [content, setContent] = useState(post?.body ?? '');
  const [userId, setUserId] = useState(post?.userId!);
  const [requestStatus, setRequestStatus] = useState<TStatus>('idle');


  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      const updatedPost: IPost = {
        ...post,
        id: post.id,
        title,
        body: content,
        userId,
        reactions: post.reactions,
      };
      try {
        setRequestStatus('loading');
        dispatch(updatePostThunk(updatedPost)).unwrap();

        setTitle('');
        setContent('');
        setUserId(0);
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map(user => (
    <option
      key={user.id}
      value={user.id}
    >{user.name}</option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('loading');
      dispatch(deletePostThunk({ ...post, id: post.id })).unwrap();

      setTitle('');
      setContent('');
      setUserId(0);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete the post', err);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
        <button className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;