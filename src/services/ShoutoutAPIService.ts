import axios from "axios";
import Post from "../models/post-model";


const baseUrl: string = process.env.REACT_APP_API_URL || "";
if (!baseUrl) {
  console.error("Missing config: REACT_APP_CART_API_URL");
}

export function fetchAllPosts(): Promise<Post[]> {
  return axios.get(`${baseUrl}/shoutouts`)
    .then(res => res.data);
}

export function addPost(post: Post): Promise<Post> {
  return axios.post(`${baseUrl}/shoutouts`, post)
    .then(res => res.data);
}
