import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/stores';
import { selectAllUsers } from '../userSelector';

const UsersList = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;