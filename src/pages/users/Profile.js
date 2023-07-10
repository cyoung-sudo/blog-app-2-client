import "./Profile.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// APIs
import UserAPI from "../../apis/UserAPI";
import PostAPI from "../../apis/PostAPI";
// Components
import PostsDisplay from "../../components/displays/PostsDisplay";
import Loading from "../../components/static/Loading";

const Profile = () => {
  // Requested data
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const { id } = useParams();

  //----- Retrieve user data on page load
  useEffect(() => {
    // Retrieve user
    UserAPI.getUser(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
        // Retrieve user posts
        return PostAPI.getForUser(id);
      } else {
        throw new Error("User not found");
      }
    })
    .then(res => {
      if(res.data.success) {
        setUserPosts(res.data.posts);
      }
      setLoading(false);
    })
    .catch(err => {
      console.log(err.message);
    })
  }, []);

  if(loading) {
    return <Loading message="Loading user data" />;
  } else {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{ user.username }</h1>
        </div>
  
        <div id="profile-posts">
          <div>Posts</div>
          <PostsDisplay posts={ userPosts } />
        </div>
      </div>
    );
  }
};

export default Profile;