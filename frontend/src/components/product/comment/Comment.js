import React, { useEffect, useState } from "react";
import { Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
const { TextArea } = Input;

function Comment(props) {
  const { user,isAuthenticated} = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");
  const [CommentLists, setCommentLists] = useState([]);
  const [open, setOpen] = useState(false);
   const alert = useAlert();
   const history = useHistory();
  //console.log("video is" , Video);
   const { product } = useSelector((state) => state.productDetails);
  const productVariable = {
    productId: product._id,
  };
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user?._id,
      postId: props.postId,
    };

    axios.post("/api/v1/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");

        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };
  ///me
   useEffect(() => {
     axios.post("/api/v1/getComments", productVariable).then((response) => {
       if (response.data.success) {
        
         setCommentLists(response.data.comments);
       } else {
         alert("Failed to get video Info");
       }
     });
   }, [setCommentLists]);
  const onCommentToggle = () => {
    open ? setOpen(true) : setOpen(false);
    setComment("")
  }
  const onAuth = () => {
    alert.error("Please Login And Continue");
    history.push("/login");
  };

  return (
    <div>
      <br />
      {/* <p> replies</p> */}
      {/* Root Comment Form */}
      <form onSubmit={onSubmit} id="commentForm">
        <TextArea
          //style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        {isAuthenticated ? (
          <Button onClick={onSubmit} color="primary" disabled={Comment === ""}>
            Submit
          </Button>
        ) : (
          <Button onClick={onAuth} color="secondary">
            Login
          </Button>
        )}
        <Button onClick={onCommentToggle} color="secondary">
          Empty
        </Button>
      </form>
      {/* <hr /> */}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />

                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}
      {CommentLists && CommentLists.length > 5 ? (
        <form onSubmit={onSubmit} id="commentForm">
          <TextArea
            onChange={handleChange}
            value={Comment}
            placeholder="write some comments"
          />
          <br />
          {isAuthenticated ? (
            <Button onClick={onSubmit} color="primary" disabled={Comment === ""}>
              Submit
            </Button>
          ) : (
            <Button onClick={onAuth} color="secondary">
              Login
            </Button>
          )}
          <Button onClick={onCommentToggle} color="secondary">
            Empty
          </Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default Comment;
