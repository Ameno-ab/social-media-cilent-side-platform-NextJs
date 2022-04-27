import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {toast} from "react-toastify";

import UserRouter from "../../../components/routes/UserRoute";
import PostForm from "../../../components/forms/PostForm";
const EditPost = () => {
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  // console.log("router", router);
  const _id = router.query._id;
  useEffect(() => {
    if (_id) fetchpost();
  }, [_id]);

  const fetchpost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit post to update",content,image);
    try{
        const{data}= await axios.put(`/update-post/${_id}`,{content,image});
        if(data.error){
            toast.error(data.error);
        }
        else{
            toast.success("post Created");
            router.push("/user/dashboard");
        }
    }catch(err){

    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    //  console.log([...formData]);

    setUploading(true);
    try {
      const { data } = await axios.post("/upload-images", formData);
      //  console.log("uploded image=>",data)
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };
  return (
    <UserRouter>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
        </div>
      </div>
    </UserRouter>
  );
};
export default EditPost;
