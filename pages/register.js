import { useState ,useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { UserContext } from "../context";

import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
const Register = () => {
  const [name, setName] = useState("amen");
  const [email, setEmail] = useState("amen@gmail.com");
  const [password, setPassword] = useState("srttsertr");
  const [secret, setSecret] = useState("rtrtert");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [state] =useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/register`,
        {
          name,
          email,
          password,
          secret,
        }
      );

    if(data.error){

      toast.error(data.error)
      setLoading(false);
    }else{
      setName("");
      setEmail("");
      setPassword("");
      setSecret("");
      setOk(data.ok);
      setLoading(false)
    } 
  }catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  if (state && state.token) router.push("/");
  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Register</h1>
        </div>
      </div>
      {/* {loading ? <h1>laoding</h1> : ""} */}
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm 
             handleSubmit={handleSubmit}
             name={name}
             setName={setName}
             email={email}
             setEmail={setEmail}
             password={password}
             setPassword={setPassword}
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
            <p>you have successfully registred</p>
            <Link href="/login">
              <a className="btn btn-primary btn-sm">login</a>
            </Link>
          </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col">

          <p className="text-center">Already register?  <Link href="/login">
              <a >login</a>
            </Link></p>
        </div>
      </div>
    </div>
  );
};
export default Register;
