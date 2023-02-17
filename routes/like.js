const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");
const NotificationModel = require("../models/NotificationModel");
const { isAuthenticatedUser } = require("../middleware/auth");

//=================================
//             Likes DisLikes
//=================================

router.post("/getLikes", (req, res) => {
  let variable = {};
  // if (req.body.productId) {
  //   variable = { productId: req.body.productId };
  // } else {
    variable = {
      userId: req.body.userId,
    productId: req.body.productId,

    commentId: req.body.commentId,
  
    };
  // }

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let variable = {};
  // if (req.body.productId) {
  //   variable = { productId: req.body.productId };
  // } else {
    variable = {
     userId: req.body.userId,
    productId: req.body.productId,

    commentId: req.body.commentId,
 
    };
  // }

  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", isAuthenticatedUser,async(req, res) => {
  let variable = {};
  // if (req.body.productId) {
  //   variable = { productId: req.body.productId, userId: req.body.userId };
  // } else {
  variable = {
    userId: req.body.userId,
    productId: req.body.productId,

    commentId: req.body.commentId,
  };
  // }

  const like = new Like(variable);
   
  //save the like information data in MongoDB
  await NotificationModel.create({
     subject: `${req.user.name} liked on your Product`,
     user: req.user,
     prid: req.body.productId,
   });
 like.save((err, likeResult) => {
  

   if (err) return res.json({ success: false, err });
   //In case disLike Button is already clicked, we need to decrease the dislike by 1
   Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
     if (err) return res.status(400).json({ success: false, err });
     res.status(200).json({ success: true });
   });
 });
 
    
});

router.post("/unLike", isAuthenticatedUser,async(req, res) => {
  let variable = {};
  // if (req.body.productId) {
  //   variable = { productId: req.body.productId, userId: req.body.userId };
  // } else {
    variable = {
      userId: req.body.userId,
    productId: req.body.productId,

    commentId: req.body.commentId,
  
    };
  // }
  await NotificationModel.create({
    subject: `${req.user.name} Unliked on your Product`,
    user: req.user,
    prid: req.body.productId,
  });
  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/unDisLike", isAuthenticatedUser,async(req, res) => {
  let variable = {};
  // if (req.body.productId) {
  //   variable = { productId: req.body.productId, userId: req.body.userId };
  // } else {
    variable = {
      userId: req.body.userId,
    productId: req.body.productId,

    commentId: req.body.commentId,
  
    };
  //}
await NotificationModel.create({
  subject: `${req.user.name} UnDisliked on your Product`,
  user: req.user,
  prid: req.body.productId,
});
  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/upDisLike",isAuthenticatedUser,async (req, res) => {
  let variable = {};
  // if (req.body.productId) {
  //   variable = { productId: req.body.productId, userId: req.body.userId };
  // } else {
    variable = { userId: req.body.userId,
    productId: req.body.productId,

    commentId: req.body.commentId,
   };
  //}
await NotificationModel.create({
  subject: `${req.user.name} Dislike on your Product`,
  user: req.user,
  prid: req.body.productId,
});
  const disLike = new Dislike(variable);
  //save the like information data in MongoDB
  disLike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    //In case Like Button is already clicked, we need to decrease the like by 1
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

module.exports = router;
