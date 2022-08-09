import { useSelector } from 'react-redux';
import { usersSelector } from './states/Users';

const PostAuthor = ({ userId }) => {
  const users = useSelector(usersSelector);
  const author = users.find((user) => user.id === userId);

  return (
    <div className='author'>
      <span className='author-name'>
        by {author ? author.name : 'unknow author'}
      </span>
    </div>
  );
};

export default PostAuthor;
