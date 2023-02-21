import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/stores';
import { selectUserById } from '../userSelector';
import { useGetPostsByUserIdQuery } from '../../post/postsSlice';

const UserPage = () => {
  const { userId } = useParams();
  const user = useAppSelector(state => selectUserById(state, Number(userId)));

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id: any) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;