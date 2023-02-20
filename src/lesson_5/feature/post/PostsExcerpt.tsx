import { PropsWithChildren, FC, memo } from 'react';
import { IPost } from './postsSlice';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { Link } from 'react-router-dom';

interface PostsExcerptProps extends PropsWithChildren {
  post: IPost;
}

let PostsExcerpt: FC<PostsExcerptProps> = ({ post }) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p className='excerpt'>{post.body.substring(0, 75)}...</p>
      <p className='postCredit'>
        <Link to={`/post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

PostsExcerpt = memo(PostsExcerpt);

export default PostsExcerpt;