import "./Settings.scss";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetAuthUser } from "../../reducers/sessionSlice";
import { setPopup } from "../../reducers/popupSlice";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import UserAPI from "../../apis/UserAPI";
// Bootstrap
import Button from "react-bootstrap/Button";

const Settings = () => {
  // Hooks
  const navigate = useNavigate();
  const { authUser } = useSelector(state => state.session);
  const dispatch = useDispatch();

  //----- Delete user account
  const handleAccountDelete = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Delete user
        return UserAPI.deleteUser(authUser._id);
      } else {
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        // Logout user
        return AuthAPI.logout();
      } else {
        throw new Error("Failed to delete account");
      }
    })
    .then(res => {
      if(res.data.success) {
        // Reset authenticated user state
        dispatch(resetAuthUser());
        dispatch(setPopup({
          message: "Account deleted",
          type: "success"
        }));
        navigate("/");
      } else {
        throw new Error("Failed to logout");
      }
    })
    .catch(err => {
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
    });
  };

  return (
    <div id="settings">
      <div id="settings-header">
        <h1>Settings</h1>
      </div>

      <ul id="settings-list">
        <li>
          <div>Delete Account?</div>
          <Button onClick={ handleAccountDelete }>Delete</Button>
        </li>
      </ul>
    </div>
  );
};

export default Settings;