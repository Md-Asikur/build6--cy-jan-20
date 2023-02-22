import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCommentReacts, getCommentReactsUnAuth, reactComment } from "../../../actions/reactActions";

import {
  replyComment,
  updateComment,
  deleteComment,
} from "../../../actions/commentAction";

import Input from "./Input";
import LikeDislikes from "../LikeDislike/LikeDislike";
import { useParams } from "react-router-dom";
import ReactsPopup from "../react/ReactPopups";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
// interface IProps {
//   comment: IComment
//   showReply: IComment[]
//   setShowReply: (showReply: IComment[]) => void
// }

const CommentList = ({ children, comment, showReply, setShowReply, match }) => {
  const [onReply, setOnReply] = useState(false);
  //const { auth } = useSelector((state: RootStore) => state)
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [edit, setEdit] = useState();
  //react post
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);

  const [checkSaved, setCheckSaved] = useState();
  useEffect(() => {
    if (user) {
      getReactsPost();
    } else {
      getReactsPostUnauth()
    }
  }, [comment,user]);

  const getReactsPost = async () => {
    const res = await getCommentReacts(comment._id);
    console.log(res)
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };
  //un auth
  const getReactsPostUnauth = async () => {
    const res = await getCommentReactsUnAuth(comment._id);
   
    setReacts(res.reacts);
    //setCheck(res.check);
    setTotal(res.total);
   
  };

  const reactHandler = async (type) => {
    reactComment(comment._id, type,user?._id);
    if (check == type) {
      setCheck();
      let index = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts?.findIndex((x) => x.react == type);
      let index1 = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
        console.log("reacts", reacts);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
        console.log(reacts);
      }
    }
  };
  //react part end
  const handleReply = (body) => {
    if (!user) return;

    const data = {
      user: user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      replyCM: [],
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString(),
    };

    setShowReply([data, ...showReply]);
    // dispatch(replyComment(data, auth.access_token))
    dispatch(replyComment(data));
    setOnReply(false);
  };

  const handleUpdate = (body) => {
    if (!user || !edit) return;

    if (body === edit.content) return setEdit(undefined);

    const newComment = { ...edit, content: body };
    // dispatch(updateComment(newComment, auth.access_token))
    dispatch(updateComment(newComment));
    setEdit(undefined);
  };

  const handleDelete = (comment) => {
    if (!user) return;
    //dispatch(deleteComment(comment, auth.access_token));
    dispatch(deleteComment(comment));
  };

  const Nav = (comment) => {
    return (
      <div style={{ float: "right" }}>
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
  };

  return (
    <div className="w-100">
      {edit ? (
        <Input callback={handleUpdate} edit={edit} setEdit={setEdit} />
      ) : (
        <div className="comment_box">
          <div
            className="p-2"
            dangerouslySetInnerHTML={{
              __html: comment.content,
            }}
            style={{ display: "flex" }}
          />

          <div className="d-flex justify-content-between p-2">
            <small style={{ cursor: "pointer" }} onClick={() => setOnReply(!onReply)}>
              {onReply ? "- Cancel -" : "- Reply -"}
            </small>

            <small className="d-flex">
              <div className="comment_nav">
                {comment.blog_user_id === user?._id || user?.role === "admin" ? (
                  comment.user._id === user._id ? (
                    Nav(comment)
                  ) : (
                    <>
                      <div style={{ float: "right" }}>
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
                    </>
                  )
                ) : (
                  comment.user._id === user?._id && Nav(comment)
                )}
              </div>

              <div>{new Date(comment.createdAt).toLocaleString()}</div>
            </small>
          </div>
          {/* <LikeDislikes
            comment
            // productId={productId}
            commentId={comment?._id}
            userId={user?._id}
            allComment={comment}
          /> */}
          <div className="post_infos">
            <div className="reacts_count">
              <div className="reacts_count_imgs">
                {reacts &&
                  reacts
                    .sort((a, b) => {
                      return b.count - a.count;
                    })
                    .slice(0, 3)
                    .map(
                      (react, i) =>
                        react.count > 0 && (
                          <img
                            src={`../../../reacts/${react.react}.svg`}
                            alt=""
                            key={i}
                          />
                        )
                    )}
              </div>
                <div className="reacts_count_num" style={{fontWeight:"600",fontSize:"20px"}}>{total > 0 && total}</div>
              <div className="post_actions">
                <ReactsPopup
                  visible={visible}
                  setVisible={setVisible}
                  reactHandler={reactHandler}
                />

                <div
                  className="post_action hover1"
                  onMouseOver={() => {
                    setTimeout(() => {
                      setVisible(true);
                    }, 500);
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      setVisible(false);
                    }, 500);
                  }}
                  onClick={() => reactHandler(check ? check : "like")}
                >
                  {check ? (
                    <img
                      src={`../../../reacts/${check}.svg`}
                      alt=""
                      className="small_react"
                      style={{ width: "18px" }}
                    />
                  ) : (
                   user && <ThumbUpOffAltIcon style={{ display: "block" }} />
                  )}
                  <span
                    style={{
                      color: `
          
          ${
            check === "like"
              ? "#4267b2"
              : check === "love"
              ? "#f63459"
              : check === "haha"
              ? "#f7b125"
              : check === "sad"
              ? "#f7b125"
              : check === "wow"
              ? "#f7b125"
              : check === "angry"
              ? "#e4605a"
              : ""
          }
          `,
                    }}
                  >
                    {check ? check : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {onReply && <Input callback={handleReply} />}

      {children}
    </div>
  );
};

export default CommentList;
