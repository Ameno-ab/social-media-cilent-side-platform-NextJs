import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { UserRouter } from "../../components/routes/UserRoute";
import { Toast } from "react-toastify";
import Post from "../../components/cards/post"; 
const PostComments = () => {
  const [post, setPost] = useState({});
  const router = useRouter();
  const _id = router.query._id;
  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);

      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };
  return <Post post={post} />;
};
export default PostComments;
