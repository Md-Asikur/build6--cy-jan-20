const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");



//=================================
//             Subscribe
//=================================


router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })

        Comment.findByIdAndUpdate({ '_id': comment._id })
            //.populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

})

router.post("/getComments", (req, res) => {

    Comment.find({ postId: req.body.productId })
      //.populate("writer")
      .exec((err, comments) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, comments });
      });

});
router.delete("/deleteComment/:id", (req, res) => {
  
 
 

    Comment.findByIdAndDelete(req.params.id)
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
 
});




module.exports = router;
