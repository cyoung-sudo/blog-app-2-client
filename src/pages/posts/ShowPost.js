import "./ShowPost.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams, useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import PostAPI from "../../apis/PostAPI";
import LikeAPI from "../../apis/LikeAPI";
import DislikeAPI from "../../apis/DislikeAPI";
import CommentAPI from "../../apis/CommentAPI";
// Components
import CommentForm from "../../components/forms/CommentForm";
import CommentsDisplay from "../../components/displays/CommentsDisplay";
import Loading from "../../components/static/Loading";
// Bootstrap
import Button from 'react-bootstrap/Button';

const ShowPost = () => {
  // Requested data
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [comments, setComments] = useState(null);
  // Controlled inputs
  const [comment, setComment] = useState("");
  // Loading status
  const [loading, setLoading] = useState(true);
  // Manual refresh
  const [refresh, setRefresh] = useState(false);
  // Hooks
  const { authUser } = useSelector(state => state.session);
  const { id } = useParams();
  const navigate = useNavigate();

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
        // Retrieve post comments
        return CommentAPI.getForPost(id);
      } else {
        throw new Error("Failed to retrieve post data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setComments(res.data.comments);
      } else {
        throw new Error("Failed to retrieve post data");
      }
      setLoading(false);
    })
    .catch(err => console.log(err));
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

  //----- Submit comment
  const handleComment = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Create comment
        return CommentAPI.create(authUser._id, id, comment);
      } else {
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        console.log("Comment created");
        setRefresh(refresh => !refresh);
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  //----- Delete post & relavent data
  const handleDelete = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Delete all post likes
        return LikeAPI.deleteAllForPost(id);
      } else {
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        // Delete all post dislikes
        return DislikeAPI.deleteAllForPost(id);
      } else {
        throw new Error("Failed to delete post");
      }
    })
    .then(res => {
      if(res.data.success) {
        // Delete all post comments
        return CommentAPI.deleteAllForPost(id);
      } else {
        throw new Error("Failed to delete post");
      }
    })
    .then(res => {
      if(res.data.success) {
        // Delete post
        return PostAPI.deletePost(id);
      } else {
        throw new Error("Failed to delete post");
      }
    })
    .then(res => {
      if(res.data.success) {
        console.log("Post deleted");
        navigate(`/users/${ authUser._id }`);
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
          <Button 
            onClick={ handleLike }
            disabled={authUser ? false : true}>
            Likes: { likes }
          </Button>
          <Button
            onClick={ handleDislike }
            disabled={authUser ? false : true}>
            Dislikes: { dislikes }
          </Button>
        </div>

        <div>
          {authUser && (authUser._id === post.userId) &&
            <Button onClick={ handleDelete }>Delete</Button>
          }
        </div>

        <div id="showPost-comments">
          {authUser &&
            <CommentForm
              setComment={ setComment }
              handleComment={ handleComment }/>
          }
          <CommentsDisplay comments={ comments } />
        </div>
      </div>
    );
  }
};

export default ShowPost;