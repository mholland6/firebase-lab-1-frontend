import { useEffect, useState } from "react";
import Post from "../models/post-model";
import { addPost, fetchAllPosts } from "../services/ShoutoutAPIService";
import PostForm from "./PostForm";
import PostInList from "./PostInList";

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

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

  return (
    <div className="PostList">
      <div>
        {posts.map((post) => (
          <PostInList post={post} key={post._id} />
        ))}
      </div>
      <PostForm onSubmit={handleAddPost} />
    </div>
  );
}

export default PostList;
