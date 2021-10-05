import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle } from "../firebaseConfig";
import Post from "../models/post-model";
import {
  addPost,
  deleteShoutout,
  getPostsToSpecificUser,
} from "../services/ShoutoutAPIService";
import PostForm from "./PostForm";
import PostInList from "./PostInList";
import "./PostsToSpecificUser.css";

interface RouteParams {
  name: string;
}

function PostsToSpecificUser() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { name } = useParams<RouteParams>();
  const { user } = useContext(AuthContext);

  const loadPosts = useCallback(
    function () {
      getPostsToSpecificUser(name).then((itemsFromApi) => {
        setPosts(itemsFromApi);
        // console.log(itemsFromApi);
      });
    },
    [name]
  );
  // this only runs once when component first loads
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  function handleAddPost(post: Post) {
    // save the item to the API/Database
    addPost(post).then(() => {
      // After the save completes, reload the array from the API
      loadPosts();
    });
  }

  function handleDeletePost(id: string): void {
    console.log("clicked?");
    deleteShoutout(id).then(() => {
      loadPosts();
    });
  }

  return (
    <div className="PostsToSpecificUser">
      {posts.map((post) => (
        <PostInList
          post={post}
          key={post._id}
          onDelete={() => handleDeletePost(post._id!)}
        />
      ))}

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

export default PostsToSpecificUser;
