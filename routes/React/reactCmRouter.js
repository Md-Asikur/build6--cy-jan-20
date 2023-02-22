const express = require("express");
const { reactPostComment, getReactsComment, getReactsCommentUnauth } = require("../../controllers/React/CmReactCtrl");

const { isAuthenticatedUser } = require("../../middleware/auth");
const router = express.Router();
router.put("/react-comment", reactPostComment);
router.get("/get-react-comment/:id([0-9a-fA-F]{24})", isAuthenticatedUser, getReactsComment);
router.get("/get-react-comment-unauth/:id([0-9a-fA-F]{24})",  getReactsCommentUnauth);
module.exports = router;
