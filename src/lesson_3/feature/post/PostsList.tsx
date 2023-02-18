import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/stores';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { selectAllPosts, getPostsStatus, getPostsErrors } from './postsSelector';
import { fetchPosts } from './postsThunk';

const PostsList = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(getPostsStatus);
  const postsErrors = useAppSelector(getPostsErrors);

  const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPost.map(post => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className='postCredit'>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus]);


  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;