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
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/static/Loading";
import EmptyList from "../../components/static/EmptyList";
// Utils
import { handlePagination } from "../../utils/paginationUtils";
// Bootstrap
import Container from "react-bootstrap/Container";

// Items/page
const pageMax = 2;

const AllPosts = () => {
  // Requested data
  const [posts, setPosts] = useState("");
  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [pageContent, setPageContent] = useState([]);
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
         // Set pages
         setPages(Math.ceil(res.data.posts.length / pageMax));
         // Set page content
         let content = handlePagination(res.data.posts, page, pageMax);
         setPageContent(content);
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

  //----- Set page content on page change
  useEffect(() => {
    if(posts) {
      let content = handlePagination(posts, page, pageMax);
      setPageContent(content);
    }
  }, [page]);

  if(loading) {
    return <Loading message="Loading posts" />
  } else {
    return (
      <div id="allPosts">
        <div id="allPosts-header">
          <h1>Posts</h1>
        </div>
  
        <Container id="allPosts-list-wrapper">
          {pageContent.length > 0 && <PostsDisplay posts={ pageContent } />}
          {pageContent.length <= 0 && <EmptyList listItem="post" />}
        </Container>

        <Container id="allPosts-pagination-wrapper">
          <Pagination 
            page={ page }
            pages={ pages }
            setPage={ setPage }/>
        </Container>
      </div>
    );
  }
};

export default AllPosts;