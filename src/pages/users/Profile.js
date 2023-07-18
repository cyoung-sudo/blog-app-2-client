import "./Profile.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
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
// Bootstrap Routing
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
  // Requested data
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userFollows, setUserFollows] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [followed, setFollowed] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Manual refresh
  const [refresh, setRefresh] = useState(false);
  // Hooks
  const { id } = useParams();
  const { authUser } = useSelector(state => state.session);
  const dispatch = useDispatch();

  //----- Retrieve user data on page load
  useEffect(() => {
    setLoading(true);

    // Retrieve user
    UserAPI.getUser(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
        // Retrieve user posts
        return PostAPI.getAllForUser(id);
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
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
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
        setRefresh(refresh => !refresh);
      } else {
        throw new Error("Failed to toggle follow");
      }
    })
    .catch(err => {
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
    });
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
          <LinkContainer to={`/follows/${ id }`}>
            <Button>
              Following: { userFollows.length }
            </Button>
          </LinkContainer>

          <LinkContainer to={`/followers/${ id }`}>
            <Button>
              Followers: { userFollowers.length }
            </Button>
          </LinkContainer>
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