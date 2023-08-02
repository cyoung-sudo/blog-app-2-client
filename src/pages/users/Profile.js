import "./Profile.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
import { resetAuthUser } from "../../reducers/sessionSlice";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import UserAPI from "../../apis/UserAPI";
import PostAPI from "../../apis/PostAPI";
import LikeAPI from "../../apis/LikeAPI";
import DislikeAPI from "../../apis/DislikeAPI";
import CommentAPI from "../../apis/CommentAPI";
import FollowAPI from "../../apis/FollowAPI";
// Components
import PostsDisplay from "../../components/displays/PostsDisplay";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/static/Loading";
import EmptyList from "../../components/static/EmptyList";
// Utils
import { handlePagination } from "../../utils/paginationUtils";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
// Bootstrap Routing
import { LinkContainer } from "react-router-bootstrap";
// Icons
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

// Items/page
const pageMax = 5;

const Profile = () => {
  // Requested data
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const [userFollows, setUserFollows] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [followed, setFollowed] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [dislikeCount, setDislikeCount] = useState(null);
  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [pageContent, setPageContent] = useState([]);
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
        // Order by newest first
        let orderedPosts = res.data.posts.reverse();
        setUserPosts(orderedPosts);
        setPostCount(res.data.posts.length);
        // Set pages
        if(res.data.posts.length > 0) {
          setPages(Math.ceil(res.data.posts.length / pageMax));
        }
        // Set page content
        let content = handlePagination(res.data.posts, page, pageMax);
        setPageContent(content);
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
        // Retrieve user comments
        return CommentAPI.getAllForUser(id);
      } else {
        throw new Error("Failed to retrieve user data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setCommentCount(res.data.comments.length);
        // Retrieve user likes
        return LikeAPI.getAllForUser(id);
      } else {
        throw new Error("Failed to retrieve user data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setLikeCount(res.data.likes.length);
        // Retrieve user dislikes
        return DislikeAPI.getAllForUser(id);
      } else {
        throw new Error("Failed to retrieve user data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setDislikeCount(res.data.dislikes.length);
        setLoading(false);
      } else {
        throw new Error("Failed to retrieve user data");
      }
    })
    .catch(err => {
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
    });
  }, [refresh, id]);

  //----- Set page content on page change
  useEffect(() => {
    if(userPosts) {
      let content = handlePagination(userPosts, page, pageMax);
      setPageContent(content);
    }
  }, [page]);

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
  };

  if(loading) {
    return <Loading message="Loading user data" />;
  } else {
    return (
      <Container id="profile">
        <Row>
          <Col id="profile-sec-1" sm={ 12 } md={ 6 }>
            <div id="profile-header">
              <h1>{ user.username }</h1>
              <div className="profile-header-date">{ new Date(user.createdAt).toDateString() }</div>
            </div>

            {authUser && (authUser._id !== id) &&
              <div id="profile-follow">
                <Button
                  onClick={ handleFollow }>
                  {followed ? <span><AiFillMinusCircle /> Unollow</span> : <span><AiFillPlusCircle /> Follow</span>}
                </Button>
              </div>
            }

            <div id="profile-follows">
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
          </Col>

          <Col id="profile-sec-2" sm={ 12 } md={ 6 }>
            <Table id="profile-stats" striped bordered  size="sm">
              <tbody>
                <tr>
                  <td>Posts</td>
                  <td>{ postCount }</td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td>{ commentCount }</td>
                </tr>
                <tr>
                  <td>Likes</td>
                  <td>{ likeCount }</td>
                </tr>
                <tr>
                  <td>Dislikes</td>
                  <td>{ dislikeCount }</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col id="profile-sec-3">
            <div id="profile-posts-wrapper">
              <h2>Posts</h2>
              {pageContent.length > 0 && <PostsDisplay posts={ pageContent } />}
              {pageContent.length <= 0 && <EmptyList listItem="post" />}
            </div>

            <div id="profile-pagination-wrapper">
              <Pagination 
                page={ page }
                pages={ pages }
                setPage={ setPage }/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Profile;