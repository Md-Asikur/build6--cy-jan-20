import Rating from "react-rating-stars-component";
import React, { useEffect, useState } from "react";
import profilePng from "../images/Profile.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { clearErrors, deleteReviews } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
const ReviewCard = ({ review,history }) => {
  const { user } = useSelector((state) => state.user);
  
  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector((state) => state.review);
  
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
 const [productId, setProductId] = useState("");

 const deleteReviewHandler = (reviewId) => {
  alert.error(`This Action Only Perform By Admin!`)
 };

  return (
    <div className="reviewCard">
      <img src={review.userImg} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
      {review?.user === user?._id || user?.role === "admin" ? (
        <Button
          style={{ color: "red" }}
          onClick={() => deleteReviewHandler()}
        >
          <DeleteIcon />
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewCard;
