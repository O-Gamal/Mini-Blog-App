import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postsSelector,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./states/Posts";
import Post from "./Post";

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(postsSelector);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  let content;
  if (postsStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (postsStatus === "failed") {
    content = <div>Error: {postsError}</div>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => <Post key={post.id} post={post} />);
  }

  return <section className="post">{content}</section>;
};

export default Posts;
