//import "./FormDialog.css";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Post from "../models/post-model";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../context/auth-context";
import { storage } from "../firebaseConfig";

interface Props {
  onSubmit: (item: Post) => void;
}

function FormDialog({ onSubmit }: Props) {
  // dialog controls
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // form controls
  const { user } = React.useContext(AuthContext);
  const userName: string = user?.displayName ?? "Anonymous";
  const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [postText, setPostText] = useState("");

  // allow us to access HTML elements in out TypeScript
  const formRef = React.useRef<HTMLFormElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
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
    handleClose();
  }

  function clearForm() {
    formRef.current?.reset();
    // clear form
    setTitle("");
    setPostText("");
  }

  return (
    <div>
      {!user ? (
        <Button disabled variant="outlined">
          Sign in to Submit a Shoutout
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          Submit Shoutout
        </Button>
      )}

      <Dialog open={open}>
        <DialogTitle>Shoutout Form</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Enter your Shoutout and press submit!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="PostForm__title"
            label="To"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="email"
            fullWidth
            variant="standard"
            value={userName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Shoutout"
            label="Shoutout"
            type="text"
            fullWidth
            variant="standard"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <section>
            <label htmlFor="PostForm__image">Image (optional)</label>
            <input id="PostForm__image" ref={imageInputRef} type="file" />
          </section>
          {/* <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
