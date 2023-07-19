import "./AllPosts.scss";
// React
import { useState, useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
// APIs
import PostAPI from "../../apis/PostAPI";
// Components
import PostsDisplay from "../../components/displays/PostsDisplay";
import Loading from "../../components/static/Loading";
import EmptyList from "../../components/static/EmptyList";
// Bootstrap
import Container from "react-bootstrap/Container";

const AllPosts = () => {
  // Requested data
  const [posts, setPosts] = useState("");
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const dispatch = useDispatch();

  //----- Retrieve all posts on page load
  useEffect(() => {
    // Retrieve all posts
    PostAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setPosts(res.data.posts);
        setLoading(false);
      } else {
        dispatch(setPopup({
          message: "Failed to retrieve posts",
          type: "danger"
        }));
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(loading) {
    return <Loading message="Loading posts" />
  } else {
    return (
      <div id="allPosts">
        <div id="allPosts-header">
          <h1>Posts</h1>
        </div>
  
        <Container id="allPosts-list-wrapper">
          {posts.length > 0 && <PostsDisplay posts={ posts } />}
          {posts.length <= 0 && <EmptyList listItem="post" />}
        </Container>
      </div>
    );
  }
};

export default AllPosts;