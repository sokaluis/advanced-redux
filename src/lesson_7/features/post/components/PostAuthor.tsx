import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '../../../app/stores';
import { selectAllUsers } from '../../users/userSelector';

interface IPostAuthor extends PropsWithChildren {
  userId: number;
}

const PostAuthor: FC<IPostAuthor> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find(user => user.id === userId);

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};

export default PostAuthor;