import { Button, Tooltip } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import AddIcon from "@mui/icons-material/Add";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get_notification_only_unseen } from "../../actions/notificationAction";

const CreateButton = () => {
  const { unseennotification } = useSelector((state) => state.allNotifications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_notification_only_unseen());
  }, []);

  return (
    <>
      <div>
        <div>
          <Link to="/admin/product" className="createBtn">
            <TreeItem nodeId="3" label="create a product" icon={<AddIcon />} />
          </Link>
          <div style={{ float: "right", marginRight: "50px" }} className="icon">
            {" "}
            <Tooltip title="Notifications">
              <Link to="/notifications">
                <NotificationsActiveIcon />
              </Link>
            </Tooltip>
            {unseennotification?.length > 0 && <p> {unseennotification?.length}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateButton;
