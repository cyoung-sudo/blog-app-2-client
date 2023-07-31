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
// Bootstrap// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// Icons
import { BsTrashFill } from "react-icons/bs";

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
    <Container id="settings">
      <Row>
        <Col id="settings-sec-1" sm={ 12 } md={ 10 } lg={ 8 }>
          <div id="settings-header">
            <h1>Settings</h1>
          </div>

          <ul id="settings-list">
            <li>
              <div>
                <div className="settings-title">Delete Account?</div>
                <div className="settings-desc">All posts, comments, likes, & follows will be deleted</div>
              </div>
              <Button onClick={ handleAccountDelete } variant="danger">
                <BsTrashFill/>Delete
              </Button>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;