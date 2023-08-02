import "./NewPost.scss";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
import { resetAuthUser } from "../../reducers/sessionSlice";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import PostAPI from "../../apis/PostAPI";
// Components
import PostForm from "../../components/forms/PostForm";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NewPost = () => {
  // Controlled inputs
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // Hooks
  const navigate = useNavigate();
  const { authUser } = useSelector(state => state.session);
  const dispatch = useDispatch();

  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if(title === "" || desc === "") {
      dispatch(setPopup({
        message: "Missing required field",
        type: "warning"
      }));
    } else {
      // Retrieve authenticated user
      AuthAPI.getAuthUser()
      .then(res => {
        if(res.data.success) {
          let userId = res.data.user._id;
          // Create post
          return PostAPI.create(userId, title, desc);
        } else {
          throw new Error("Invalid session");
        }
      })
      .then(res => {
        if(res.data.success) {
          dispatch(setPopup({
            message: "Post created",
            type: "success"
          }));
          navigate(`/users/${ authUser._id }`);
        } else {
          throw new Error("Failed to create post");
        }
      })
      .catch(err => {
        if(err.message === "Invalid session") {
          // Reset authenticated user state
          dispatch(resetAuthUser());
          navigate("/");
        }
        dispatch(setPopup({
          message: err.message,
          type: "danger"
        }));
      });
    }
  };

  return (
    <Container id="newPost">
      <Row>
        <Col id="newPost-sec-1" sm={ 12 } md={ 10 } lg={ 8 }>
          <div id="newPost-header">
            <h1>Create Post</h1>
          </div>

          <div id="newPost-form-wrapper">
            <PostForm 
              setTitle={ setTitle }
              setDesc={ setDesc }
              handleSubmit={ handleSubmit }/>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NewPost;