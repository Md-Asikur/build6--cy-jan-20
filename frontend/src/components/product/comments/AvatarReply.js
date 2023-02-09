import React from 'react'
import { Link } from 'react-router-dom'


// import LikeDislikes from '../LikeDislike/LikeDislike'

// interface IProps {
//   user: IUser
//   reply_user?: IUser
// }
const AvatarReply= ({ user, reply_user }) => {
  return (
    <div className="avatar_reply">
      <img src={user.avatar.url} alt="avatar" />

      <div className="ms-1">
        <small>
          <Link to={`/profile/${user._id}`}
          style={{ textDecoration: 'none' }}>
            { user.name }
          </Link>
        </small>

        <small className="reply-text">
          Reply to <Link to={`/profile/${reply_user?._id}`}>
            { reply_user?.name }
          </Link>
        </small>
       
      </div>
       
    </div>
  )
}

export default AvatarReply
