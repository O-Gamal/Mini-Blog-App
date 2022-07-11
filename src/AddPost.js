import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./states/Posts";
import { usersSelector } from "./states/Users";

const AddPost = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(usersSelector);

  const canSave = title.length > 0 && body.length > 0 && userId.length > 0;

  const handleAddPost = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(addPost(title, body, userId));
      setTitle("");
      setBody("");
      setUserId("");
    }
  };

  return (
    <section className="add-new-post-area">
      <h2>Add a new post</h2>
      <form>
        <div>
          <label htmlFor="postTitle">Post Title</label>
          <input
            type="text"
            placeholder="Enter a title for your post ..."
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postBody">Post Content</label>
          <textarea
            type="text"
            placeholder="Enter the content of your post ..."
            id="postBody"
            name="postBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postUserId">Post Author</label>
          <select
            id="postAuthor"
            name="postAuthor"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleAddPost} disabled={!canSave}>
          Add Post
        </button>
      </form>
    </section>
  );
};

export default AddPost;
