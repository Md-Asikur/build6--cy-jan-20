import React, { useEffect, useState } from "react";
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { Tooltip } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  
   const { isAuthenticated } = useSelector((state) => state.user);
  const alert = useAlert();
  const history = useHistory();
  
  
  //console.log("like filted", Like);
  //console.log("com", props.comments);
  
 
  let variable = {};

 
    variable = {
      userId: props.userId,
      productId: props.productId,

      commentId: props.commentId,
    };
  
  // } else {
  //   variable = { productId: props.productId, userId: props.userId };
  // }

  useEffect(() => {
    axios.post("/api/v1/getLikes", variable).then((response) => {
       //console.log("getLikes", response.data);

      if (response.data.success) {
        //How many likes does this video or comment have
        setLikes(response.data.likes?.length);
        // setLike(response.data.likes);

        //if I already click this like button or not
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    axios.post("/api/v1/getDislikes", variable).then((response) => {
      //console.log("getDislike", response.data);
      if (response.data.success) {
        //How many likes does this video or comment have
        setDislikes(response.data.dislikes?.length);
        // setDisLike(response.data.dislikes);
        //if I already click this like button or not
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, [variable]);

  const onLike = () => {
   if (LikeAction === null) {
     axios.post("/api/v1/upLike", variable).then((response) => {
       if (response.data.success) {
         setLikes(Likes + 1);
         setLikeAction("liked");

         //If dislike button is already clicked

         if (DislikeAction !== null) {
           setDislikeAction(null);
           setDislikes(Dislikes - 1);
         }
       } else {
         alert("Failed to increase the like");
       }
     });
   } else {
     axios.post("/api/v1/unLike", variable).then((response) => {
       if (response.data.success) {
         setLikes(Likes - 1);
         setLikeAction(null);
       } else {
         alert("Failed to decrease the like");
       }
     });
   }
   
  };

  const onDisLike = () => {
    if (DislikeAction !== null) {
      axios.post("/api/v1/unDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("Failed to decrease dislike");
        }
      });
    } else {
      axios.post("/api/v1/upDisLike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");

          //If dislike button is already clicked
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert("Failed to increase dislike");
        }
      });
    }
  };
const onAuth = () => {
  alert.error("Please Login And Continue");
 // history.push("/login");
};
  return (
    <React.Fragment>
      {isAuthenticated ? (
        <>
          {" "}
        
              <span
                key="comment-basic-like"
                onClick={onLike}
                style={{ cursor: "pointer" }}
              >
                <Tooltip title="Like">
                  {LikeAction === "liked" ? <LikeFilled /> : <LikeOutlined />}
                </Tooltip>
                <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
              </span>
          
         
          <span
            key="comment-basic-dislike"
            onClick={onDisLike}
            style={{ cursor: "pointer" }}
          >
            <Tooltip title="Dislike">
              {DislikeAction === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
            </Tooltip>
            <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
          </span>
        </>
      ) : (
        <>
          {" "}
          <span key="comment-basic-like" onClick={onAuth} style={{ cursor: "pointer" }}>
            <Tooltip title="Like">
              {LikeAction === "liked" ? <LikeFilled /> : <LikeOutlined />}
            </Tooltip>
            <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
          </span>
          &nbsp;&nbsp;
          <span
            key="comment-basic-dislike"
            onClick={onAuth}
            style={{ cursor: "pointer" }}
          >
            <Tooltip title="Dislike">
              {DislikeAction === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
            </Tooltip>
            <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
          </span>
        </>
      )}
    </React.Fragment>
  );
}

export default LikeDislikes;
