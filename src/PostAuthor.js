import { useSelector } from "react-redux";
import { usersSelector } from "./states/Users";
import defaultImg from "./assets/images/default.jpg";

const PostAuthor = ({ userId }) => {
  const users = useSelector(usersSelector);
  const author = users.find((user) => user.id === userId);

  return (
    <div className="author">
      {author && (
        <img
          className="author-img"
          src={author.img || defaultImg}
          alt={author.name}
        />
      )}
      <span className="author-name">
        {author ? author.name : "unknow author"}
      </span>
    </div>
  );
};

export default PostAuthor;
