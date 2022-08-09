import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='section app-header'>
      <div className='title-area'>
        <h1>
          Your blogging platform. <span>Try it now!</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
