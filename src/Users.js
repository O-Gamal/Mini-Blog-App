import { useSelector } from 'react-redux';
import { usersSelector } from './states/Users';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(usersSelector);

  return (
    <section className='users'>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Users;
