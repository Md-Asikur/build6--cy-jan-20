import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfilePic } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useHistory } from "react-router-dom";
const UpdateProfilePic = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("avatar", avatar);
    dispatch(updateProfilePic(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Picture</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div
                  id="updateProfileImage"
                  style={{ display: "block", textAlign: "center" }}
                >
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input type="submit" value="Update" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfilePic;
