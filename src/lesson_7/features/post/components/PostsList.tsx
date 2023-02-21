import { useAppSelector } from '../../../app/stores';

import { selectPostIds, getPostsStatus, getPostsErrors } from '../postsSelector';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
  const orderedPosts = useAppSelector(selectPostIds);
  const postStatus = useAppSelector(getPostsStatus);
  const postsErrors = useAppSelector(getPostsErrors);

  let content;
  if (postStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map(postId => <PostsExcerpt key={postId} postId={postId} />);
  } else if (postStatus === 'failed') {
    content = <p>{postsErrors?.toString()}</p>;
  }


  return (
    <section>
      {content}
    </section>
  );
};

export default PostsList;