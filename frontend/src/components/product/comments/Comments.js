import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getComments } from '../../../actions/commentAction'
import OtherInfo from '../../User/OtherInfo/OtherInfo'



import AvatarComment from './AvatarComment'
import AvatarReply from './AvatarReply'
import CommentList from './CommentList'



const Comments = ({ comment }) => {
  const dispatch=useDispatch()
  const [showReply, setShowReply] = useState([])
  const [next, setNext] = useState(1)
 
  useEffect(() => {
    if(!comment.replyCM) return;
    setShowReply(comment.replyCM)
  },[comment.replyCM])
 const fetchComments = useCallback(
   async (id, num = 1) => {
    
     dispatch(getComments(id, num));
    
   },
   [dispatch]
 );
  return (
    <div
      className="my-3 d-flex"
      style={{
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? "initial" : "none",
      }}
    >
      <AvatarComment user={comment.user} />

      <CommentList comment={comment} showReply={showReply} setShowReply={setShowReply}>
        {showReply.slice(0, next).map((comment, index) => (
          <div
            key={index}
            style={{
              opacity: comment._id ? 1 : 0.5,

              
              pointerEvents: comment._id ? "initial" : "none",
            }}
            className="reply-gap"
          >
            <AvatarReply user={comment.user} reply_user={comment.reply_user} />
           
            <CommentList
              comment={comment}
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
        ))}

        <div style={{ cursor: "pointer" }}>
          {showReply.length - next > 0 ? (
            <small style={{ color: "crimson" }} onClick={() => setNext(next + 2)}>
              See more comments...
            </small>
          ) : (
            showReply.length > 1 && (
              <small style={{ color: "teal" }} onClick={() => setNext(1)}>
                Hide comments...
              </small>
            )
          )}
        </div>
      </CommentList>
    </div>
  );
}

export default Comments
