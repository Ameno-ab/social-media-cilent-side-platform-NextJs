import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import AdminRouter from "../../components/routes/AdminRoute";
import renderHTML from "react-render-html";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  const [state, setState] = useContext(UserContext);

  const [posts, setPosts] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      // console.log("user posts =>", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error("post deleted");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRouter>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>ADMIN PANEL</h1>
          </div>
        </div>
        <div className="row py-4">
          <div className="col-md-8 offset-md-2 ">
            {posts && posts.map((post) => (
              <div key={post._id} className="d-flex justify-content-between">
                <div>{renderHTML(post.content)}</div>
                <div
                  onClick={() => handleDelete(post)}
                  className="text-danger"
                >Delete</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminRouter>
  );
};
export default Admin;
