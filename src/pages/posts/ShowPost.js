import "./ShowPost.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams, useNavigate } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
import { resetAuthUser } from "../../reducers/sessionSlice";
// APIs
import AuthAPI from "../../apis/AuthAPI";
import PostAPI from "../../apis/PostAPI";
import LikeAPI from "../../apis/LikeAPI";
import DislikeAPI from "../../apis/DislikeAPI";
import CommentAPI from "../../apis/CommentAPI";
// Components
import CommentForm from "../../components/forms/CommentForm";
import CommentsDisplay from "../../components/displays/CommentsDisplay";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/static/Loading";
// Utils
import { handlePagination } from "../../utils/paginationUtils";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// Icons
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";

// Items/page
const pageMax = 5;

const ShowPost = () => {
  // Requested data
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);
  const [comments, setComments] = useState(null);
  const [liked, setLiked] = useState(null);
  const [disliked, setDisliked] = useState(null);
  // Controlled inputs
  const [comment, setComment] = useState("");
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
  const navigate = useNavigate();
  const { authUser } = useSelector(state => state.session);
  const dispatch = useDispatch();

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
        setLikes(res.data.likes);
        // Check if authUser liked post
        let likeCheck = false;
        if(authUser) {
          for(let like of res.data.likes) {
            if(like.userId === authUser._id) {
              likeCheck= true;
            }
          }
        }
        setLiked(likeCheck);
        // Retrieve post dislikes
        return DislikeAPI.getAllForPost(id);
      } else {
        throw new Error("Failed to retrieve post data");
      }
    })
    .then(res => {
      if(res.data.success) {
        setDislikes(res.data.dislikes);
        // Check if authUser disliked post
        let dislikeCheck = false;
        if(authUser) {
          for(let dislike of res.data.dislikes) {
            if(dislike.userId === authUser._id) {
              dislikeCheck= true;
            }
          }
        }
        setDisliked(dislikeCheck);
        // Retrieve post comments
        return CommentAPI.getForPost(id);
      } else {
        throw new Error("Failed to retrieve post data");
      }
    })
    .then(res => {
      if(res.data.success) {
        // Order by newest first
        let orderedComments = res.data.comments.reverse();
        setComments(orderedComments);
        // Set pages
        if(res.data.comments.length > 0) {
          setPages(Math.ceil(res.data.comments.length / pageMax));
        }
        // Set page content
        let content = handlePagination(res.data.comments, page, pageMax);
        setPageContent(content);
      } else {
        throw new Error("Failed to retrieve post data");
      }
      setLoading(false);
    })
    .catch(err => {
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
    });
  }, [refresh]);

  //----- Set page content on page change
  useEffect(() => {
    if(comments) {
      let content = handlePagination(comments, page, pageMax);
      setPageContent(content);
    }
  }, [page]);

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
        setRefresh(refresh => !refresh);
      } else {
        throw new Error("Failed to like post");
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
        setRefresh(refresh => !refresh);
      } else {
        throw new Error("Failed to dislike post");
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

  //----- Submit comment
  const handleComment = () => {
    if(comment === "") {
      dispatch(setPopup({
        message: "Missing required field",
        type: "warning"
      }));
    } else {
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
          setComment("");
          setRefresh(refresh => !refresh);
        } else {
          throw new Error("Failed to post comment");
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

  //----- Delete post & relavent data
  const handleDelete = () => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Delete post
        return PostAPI.deletePost(id);
      } else {
        throw new Error("Invalid session");
      }
    })
    .then(res => {
      if(res.data.success) {
        dispatch(setPopup({
          message: "Post deleted",
          type: "success"
        }));
        navigate(`/users/${ authUser._id }`);
      } else {
        throw new Error("Failed to delete post");
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
    return <Loading message="Loading post data" />;
  } else {
    return (
      <Container id="showPost">
        <Row id="showPost-row-1">
          <Col id="showPost-sec-1" sm={ 12 } md={ 6 } lg={ 5 }>
            <div id="showPost-header">
              <h1>{ post.title }</h1>
              <div className="showPost-header-desc">{ post.desc }</div>
              <div className="showPost-header-date">{ new Date(post.createdAt).toDateString() }</div>
            </div>

            <div id="showPost-likes">
              <Button 
                onClick={ handleLike }
                disabled={authUser ? false : true}>
                {(!authUser || !liked) && <AiOutlineLike />}
                {liked && <AiFillLike />}
                { likes.length }
              </Button>
              <Button
                onClick={ handleDislike }
                disabled={authUser ? false : true}>
                {(!authUser || !disliked) && <AiOutlineDislike />}
                {disliked && <AiFillDislike />}
                { dislikes.length }
              </Button>
            </div>

            <div id="showPost-options">
              {authUser && (authUser._id === post.userId) &&
                <Button onClick={ handleDelete } variant="danger">
                  <BsTrashFill/>Delete
                </Button>
              }
            </div>
          </Col>

          <Col id="showPost-sec-2" sm={ 12 } md={ 6 } lg={ 5 }>
            <div id="showPost-comments">
              {authUser &&
                <CommentForm
                  comment= { comment }
                  setComment={ setComment }
                  handleComment={ handleComment }/>
              }

              <Container id="showPost-comments-wrapper">
                <CommentsDisplay comments={ pageContent } />
              </Container>

              <Container id="showPost-pagination-wrapper">
                <Pagination 
                  page={ page }
                  pages={ pages }
                  setPage={ setPage }/>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ShowPost;