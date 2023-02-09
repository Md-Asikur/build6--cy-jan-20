import React, { Fragment, useCallback, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import Comment from "./comment/Comment";
import LikeDislikes from "./LikeDislike/LikeDislike";

import { Link, useHistory, useParams } from "react-router-dom";

import Input from "./comments/Input";
import Comments from "./comments/Comments";

import { createComment, getComments } from "../../actions/commentAction";
import Loading from "./editor/Loading";
import Pagination from "./editor/Pagination.tsx";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const comments = useSelector((state) => state.comments);

  const [showComments, setShowComments] = useState([]);
  const [loadings, setLoading] = useState(false);

  //const blogId = useParams().slug;
  const history = useHistory();
  const { product, loading, error } = useSelector((state) => state.productDetails);

  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const { user } = useSelector((state) => state.user);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [CommentLists, setCommentLists] = useState([]);
  //console.log("video is" , Video);
  const productId = match.params.id;
  const productVariable = {
    productId: productId,
  };
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);
  //comment
  // useEffect(() => {
  //   axios.post("/api/v1/getComments", productVariable).then((response) => {
  //     if (response.data.success) {
  //       //console.log("response.data.comments", response.data.comments);
  //       setCommentLists(response.data.comments);
  //     } else {
  //       alert("Failed to get video Info");
  //     }
  //   });
  // }, [setCommentLists]);

  // const updateComment = (newComment) => {
  //   setCommentLists(CommentLists.concat(newComment));
  // };

  const handleComment = (body) => {
    if (!user) return;

    const data = {
      content: body,
      user: user,
      blog_id: product._id,
      blog_user_id: product.user,

      replyCM: [],
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data));
  };

  useEffect(() => {
    //if (comments?.data?.length === 0) return;
    setShowComments(comments?.data);
  }, [comments?.data]);
  //console.log(showComments);
  const fetchComments = useCallback(async (id, num = 1) => {
    setLoading(true);
    dispatch(getComments(id, num));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!product._id) return;
    const num = history.location.search.slice(6) || 1;
    fetchComments(product._id, num);
  }, [product._id, fetchComments, history]);

  const handlePagination = (num) => {
    if (!product._id) return;
    fetchComments(product._id, num);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              {/* <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {/* <List.Item
              
            actions={[<LikeDislikes product productId={productId} userId={user?._id} />]}
          ></List.Item>
          <Comment
            postId={product._id}
            CommentLists={CommentLists}
            refreshFunction={updateComment}
          /> */}
          {/* {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
            )} */}

          <div style={{ padding: "13px" }}>
            {user ? (
              <Input callback={handleComment} />
            ) : (
              <h5>
                Please <Link to={`/login?product/${product._id}`}>login</Link> to comment.
              </h5>
            )}

            {loadings ? (
              <Loading />
            ) : (
              showComments?.map((comment, index) => (
                <Comments key={index} comment={comment} />
              ))
            )}

            {comments?.total > 1 && (
              <Pagination total={comments?.total} callback={handlePagination} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
