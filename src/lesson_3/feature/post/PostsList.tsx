import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/stores';

import { selectAllPosts, getPostsStatus, getPostsErrors } from './postsSelector';
import { fetchPosts } from './postsThunk';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(getPostsStatus);
  const postsErrors = useAppSelector(getPostsErrors);

  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />);
  } else if (postStatus === 'failed') {
    content = <p>{postsErrors?.message}</p>;
  }

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus]);


  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;