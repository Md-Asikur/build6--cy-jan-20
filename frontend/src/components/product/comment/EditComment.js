// import React, { useState } from "react";
// import { Avatar, Input } from "antd";
// import Comment from "@ant-design/compatible/lib/comment";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import LikeDislikes from "../LikeDislike/LikeDislike";
// import { Button } from "@material-ui/core";
// import "./single.css";
// import { useAlert } from "react-alert";
// import { useHistory, useParams } from "react-router-dom";
// const { TextArea } = Input;
// function EditComment(props) {
//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const [CommentValue, setCommentValue] = useState(
//     props.comment.writer?.name ? props.comment.writer?.name : "Mr/Ms: XXX"
//   );
//   const [OpenReply, setOpenReply] = useState(false);
//   const [open, setOpen] = useState(false);
//   const alert = useAlert();
//   const history = useHistory();
//   const { id } = useParams();
//   const handleChange = (e) => {
//     setCommentValue(e.currentTarget.value);
//   };

//   const openReply = () => {
//     setOpenReply(!OpenReply);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const variables = {
//       writer: user?._id,
//       postId: props.postId,
//       responseTo: props.comment._id,
//       content: CommentValue,
//     };

//     axios.post("/api/v1/saveComment", variables).then((response) => {
//       if (response.data.success) {
//         setCommentValue("");
//         setOpenReply(!OpenReply);
//         props.refreshFunction(response.data.result);
//       } else {
//         alert("Failed to save Comment");
//       }
//     });
//   };
//   const onAuth = () => {
//     alert.error("Please Login And Continue");
//     history.push("/login?redirect=products");
//   };
//   const actions = [
//     <LikeDislikes comment commentId={props.comment._id} userId={user?._id} />,

//     <span onClick={openReply} key="comment-basic-reply-to">
//       {OpenReply ? (
//         <Button color="secondary">Cancel</Button>
//       ) : (
//         <Button color="primary">Reply</Button>
//       )}
//     </span>,
//   ];
//   const onCommentToggle = () => {
//     open ? setOpen(true) : setOpen(false)
//     setCommentValue("");
//   };

//   return (
//     <div style={{}}>
//       <Comment
//         actions={actions}
//         author={props.comment.writer?.name ? props.comment.writer?.name : "Mr/Ms: XXX"}
//         avatar={
//           props.comment.writer?.avatar?.url ? (
//             <img
//               src={props.comment.writer?.avatar?.url}
//               alt="image"
//               style={{ height: "50px", width: "50px", borderRadius: "50%" }}
//             />
//           ) : (
//             <img
//               src="/avatar.png"
//               style={{ height: "50px", width: "50px", borderRadius: "50%" }}
//             />
//           )
//         }
//         content={<p>{props.comment.content}</p>}
//       ></Comment>

//       {OpenReply && (
//         <form onSubmit={onSubmit} id="commentForm">
//           <TextArea
//             onChange={handleChange}
//             value={CommentValue}
//             placeholder="write some comments"
//           />
//           <br />
//           {isAuthenticated ? (
//             <Button onClick={onSubmit} color="primary" disabled={CommentValue === ""}>
//               Submit
//             </Button>
//           ) : (
//             <Button onClick={onAuth} color="secondary">
//               Login
//             </Button>
//           )}
//           <Button onClick={onCommentToggle} color="secondary">
//             Empty
//           </Button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default EditComment;
