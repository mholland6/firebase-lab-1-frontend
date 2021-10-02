import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Post from "../models/post-model";
import "./PostForm.css";

interface Props {
  onSubmit: (item: Post) => void;
}

function PostForm({ onSubmit }: Props) {
  const { user } = useContext(AuthContext);
  const userName: string = user?.displayName as string;
  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [postText, setPostText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // gather data from state
    const post: Post = {
      title: title,
      author: userName,
      postText: postText,
    };
    // send data up to parent via callback prop
    onSubmit(post);
    // clear form
    setTitle("");
    setPostText("");
  }

  return (
    <form className="PostForm" onSubmit={handleSubmit}>
      <p>
        <label htmlFor="PostForm__title">To</label>
        <input
          type="text"
          id="PostForm__title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="PostForm__author">From</label>
        <p>{userName}</p>
        {/* <input
          type="text"
          id="PostForm__author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /> */}
      </p>
      <p>
        <label htmlFor="PostForm__postText">Shout Out</label>
        <textarea
          id="PostForm__postText"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </p>
      <p>
        <button type="submit">Add</button>
      </p>
    </form>
  );
}

export default PostForm;
