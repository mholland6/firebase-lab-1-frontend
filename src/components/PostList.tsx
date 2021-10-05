import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle } from "../firebaseConfig";
import Post from "../models/post-model";
import {
  addPost,
  deleteShoutout,
  fetchAllPosts,
} from "../services/ShoutoutAPIService";
import FormDialog from "./FormDialog";
import PostForm from "./PostForm";
import PostInList from "./PostInList";
import "./PostList.css";

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useContext(AuthContext);

  // this only runs once when component first loads
  useEffect(() => {
    loadPosts();
  }, []);

  function loadPosts() {
    fetchAllPosts().then((itemsFromApi) => {
      setPosts(itemsFromApi);
      console.log(itemsFromApi);
    });
  }

  function handleAddPost(post: Post) {
    // save the item to the API/Database
    addPost(post).then(() => {
      // After the save completes, reload the array from the API
      loadPosts();
    });
  }

  function handleDeleteShoutout(id: string): void {
    deleteShoutout(id).then(() => loadPosts());
  }

  return (
    <div className="PostList">
      <div className="FormDialog">
        <FormDialog onSubmit={handleAddPost} />
      </div>
      <div className="DisplayedPosts">
        {posts.map((post) => (
          <PostInList
            post={post}
            key={post._id}
            onDelete={() => handleDeleteShoutout(post._id!)}
          />
        ))}
      </div>
      {user ? (
        <PostForm onSubmit={handleAddPost} />
      ) : (
        <div className="signed-out">
          <p>Sign in to leave a shoutout.</p>
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
      )}
    </div>
  );
}

export default PostList;
