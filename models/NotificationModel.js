const { mongoose } = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    // content: {
    //   type: String,
    //   default: "",
    // },
    prid: {
      type: mongoose.Types.ObjectId,
      //default: "user img",
      ref: "Product",
    },
    status: {
      type: String,
      default: "unseen",
    },
    user: {
      type: mongoose.Types.ObjectId,
      //default: "user img",
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('notification', notificationSchema)