import { FormEvent, useState } from "react";
import Post from "../models/post-model";

interface Props {
  onSubmit: (item: Post) => void;
}

function PostForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [postText, setPostText] = useState("");

  function handleSubmit(e:FormEvent) {
    e.preventDefault();
    // gather data from state
    const post: Post = {
      title: title,
      author: author,
      postText: postText
    }
    // send data up to parent via callback prop
    onSubmit(post);
    // clear form
    setTitle("");
    setAuthor("");
    setPostText("");
  }

  return (
    <form className="PostForm" onSubmit={handleSubmit}>
      <p>
        <label htmlFor="PostForm__title">To</label>
        <input type="text" id="PostForm__title"
               value={title} onChange={e => setTitle(e.target.value)}/>
      </p>
      <p>
        <label htmlFor="PostForm__author">From</label>
        <input type="text" id="PostForm__author"
               value={author} onChange={e => setAuthor(e.target.value)}/>
      </p>
      <p>
        <label htmlFor="PostForm__postText">Shout Out</label>
        <textarea  id="PostForm__postText"
               value={postText} onChange={e => setPostText(e.target.value)}/>
      </p>
      <p>
        <button type="submit">Add</button>
      </p>
    </form>
  );
}

export default PostForm;