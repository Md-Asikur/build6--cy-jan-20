const { default: mongoose } = require("mongoose");
const CmReactModel = require("../../models/ReactModel/CmReactModel");

const userModel = require("../../models/userModel");

exports.reactPostComment = async (req, res) => {
  try {
    const { postId, react,userId } = req.body;
    const check = await CmReactModel.findOne({
      postRef: postId,
      reactBy: userId,
    });
    if (check == null) {
      const newReact = new CmReactModel({
        react: react,
        postRef: postId,
        reactBy: userId,
      });
      await newReact.save();
    } else {
      if (check.react == react) {
        await CmReactModel.findByIdAndRemove(check._id);
      } else {
        await CmReactModel.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
exports.getReactsComment = async (req, res) => {
  try {
    const reactsArray = await CmReactModel.find({ postRef: req.params.id });

    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];
   //const user = await userModel.findById(req.user.id);
    const check = await CmReactModel.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });
    const user = await userModel.findById(req.user.id);
    const checkSaved = user?.savedPosts.find((x) => x.post.toString() === req.params.id);
    res.json({
      reacts,
      check: check?.react,
      total: reactsArray.length,
      checkSaved: checkSaved ? true : false,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
//unAuthorize get
exports.getReactsCommentUnauth = async (req, res) => {
  try {
    const reactsArray = await CmReactModel.find({ postRef: req.params.id });

    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];
   
   
    res.json({
      reacts,
      
      total: reactsArray.length,
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
