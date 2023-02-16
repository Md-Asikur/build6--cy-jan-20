import { Button, Tooltip } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import AddIcon from "@mui/icons-material/Add";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./notification.css";
import {
  Delete_notification,
  get_notification,
  get_notification_only_unseen,
  seen_notification,
  unseen_notification,
} from "../../actions/notificationAction";

const Notifications = () => {
  const Alert = useAlert();
  const navigate=useHistory()
  const { notification, successMessage, unseennotification } = useSelector(
    (state) => state.allNotifications
  );

  const dispatch = useDispatch();
  //show hide parfectly
  const [open, setopen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const menuref = useRef();
  const handleRead = () => {
    setNotifications([]);
    setopen(false);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuref.current.contains(e.target)) {
        setopen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  //show hide parfectly
  useEffect(() => {
     
    dispatch(get_notification());
   
    dispatch(get_notification_only_unseen());
    setNotifications(notification);
  }, [notification]);

  useEffect(() => {
    
    if (successMessage) {
      Alert.info("Delete success");
      dispatch({ type: "NOTIFICATION_CLEAR" });
    }
    dispatch(get_notification());
  }, [successMessage]);
  const seenNotification = (id) => {
    dispatch(seen_notification(id));
  };
  const unseenNotification = (id) => {
    dispatch(unseen_notification(id));
  };
  const DeleteNotification = (id) => {
    dispatch(Delete_notification(id));
  };

  return (
    <>
      <div ref={menuref}>
        <div
          style={{ float: "right", marginRight: "150px", marginTop: "40px" }}
          className="icon"
          onClick={() => setopen(!open)}
        >
          <Link to="/admin/dashboard">
          Dashboard
          </Link>
          {" "}
          <Tooltip title="Notifications">
           
              <NotificationsActiveIcon />
           
          </Tooltip>
          {unseennotification?.length > 0 && <p> {unseennotification?.length}</p>}
        </div>

        {/* {open && (
          <div className="notifications">
            <div className="notification">
              {notifications?.map((n) => {
                return (
                  <>
                    {" "}
                    <p>
                      <Tooltip title={n?.user?.name}>
                        <img
                          src={n?.user?.avatar?.url}
                          alt={n?.user?.avatar?.url}
                          style={{
                            height: "30px",
                            width: "30px",
                            borderRadius: "50%",
                            margin: "0px 5px -10px 0px",
                          }}
                        />
                      </Tooltip>
                      <p
                        className={n?.status === "unseen" ? "red" : "green"}
                        onClick={() => seenNotification(n?._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        {n?.subject}{" "}
                        <i
                          className="fa fa-trash-o"
                          onClick={() => DeleteNotification(n?._id)}
                        ></i>
                      </p>{" "}
                      {n?.status === "seen" ? (
                        <p
                          onClick={() => unseenNotification(n?._id)}
                          style={{ cursor: "pointer", color: "red" }}
                        >
                          Unseen
                        </p>
                      ) : (
                        <p
                          onClick={() => seenNotification(n?._id)}
                          style={{ cursor: "pointer", color: "green" }}
                        >
                          Seen
                        </p>
                      )}
                      <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        {n?.status === "unseen" ? (
                          <option value="seen">Seen</option>
                        ) : (
                          <option value="unseen">Unseen</option>
                        )}
                      </select>
                    </p>
                  </>
                );
              })}
            </div>
            <h3 onClick={handleRead}>Mark as read</h3>
          </div>
        )}*/}
      </div>
      {/* Show Notifications */}
      <div className="notifications">
        <div className="notification">
          {notifications?.map((n) => {
            return (
              <>
                {" "}
                <p>
                  <Tooltip title={n?.user?.name}>
                    <img
                      src={n?.user?.avatar?.url}
                      alt={n?.user?.avatar?.url}
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "50%",
                        margin: "0px 5px -10px 0px",
                      }}
                    />
                  </Tooltip>
                  <p
                    className={n?.status === "unseen" ? "red" : "green"}
                    onClick={() => seenNotification(n?._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    {n?.subject}
                    <i
                      className="fa fa-trash-o"
                      onClick={() => DeleteNotification(n?._id)}
                      style={{ padding: "0px 0px 0px 15px" }}
                    ></i>
                    <i
                      className="fa fa-eye"
                      onClick={() => navigate.push(`/product/${n?.prid}`)}
                      style={{ padding: "0px 0px 0px 10px" }}
                    ></i>
                  </p>{" "}
                  {n?.status === "seen" ? (
                    <p
                      onClick={() => unseenNotification(n?._id)}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      Unseen
                    </p>
                  ) : (
                    <p
                      onClick={() => seenNotification(n?._id)}
                      style={{ cursor: "pointer", color: "green" }}
                    >
                      Seen
                    </p>
                  )}
                  {/* <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        {n?.status === "unseen" ? (
                          <option value="seen">Seen</option>
                        ) : (
                          <option value="unseen">Unseen</option>
                        )}
                      </select> */}
                </p>
              </>
            );
          })}
        </div>
        <h3 onClick={handleRead}>Mark as read</h3>
      </div>
    </>
  );
};

export default Notifications;
