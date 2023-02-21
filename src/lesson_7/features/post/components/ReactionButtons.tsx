
import { FC, PropsWithChildren } from "react";
import { IPost, IReactions } from "../../../typescript";
import { useAddReactionMutation } from "../postsSlice";

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
  const [addReaction] = useAddReactionMutation();

  const handleReaction = async (name: keyof IReactions) => {
    const newValue = post.reactions[name] + 1;
    await addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } });
  };

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          handleReaction(name as keyof IReactions)
        }
      >
        {emoji} {post.reactions[name as keyof IReactions]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;