import "./AllFollows.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
// API
import UserAPI from "../../apis/UserAPI";
import FollowAPI from "../../apis/FollowAPI";
// Components
import UsersDisplay from "../../components/displays/UsersDisplay";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/static/Loading";
import EmptyList from "../../components/static/EmptyList";
// Utils
import { handlePagination } from "../../utils/paginationUtils";
// Bootstrap
import Container from "react-bootstrap/Container";

// Items/page
const pageMax = 1;

const AllFollows = () => {
  // Requested data
  const [follows, setFollows] = useState(null);
  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();

  //----- Retrieve follows data on page load
  useEffect(() => {
    // Retrieve user follows
    FollowAPI.getForFollower(id)
    .then(res => {
      if(res.data.success) {
        // Retrieve users from given follows
        let promises = [];
        for(let follow of res.data.followed) {
          promises.push(UserAPI.getUser(follow.followedId));
        }
        return Promise.all(promises);
      } else {
        throw new Error("Failed to retrieve follows");
      }
    })
    .then(responses => {
      // Extract users from responses
      let followedUsers = [];
      for(let res of responses) {
        if(res.data.success) {
          followedUsers.push(res.data.user);
        } else {
          throw new Error("Failed to retrieve follows");
        }
      }
      setFollows(followedUsers);
      // Set pages
      if(followedUsers.length > 0) {
        setPages(Math.ceil(followedUsers.length / pageMax));
      }
      // Set page content
      let content = handlePagination(followedUsers, page, pageMax);
      setPageContent(content);
      setLoading(false);
    })
    .catch(err => {
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
    });
  }, []);

  //----- Set page content on page change
  useEffect(() => {
    if(follows) {
      let content = handlePagination(follows, page, pageMax);
      setPageContent(content);
    }
  }, [page]);

  if(loading) {
    return <Loading message="Loading follow data" />
  } else {
    return (
      <div id="allFollows">
        <div id="allFollows-header">
          <h1>Following</h1>
        </div>
  
        <Container id="allFollows-list-wrapper">
          {pageContent.length > 0 && <UsersDisplay users={ pageContent } />}
          {pageContent.length <= 0 && <EmptyList listItem="follow" />}
        </Container>

        <Container id="allFollows-pagination-wrapper">
          <Pagination 
            page={ page }
            pages={ pages }
            setPage={ setPage }/>
        </Container>
      </div>
    );
  }
};

export default AllFollows;