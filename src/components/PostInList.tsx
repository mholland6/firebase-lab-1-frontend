import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { userInfo } from "os";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Post from "../models/post-model";
import "./PostInList.css";
import { DeleteOutline } from "@mui/icons-material";

interface Props {
  post: Post;
  onDelete: () => void;
}

function PostInList({ post, onDelete }: Props) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 275, margin: 1 }} className="Card">
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          <p>
            To: <Link to={`/user/${post.title}`}>{post.title}</Link>
          </p>
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 16 }} color="text.primary">
          <p>From: {post.author}</p>
        </Typography>
        <Typography variant="body2" align="center">
          {post.postText}
        </Typography>
        <Typography className="PostImage">
          {post.imageUrl && <img src={post.imageUrl} alt="post picture" />}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DeleteOutline />}
          onClick={onDelete}
        >
          Delete Shoutout
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostInList;

// function PostInList({ post, onDelete }: Props) {
//   // const { user } = useContext(AuthContext);
//   return (
//     <div className="Post">
//       <section className="Post__title">
//         <Link to={`/user/${post.title}`}>
//           <p>{post.title}</p>
//         </Link>
//       </section>
//       <section className="Post__author">
//         <p>- from {post.author}</p>
//       </section>
//       <section className="Post__postText">
//         <p>{post.postText}</p>
//       </section>
//       <button onClick={onDelete}>Delete This Shoutout</button>
//     </div>
//   );
// }

// export default PostInList;
