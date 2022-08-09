import { useSelector } from 'react-redux';
import { postsSelector, getPostsStatus, getPostsError } from './states/Posts';
import Post from './Post';

const Posts = () => {
  const posts = useSelector(postsSelector);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  let content;
  if (postsStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (postsStatus === 'failed') {
    content = <div>Error: {postsError}</div>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => <Post key={post.id} post={post} />);
  }

  return (
    <section className='section posts'>
      <h1 className='section-title'>Latest articles:</h1>
      <div className='posts-container'>{content}</div>
    </section>
  );
};

export default Posts;
