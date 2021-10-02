import { userInfo } from "os";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Post from "../models/post-model";
import "./PostInList.css";

interface Props {
  post: Post;
}

function PostInList({ post }: Props) {
  const { user } = useContext(AuthContext);
  return (
    <div className="Post">
      <section className="Post__title">
        <p>{post.title}</p>
      </section>
      <section className="Post__author">
        <p>- from {post.author}</p>
      </section>
      <section className="Post__postText">
        <p>{post.postText}</p>
      </section>
    </div>
  );
}

export default PostInList;
