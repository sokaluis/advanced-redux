import { useAppSelector } from '../../../app/stores';
import { selectPostIds } from '../postsSelector';
import { useGetPostsQuery } from '../postsSlice';
import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();

  const orderedPosts = useAppSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPosts.map(postId => <PostsExcerpt key={postId} postId={postId} />);
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <section>
      {content}
    </section>
  );
};

export default PostsList;