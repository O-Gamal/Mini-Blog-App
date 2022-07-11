import { useSelector, useDispatch } from "react-redux";
import { postsSelector } from "./states/Posts";
import { likePost } from "./states/Posts";
import moment from "moment";
import PostAuthor from "./PostAuthor";

const Posts = () => {
  const posts = useSelector(postsSelector);
  const dispatch = useDispatch();

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  console.log(orderedPosts);

  const renderPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
      <div className="post-meta">
        <PostAuthor userId={post.userId} />
        <span className="post-date">{moment(post.date).fromNow()}</span>
        <button className="like" onClick={() => dispatch(likePost(post.id))}>
          <span class="material-symbols-outlined">arrow_drop_up</span>
          {post.likesCount}
        </button>
      </div>
    </article>
  ));

  return <section className="post">{renderPosts}</section>;
};

export default Posts;
