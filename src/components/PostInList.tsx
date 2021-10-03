import { userInfo } from "os";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Post from "../models/post-model";
import "./PostInList.css";

interface Props {
  post: Post;
  onDelete: () => void;
}

function PostInList({ post, onDelete }: Props) {
  // const { user } = useContext(AuthContext);
  return (
    <div className="Post">
      <section className="Post__title">
        <Link to={`/user/${post.title}`}>
          <p>{post.title}</p>
        </Link>
      </section>
      <section className="Post__author">
        <p>- from {post.author}</p>
      </section>
      <section className="Post__postText">
        <p>{post.postText}</p>
      </section>
      <button onClick={onDelete}>Delete This Shoutout</button>
    </div>
  );
}

export default PostInList;
