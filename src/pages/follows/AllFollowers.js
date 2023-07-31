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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Items/page
const pageMax = 5;

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
      // Order by newest first
      followingUsers = followingUsers.reverse();
      setFollowers(followingUsers);
      // Set pages
      if(followingUsers.length > 0) {
        setPages(Math.ceil(followingUsers.length / pageMax));
      }
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
      <Container id="allFollowers">
        <Row>
          <Col id="allFollowers-sec-1" sm={ 12 } md={ 10 } lg={ 8 }>
            <div id="allFollowers-header">
              <h1>Followers</h1>
            </div>
      
            <div id="allFollowers-list-wrapper">
              {pageContent.length > 0 && <UsersDisplay users={ pageContent }/>}
              {pageContent.length <= 0 && <EmptyList listItem="follower" />}
            </div>

            <div id="allFollowers-pagination-wrapper">
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

export default AllFollowers;