import "./AllFollowers.scss";
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

const AllFollowers = () => {
  // Requested data
  const [followers, setFollowers] = useState(null);
  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();

  //----- Retrieve followers data on page load
  useEffect(() => {
    // Retrieve user followers
    FollowAPI.getForFollowed(id)
    .then(res => {
      if(res.data.success) {
        // Retrieve users from given followers
        let promises = [];
        for(let follow of res.data.followers) {
          promises.push(UserAPI.getUser(follow.followerId));
        }
        return Promise.all(promises);
      } else {
        throw new Error("Failed to retrieve followers");
      }
    })
    .then(responses => {
      // Extract users from responses
      let followingUsers = [];
      for(let res of responses) {
        if(res.data.success) {
          followingUsers.push(res.data.user);
        } else {
          throw new Error("Failed to retrieve followers");
        }
      }
      setFollowers(followingUsers);
      // Set pages
      setPages(Math.ceil(followingUsers.length / pageMax));
      // Set page content
      let content = handlePagination(followingUsers, page, pageMax);
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
    if(followers) {
      let content = handlePagination(followers, page, pageMax);
      setPageContent(content);
    }
  }, [page]);

  if(loading) {
    return <Loading message="Loading follow data" />
  } else {
    return (
      <div id="allFollowers">
        <div id="allFollowers-header">
          <h1>Followers</h1>
        </div>
  
        <Container id="allFollowers-list-wrapper">
          {pageContent.length > 0 && <UsersDisplay users={ pageContent }/>}
          {pageContent.length <= 0 && <EmptyList listItem="follower" />}
        </Container>

        <Container id="allFollowers-pagination-wrapper">
          <Pagination 
            page={ page }
            pages={ pages }
            setPage={ setPage }/>
        </Container>
      </div>
    );
  }
};

export default AllFollowers;