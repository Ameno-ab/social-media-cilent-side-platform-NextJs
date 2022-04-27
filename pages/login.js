import { useState,UseContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../context";

import AuthForm from "../components/forms/AuthForm";
const Login = () => {
  const [email, setEmail] = useState("amen@gmail.com");
  const [password, setPassword] = useState("srttsertr");

  const [loading, setLoading] = useState(false);

  const [state,setState] = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`,
        {
          email,
          password,
        }
      );
      if(data.error){
        toast.error(data.error);
        setLoading(false);
      }else{
      setState({
        user:data.user,
        token:data.token,
      })
      //save in localStorage
      window.localStorage.setItem("auth",JSON.stringify(data));
      // console.log(data);
        router.push("/user/dashboard");
    } 
  }catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  if(state && state.token) router.push("/user/dashboard")
  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>
      {/* {loading ? <h1>laoding</h1> : ""} */}
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            not yet regisred{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div>
      <div className="row">

        <div className="col">
        <p className="text-center">
            {" "}
            <Link href="/forgot-password">
              <a className="text-danger">Forgot password</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
