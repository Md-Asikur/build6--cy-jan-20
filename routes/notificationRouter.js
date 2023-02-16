const express = require("express");
const router = express.Router();
const { get_notification, seen_notification, delete_notification, unseen_notification, get_notification_onlyUnseen } = require("../controllers/notificationCtrl");


router.route("/get-notification").get(get_notification);
router.route("/get-notification-only-unseen").get(get_notification_onlyUnseen);
router.route("/seen-notification/:id").get(seen_notification);
router.route("/unseen-notification/:id").get(unseen_notification);

router.route("/delete-notification/:id").get(delete_notification);

module.exports = router;
