import "./NewPost.scss";
// React
import { useState } from "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import PostAPI from "../../apis/PostAPI";
// Components
import PostForm from "../../components/forms/PostForm";
// Bootstrap
import Container from "react-bootstrap/Container";

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
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
    });
  };

  return (
    <div id="newPost">
      <div id="newPost-header">
        <h1>Create Post</h1>
      </div>

      <Container id="newPost-form-wrapper">
        <PostForm 
          setTitle={ setTitle }
          setDesc={ setDesc }
          handleSubmit={ handleSubmit }/>
      </Container>
    </div>
  );
};

export default NewPost;