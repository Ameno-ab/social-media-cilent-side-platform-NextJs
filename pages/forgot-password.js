import { useState ,useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { UserContext } from "../context";

import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { useRouter } from "next/router";
const forgotPassword = () => {
  
  const [email, setEmail] = useState("amen@gmail.com");
  const [newpassword, setNewPassword] = useState("srttsertr");
  const [secret, setSecret] = useState("rtrtert");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [state] =useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`,
        {
         
          email,
          newpassword,
          secret,
        }
      );
      console.log("forgot password res data =>" ,data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
   
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setOk(true);
        setLoading(false);
      }
     } catch (err)
     {
      console.log(err)
      setLoading(false);
    }
  };
  if (state && state.token) router.push("/");
  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Forgot-password</h1>
        </div>
      </div>
      {/* {loading ? <h1>laoding</h1> : ""} */}
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <ForgotPasswordForm 
             handleSubmit={handleSubmit}
     
             email={email}
             setEmail={setEmail}
             newpassword={newpassword}
             setNewPassword={setNewPassword}
             secret={secret}
             setSecret={setSecret}
             loading={loading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Modal
            title="CONGRADULATION"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>congrats! You now can login with your new password</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">login</a>
            </Link>
          </Modal>
        </div>
      </div>
      
    </div>
  );
};
export default forgotPassword;
