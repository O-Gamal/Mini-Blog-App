import { useSelector } from 'react-redux';
import { selectUserById } from './states/Users';
import { postsSelector } from './states/Posts';
import { Link, useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const userPosts = useSelector((state) => {
    const posts = postsSelector(state);
    return posts.filter((post) => post.userId === Number(userId));
  });

  const postTitles = userPosts.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section className='author-posts'>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
