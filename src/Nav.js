import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <header className='section app-header'>
      <div className='nav-container'>
        <h1 className='logo' onClick={() => navigate('/')}>
          Blogging App
        </h1>
        <nav>
          <ul>
            <li>
              <Link className='link' to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='link' to='post'>
                Create New Post
              </Link>
            </li>
            <li>
              <Link className='link' to='user'>
                Authers
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
