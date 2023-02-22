const express = require("express")
const { reactPost, getReacts, getReactsUnauth } = require("../../controllers/React/PostReactCtrl")
const { isAuthenticatedUser } = require("../../middleware/auth")
const router = express.Router()
router.put("/react-post", isAuthenticatedUser, reactPost)
router.get("/get-react-post/:id([0-9a-fA-F]{24})", isAuthenticatedUser, getReacts);
router.get("/get-react-post-unauth/:id([0-9a-fA-F]{24})", getReactsUnauth);
module.exports = router;