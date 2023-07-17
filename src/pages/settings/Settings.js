import "./Settings.scss";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetAuthUser } from "../../reducers/sessionSlice";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import UserAPI from "../../apis/UserAPI";
import PostAPI from "../../apis/PostAPI";
import LikeAPI from "../../apis/LikeAPI";
import DislikeAPI from "../../apis/DislikeAPI";
import CommentAPI from "../../apis/CommentAPI";
import FollowAPI from "../../apis/FollowAPI";
// Bootstrap
import Button from "react-bootstrap/Button";

const Settings = () => {
  // Hooks
  const { authUser } = useSelector(state => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Delete user account
  const handleAccountDelete = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Delete all user comments
        return CommentAPI.deleteAllForUser(authUser._id);
      }
    })
    .then(res => {
      if(res.data.success) {
        // Delete all user likes
        return LikeAPI.deleteAllForUser(authUser._id);
      }
    })
    .then(res => {
      if(res.data.success) {
        // Delete all user dislikes
        return DislikeAPI.deleteAllForUser(authUser._id);
      }
    }).then(res => {
      if(res.data.success) {
        // Delete all user posts
        return PostAPI.deleteAllForUser(authUser._id);
      }
    })
    .then(res => {
      if(res.data.success) {
        // Delete all user follows
        return FollowAPI.deleteAllForUser(authUser._id);
      }
    })
    .then(res => {
      if(res.data.success) {
        // Delete user
        return UserAPI.deleteUser(authUser._id);
      }
    })
    .then(res => {
      if(res.data.success) {
        // Logout user
        return AuthAPI.logout();
      }
    })
    .then(res => {
      if(res.data.success) {
        console.log("Account deleted");
        // Reset authenticated user state
        dispatch(resetAuthUser());
        navigate("/");
      }
    })
    .catch(err => console.log(err));
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