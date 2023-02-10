


import { 
  
  GET_COMMENTS,
  
  UPDATE_COMMENT,
  UPDATE_REPLY,
 
  DELETE_COMMENT,
  DELETE_REPLY,
 
  REPLY_COMMENT,
  ALERT,
  CREATE_COMMENT
} from '../constants/CommentConstant'


import { postAPI, getAPI, patchAPI, deleteAPI } from "../utils/FetchData";




export const createComment = (
  data
) => async(dispatch) => {
  
  try {
   const res= await postAPI('comment', data)
//console.log("dta",res)
    dispatch({
      type: CREATE_COMMENT,
      payload: { ...res.data, user: data.user }
    })
    
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const getComments = (
  id, num
) => async(dispatch) => {
  try {
    let limit = 2;

    const res = await getAPI(`comments/product/${id}?page=${num}&limit=${limit}`)

    dispatch({
      type: GET_COMMENTS,
      payload: {
        data: res.data.comments,
        total: res.data.total
      }
    })
    
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const replyComment = (
  data
) => async(dispatch) => {
  
  try {
  const res=  await postAPI('reply_comment', data)
//console.log("repdta",res)
    dispatch({
      type: REPLY_COMMENT,
      payload: {
        ...res.data,
        user: data.user,
        reply_user: data.reply_user,
      },
    });
    
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const updateComment = (
  data
) => async(dispatch) => {
 
  try {
    dispatch({ 
      type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT, 
      payload: data 
    })

    await patchAPI(`comment/${data._id}`, { data })

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const deleteComment = (
  data
) => async(dispatch) => {
  
  try {
    dispatch({ 
      type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT, 
      payload: data 
      
    })
    console.log("data",data);
    await deleteAPI(`comment/${data._id}`)

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}