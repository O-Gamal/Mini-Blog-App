import { useSelector, useDispatch } from 'react-redux';
import { selectPostById, likePost, deletePost } from './states/Posts';
import PostAuthor from './PostAuthor';
import { useParams, Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const PostPage = ({ setReqStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const handelDeletePost = () => {
    try {
      setReqStatus('pending');
      dispatch(deletePost(post));
      navigate('/');
    } catch (err) {
      console.error('failed to delete post', err);
    } finally {
      setReqStatus('idle');
    }
  };

  return (
    <section className='post-page'>
      <hr />
      {!post ? (
        <h2>Post not found!</h2>
      ) : (
        <div className='post'>
          <article>
            <div>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
            <div className='post-meta'>
              <PostAuthor className='post-author' userId={post.userId} />
              <span className='post-date'>{moment(post.date).fromNow()}</span>
              <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
              <button className='delete-post-btn' onClick={handelDeletePost}>
                Delete Post
              </button>
            </div>
          </article>
          <button className='like' onClick={() => dispatch(likePost(post.id))}>
            <span className='material-symbols-outlined'>arrow_drop_up</span>
            {post.likesCount}
          </button>
        </div>
      )}
    </section>
  );
};

export default PostPage;
