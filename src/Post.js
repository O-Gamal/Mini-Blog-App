import { useDispatch } from 'react-redux';
import { likePost } from './states/Posts';
import moment from 'moment';
import PostAuthor from './PostAuthor';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <article className='post'>
      <div>
        <div className='post-container'>
          <Link className='link post-header' to={`post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.body.substring(0, 250)} ...</p>
        </div>
        <div className='post-meta'>
          <PostAuthor userId={post.userId} />
          <span className='post-date'>{moment(post.date).fromNow()}</span>
        </div>
      </div>
      <button className='like' onClick={() => dispatch(likePost(post.id))}>
        <span className='material-symbols-outlined'>arrow_drop_up</span>
        {post.likesCount}
      </button>
    </article>
  );
};

export default Post;
