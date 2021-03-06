import axios from "axios";
import Post from "../models/post-model";

const baseUrl: string = process.env.REACT_APP_API_URL || "";
if (!baseUrl) {
  console.error("Missing config: REACT_APP_CART_API_URL");
}

export function fetchAllPosts(): Promise<Post[]> {
  return axios.get(`${baseUrl}/shoutouts`).then((res) => res.data);
}

export function addPost(post: Post): Promise<Post> {
  return axios.post(`${baseUrl}/shoutouts`, post).then((res) => res.data);
}

// This service GETS shoutouts to a specific user
export function getPostsToSpecificUser(name: string): Promise<Post[]> {
  return axios
    .get(`${baseUrl}/shoutouts`, { params: { name: name } })
    .then((res) => res.data);
}

// This service DELETES a shoutout on the click of a button
export function deleteShoutout(id: string): Promise<void> {
  return axios.delete(`${baseUrl}/shoutouts/${encodeURIComponent(id)}`);
}
