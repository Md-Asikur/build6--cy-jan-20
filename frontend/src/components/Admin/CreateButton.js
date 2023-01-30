import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import AddIcon from "@mui/icons-material/Add";
const CreateButton = () => {
 

  return (
    <>
      <Link to="/admin/product" className="createBtn">
        <TreeItem nodeId="3" label="create a product" icon={<AddIcon />} />
      </Link>
    </>
  );
};

export default CreateButton;
