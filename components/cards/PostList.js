import { useContext } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/Postimage";
import { imageSource } from "../../functions";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import Post from "../../components/cards/post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return <>{posts && posts.map((post) => <Post post={post} handleDelete={handleDelete } handleLike={handleLike} handleUnlike={handleUnlike} handleComment={handleComment}/> )}</>;
};
export default PostList;
