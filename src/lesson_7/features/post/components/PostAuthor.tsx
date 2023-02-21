import { FC, PropsWithChildren } from 'react';
import { useAppSelector } from '../../../app/stores';
import { selectAllUsers } from '../../users/userSelector';
import { Link } from 'react-router-dom';

interface IPostAuthor extends PropsWithChildren {
  userId: number;
}

const PostAuthor: FC<IPostAuthor> = ({ userId }) => {
  const users = useAppSelector(selectAllUsers);

  const author = users.find(user => user.id === userId);

  return <span>by {author ? <Link to={`user/${userId}`}>{author.name}</Link> : 'Unknown author'}</span>;
};

export default PostAuthor;