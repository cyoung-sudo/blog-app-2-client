import "./Profile.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import UserAPI from "../../apis/UserAPI";
import PostAPI from "../../apis/PostAPI";
import FollowAPI from "../../apis/FollowAPI";
// Components
import PostsDisplay from "../../components/displays/PostsDisplay";
import Loading from "../../components/static/Loading";
// Bootstrap
import Button from "react-bootstrap/Button";

const Profile = () => {
  const [followed, setFollowed] = useState(null);
  // Requested data
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userFollows, setUserFollows] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Manual refresh
  const [refresh, setRefresh] = useState(false);
  // Hooks
  const { authUser } = useSelector(state => state.session);
  const { id } = useParams();

  //----- Retrieve user data on page load
  useEffect(() => {
    setLoading(true);
    
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
        // Retrieve user follows
        return FollowAPI.getForFollower(id);
      } else {
        throw new Error("Failed to retrieve user data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setUserFollows(res.data.followed);
        // Retrieve user followers
        return FollowAPI.getForFollowed(id);
      } else {
        throw new Error("Failed to retrieve user data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setUserFollowers(res.data.followers);
        // Check if authUser follows user
        if(authUser) {
          let followCheck = false;
          for(let follower of res.data.followers) {
            if(follower.followerId === authUser._id) {
              followCheck= true;
            }
          }
          setFollowed(followCheck);
        }
      } else {
        throw new Error("Failed to retrieve user data");
      }
      setLoading(false);
    })
    .catch(err => {
      console.log(err.message);
    })
  }, [refresh, id]);

  //----- Toggle user follow
  const handleFollow = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Toggle follow
        return FollowAPI.toggle(authUser._id, id);
      } else {
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        console.log("Toggled user follow");
        setRefresh(refresh => !refresh);
      } else {
        console.log("An error occured");
      }
    })
    .catch(err => console.log(err));
  };

  if(loading) {
    return <Loading message="Loading user data" />;
  } else {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{ user.username }</h1>
          {authUser && (authUser._id !== id) &&
            <Button
              variant={(followed ? "outline-primary" : "primary")}
              onClick={ handleFollow }>
              {followed ? "Unfollow" : "Follow"}
            </Button>
          }
        </div>

        <div id="profile-info">
          <div>Following: { userFollows.length }</div>
          <div>Followers: { userFollowers.length }</div>
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