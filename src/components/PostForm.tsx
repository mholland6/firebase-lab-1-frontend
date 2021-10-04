import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { Button } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { storage } from "../firebaseConfig";
import Post from "../models/post-model";
import "./PostForm.css";

interface Props {
  onSubmit: (item: Post) => void;
}

function PostForm({ onSubmit }: Props) {
  const { user } = useContext(AuthContext);
  const userName: string = user?.displayName ?? "Anonymous";
  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [postText, setPostText] = useState("");

  // allow us to access HTML elements in out TypeScript
  const formRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // gather data from state
    const post: Post = {
      title: title,
      author: userName,
      postText: postText,
    };
    // following lines about the file upload
    const files = imageInputRef.current?.files;
    if (files && files[0]) {
      const imageFile = files[0];

      // now upload to cloud storage
      const storagRef = ref(storage, "user-images/" + imageFile.name); // this says where to upload it to
      const snapshot = await uploadBytes(storagRef, imageFile);
      const downloadUrl: string = await getDownloadURL(snapshot.ref);
      post.imageUrl = downloadUrl;
    }

    // send data up to parent via callback prop
    onSubmit(post);
    clearForm();
  }

  function clearForm() {
    formRef.current?.reset();
    // clear form
    setTitle("");
    setPostText("");
  }

  return (
    <form className="PostForm" onSubmit={handleSubmit} ref={formRef}>
      <ul>
        <li className="PostForm__title__Input">
          <label htmlFor="PostForm__title">To:</label>
          <input
            type="text"
            id="PostForm__title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="PostForm__author">From: {userName}</label>

          {/* <input
          type="text"
          id="PostForm__author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        /> */}
        </li>
        <li className="PostForm__postText">
          <label htmlFor="PostForm__postText">Shout Out:</label>
          <textarea
            id="PostForm__postText"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </li>
        <li className="PostForm__image">
          <label htmlFor="PostForm__image">Image (optional)</label>
          <input id="PostForm__image" ref={imageInputRef} type="file" />
        </li>
      </ul>
      <p>
        <Button variant="outlined" type="submit">
          Add Shoutout
        </Button>
      </p>
    </form>
  );
}

export default PostForm;
