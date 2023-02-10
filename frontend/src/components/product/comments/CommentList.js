import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'



import { 
 replyComment,
  updateComment,
  deleteComment
} from '../../../actions/commentAction'

import Input from './Input'
import LikeDislikes from '../LikeDislike/LikeDislike'

// interface IProps {
//   comment: IComment
//   showReply: IComment[]
//   setShowReply: (showReply: IComment[]) => void
// }

const CommentList= ({ 
  children, comment, showReply, setShowReply
}) => {
  const [onReply, setOnReply] = useState(false)
  //const { auth } = useSelector((state: RootStore) => state)
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const [edit, setEdit] = useState()

  const handleReply = (body) => {
    if(!user) return;

    const data = {
      user: user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      replyCM: [],
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString()
    }


    setShowReply([data, ...showReply])
   // dispatch(replyComment(data, auth.access_token))
    dispatch(replyComment(data));
    setOnReply(false)
  }


  const handleUpdate = (body) => {
    if(!user || !edit) return;

    if(body === edit.content) 
      return setEdit(undefined)
    
    const newComment = {...edit, content: body}
   // dispatch(updateComment(newComment, auth.access_token))
     dispatch(updateComment(newComment));
      setEdit(undefined)
  }

  const handleDelete = (comment) => {
    if (!user) return;
    //dispatch(deleteComment(comment, auth.access_token));
    dispatch(deleteComment(comment))
  }


  const Nav = (comment) => {
    return (
      <div style={{float:"right"}}>
        <i
          className="fa fa-trash-o"
          aria-hidden="true"
         
          onClick={() => handleDelete(comment)}
        />
        <i
          
          className="fa fa-pencil-square-o"
          aria-hidden="true"
          onClick={() => setEdit(comment)}
        />
      </div>
    );
  }

  return (
    <div className="w-100">
      {
        edit
        ? <Input 
          callback={handleUpdate} 
          edit={edit}
          setEdit={setEdit}
        />

        : <div className="comment_box">
            <div className="p-2" dangerouslySetInnerHTML={{
              __html: comment.content
            }} />
 
            <div className="d-flex justify-content-between p-2">
              <small style={{cursor: 'pointer'}}
              onClick={() => setOnReply(!onReply)}>
                {onReply ? '- Cancel -' :'- Reply -'}
              </small>

              <small className="d-flex">
                <div className="comment_nav">
                  {
                    comment.blog_user_id === user?._id
                    ? comment.user._id ===user._id
                      ? Nav(comment)
                      : <i className="fas fa-trash-alt mx-2"
                      onClick={() => handleDelete(comment)} />
                    : comment.user._id === user?._id && Nav(comment)
                  }
                </div>

                <div>
                  { new Date(comment.createdAt).toLocaleString() }
                </div>
              </small>
             
            </div>
            <LikeDislikes comment commentId={comment._id } userId={user?._id } allComment={comment} />
          </div>
          
      
      }

      {
        onReply && <Input callback={handleReply} />
      }
      
      { children }
    </div>
  )
}

export default CommentList
