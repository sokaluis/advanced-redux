import { PropsWithChildren, FC } from 'react';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { Link } from 'react-router-dom';
import { IPost } from '../../typescript';

interface PostsExcerptProps extends PropsWithChildren {
  post: IPost;
}

const PostsExcerpt: FC<PostsExcerptProps> = ({ post }) => {
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

// Memo solution
// PostsExcerpt = memo(PostsExcerpt);

export default PostsExcerpt;