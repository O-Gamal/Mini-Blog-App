import { useDispatch } from "react-redux";
import { likePost } from "./states/Posts";
import moment from "moment";
import PostAuthor from "./PostAuthor";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <article>
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      <div className="post-meta">
        <PostAuthor userId={post.userId} />
        <span className="post-date">{moment(post.date).fromNow()}</span>
        <button className="like" onClick={() => dispatch(likePost(post.id))}>
          <span className="material-symbols-outlined">arrow_drop_up</span>
          {post.likesCount}
        </button>
      </div>
    </article>
  );
};

export default Post;
