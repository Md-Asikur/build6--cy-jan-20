const express =require("express")
const commentCtrl =require("../controllers/commentCtrl")
const  { isAuthenticatedUser } =require("../middleware/auth") 

const router = express.Router()

router.post('/comment', isAuthenticatedUser, commentCtrl.createComment)

router.get('/comments/product/:id', commentCtrl.getComments)

router.post('/reply_comment', isAuthenticatedUser, commentCtrl.replyComment)

router.patch('/comment/:id', isAuthenticatedUser, commentCtrl.updateComment)

router.delete('/comment/:id', isAuthenticatedUser, commentCtrl.deleteComment)


module.exports = router;