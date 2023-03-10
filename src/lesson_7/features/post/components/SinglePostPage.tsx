import { Link, useParams } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useAppSelector } from "../../../app/stores";
import { selectPostById } from "../postsSelector";
import PostAuthor from "./PostAuthor";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;