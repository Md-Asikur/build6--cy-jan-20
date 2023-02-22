import axios from "axios";
export const reactPost = async (postId, react, token) => {
  try {
    const { data } = await axios.put(`/api/v1/react-post`, { postId, react });
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const getPostReacts = async (postId) => {
  try {
    const { data } = await axios.get(`/api/v1/get-react-post/${postId}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//unauth
export const getPostReactsUnauth = async (postId) => {
  try {
    const { data } = await axios.get(`/api/v1/get-react-post-unauth/${postId}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
//react comments
export const reactComment = async (postId, react,userId,) => {
  try {
    const { data } = await axios.put(`/api/v1/react-comment`, { postId, react, userId });
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const getCommentReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(`/api/v1/get-react-comment/${postId}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getCommentReactsUnAuth = async (postId, token) => {
  try {
    const { data } = await axios.get(`/api/v1/get-react-comment-unauth/${postId}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

