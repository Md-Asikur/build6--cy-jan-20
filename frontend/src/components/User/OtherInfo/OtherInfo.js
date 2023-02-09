import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../actions/userAction';
import moment from "moment"
import "./other.css"
import Profile from '../Profile';
const OtherInfo = ({ reply_user }) => {
  const {  userDetails } = useSelector((state) => state.userDetails);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const id=useParams().id
  useEffect(() => {
   dispatch(getUserDetails(id))
  }, [])
  
  return (
    <>
      {user && user?._id === id ? (
        <><Profile/></>
      ) : (
        <>
          {" "}
          <h1
            style={{ textAlign: "center", padding: "20px 0px 0px 0px", fontSize: "40px" }}
          >
            User Info
          </h1>
          <div className="other">
            <div>
              <img src={userDetails?.avatar?.url} alt="user img" />
            </div>
            <div>
              <h4>
                <b>UserId</b>: {userDetails?._id}
              </h4>
              <h2>
                <b>UserName</b>: {userDetails?.name}
              </h2>

              <h3>
                <b>UserEmail</b>: {userDetails?.email}
              </h3>
              <h3>
                <b>UserRole</b>: {userDetails?.role}
              </h3>
              <h4>
                <b>UserCreatedAt</b>: {moment(userDetails?.createdAt).format("LLL")}
              </h4>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OtherInfo