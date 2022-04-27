import { Avatar, List } from "antd";
import { useContext ,useState,useEffect} from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import {RollbackOutlined} from '@ant-design/icons';
import Link from "next/link";
import user from "../../../server/models/user";


const Following = () => {
  const [state,setState] = useContext(UserContext);
  const router = useRouter();
  const [people , setPeople]=useState([])
 

  useEffect(()=>{
      if(state && state.token) fetchFollowing();
  },[state && state.token])
  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo/logo.png";
    }
  };
  const fetchFollowing = async() =>{
try{
    const {data} = await axios.get('/user-following');
    console.log(data);
    setPeople(data);
}catch(err){
    console.log(err);
}
  }
  const handleFollow = async () =>{

  }
  const handleUnfollow = async(user) =>{

       try{
     const {data} = await axios.put('/user-unfollow',{ _id: user._id});
     
     let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });
      //update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      console.log(data);
      toast.error(`unfollowed ${user.name}`);
       }catch(err){
           console.log(err);
       }
  }

  return (
    <div className="row col-md-6 offset-md-3">
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.username}{" "}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointer"
                  >
                    unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Link href='/user/dashboard'><a className='d-flex justify-content-center pt-5'><RollbackOutlined /></a></Link>
    </div>
  );
};
export default Following;
