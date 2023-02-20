
import { useDispatch } from "react-redux";
import { reactionAdded, IPost } from './postsSlice';
import { FC, PropsWithChildren } from "react";
import { IReactions } from "../../typescript";

interface IReactionButtons extends PropsWithChildren {
  post: IPost;
}

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
};

const ReactionButtons: FC<IReactionButtons> = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name as keyof IReactions }))
        }
      >
        {emoji} {post.reactions[name as keyof IReactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;