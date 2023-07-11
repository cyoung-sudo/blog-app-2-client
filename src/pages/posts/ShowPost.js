import "./ShowPost.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import PostAPI from "../../apis/PostAPI";
import LikeAPI from "../../apis/LikeAPI";
import DislikeAPI from "../../apis/DislikeAPI";
// Components
import Loading from "../../components/static/Loading";
// Bootstrap
import Button from 'react-bootstrap/Button';

const ShowPost = () => {
  const { authUser } = useSelector(state => state.session);
  // Requested data
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Manual refresh
  const [refresh, setRefresh] = useState(false);
  // Hooks
  const { id } = useParams();

  //----- Retrieve post data on page load
  useEffect(() => {
    // Retrieve post
    PostAPI.getPost(id)
    .then(res => {
      if(res.data.success) {
        setPost(res.data.post);
        // Retrieve post likes
        return LikeAPI.getAllForPost(id);
      } else {
        throw new Error("Failed to retrieve post");
      }
    })
    .then(res => {
      if(res.data.success) {
        setLikes(res.data.count);
        // Retrieve post dislikes
        return DislikeAPI.getAllForPost(id);
      } else {
        throw new Error("Failed to retrieve post data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setDislikes(res.data.count);
      } else {
        throw new Error("Failed to retrieve post data");
      }
      setLoading(false);
    })
  }, [refresh]);

  //----- Toggle like for post
  const handleLike = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Toggle like
        return LikeAPI.toggle(authUser._id, id);
      } else {
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        console.log("Liked post")
        setRefresh(refresh => !refresh);
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  //----- Toggle dislike for post
  const handleDislike = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Toggle dislike
        return DislikeAPI.toggle(authUser._id, id);
      } else {
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        console.log("Disliked post");
        setRefresh(refresh => !refresh);
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  if(loading) {
    return <Loading message="Loading post data" />;
  } else {
    return (
      <div id="showPost">
        <div id="showPost-header">
          <div>{ post.title }</div>
          <div>{ post.desc }</div>
        </div>

        <div id="showPost-likes">
          <Button onClick={ handleLike }>Likes: { likes }</Button>
          <Button onClick={ handleDislike }>Dislikes: { dislikes }</Button>
        </div>
      </div>
    );
  }
};

export default ShowPost;