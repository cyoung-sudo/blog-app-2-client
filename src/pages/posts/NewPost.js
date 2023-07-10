import "./NewPost.scss";
// React
import { useState } from "react";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import PostAPI from "../../apis/PostAPI";
// Components
import PostForm from "../../components/forms/PostForm";

const NewPost = () => {
  // Controlled inputs
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
        // Exit promise chain
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        console.log("Post created");
      } else {
        console.log("Failed to create post");
      }
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    });
  };

  return (
    <div id="newPost">
      <div id="newPost-header">
        <h1>Create Post</h1>
      </div>

      <div id="newPost-form-wrapper">
        <PostForm 
          setTitle={ setTitle }
          setDesc={ setDesc }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};

export default NewPost;