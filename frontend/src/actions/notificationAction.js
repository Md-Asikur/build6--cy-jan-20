import axios from "axios";

export const get_notification = () => async (dispatch) => {
  try {
    const {
      data: { notification },
    } = await axios.get(`/api/v1/get-notification`, {
      withCredentials: true,
    });
    dispatch({
      type: "NOTIFICATION_GET_SUCCESS",
      payload: notification,
    });
  } catch (error) {}
};
export const get_notification_only_unseen = () => async (dispatch) => {
  try {
    const {
      data: { unseennotification },
    } = await axios.get(`/api/v1/get-notification-only-unseen`, {
      withCredentials: true,
    });
    dispatch({
      type: "UNSEEN_NOTIFICATION_GET_SUCCESS",
      payload: unseennotification,
    });
  } catch (error) {}
};
export const seen_notification = (id) => async (dispatch) => {
  try {
     await axios.get(`/api/v1/seen-notification/${id}`, {
      withCredentials: true,
    });
   dispatch({
     type: "NOTIFICATION_SEEN_SUCCESS",
    
   });
  } catch (error) {
  console.log(error.response.data)
  }
};
export const unseen_notification = (id) => async (dispatch) => {
  try {
    await axios.get(`/api/v1/unseen-notification/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "NOTIFICATION_UNSEEN_SUCCESS",
    });
  } catch (error) {
    console.log(error.response.data);
  }
};
export const Delete_notification = (id) => async (dispatch) => {
  try {
    const {
      data: { message },
    } = await axios.get(`/api/v1/delete-notification/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "NOTIFICATION_DELETE_SUCCESS",
      payload: message,
    });
  } catch (error) {}
};