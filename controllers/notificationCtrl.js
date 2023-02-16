const NotificationModel = require("../models/NotificationModel");

exports.get_notification = async (req, res) => {
 
  try {
   
      const myNotification = await NotificationModel.find({}).populate("user");
      return res.status(200).json({
        notification: myNotification,
      });
    
  } catch (error) {
    res.status(500).json({
      errorMessage: {
        error: "Internal server error",
      },
    });
  }
};
exports.get_notification_onlyUnseen = async (req, res) => {
  try {
    const myNotification = await NotificationModel.find({status:"unseen"}).populate("user");
    return res.status(200).json({
      unseennotification: myNotification,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: {
        error: "Internal server error",
      },
    });
  }
};
exports.seen_notification = async (req, res) => {
  const {id}=req.params
  try {
    await NotificationModel.findByIdAndUpdate(id,{status:"seen"});
    return res.status(200).json({
      message:"success"
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: {
        error: "Internal server error",
      },
    });
  }
};
exports.unseen_notification = async (req, res) => {
  const { id } = req.params;
  try {
    await NotificationModel.findByIdAndUpdate(id, { status: "unseen" });
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: {
        error: "Internal server error",
      },
    });
  }
};
exports.delete_notification = async (req, res) => {
  const { id } = req.params;
  try {
    await NotificationModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "notification delete success",
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: {
        error: "Internal server error",
      },
    });
  }
};
