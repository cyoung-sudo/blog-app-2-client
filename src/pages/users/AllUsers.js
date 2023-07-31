import "./AllUsers.scss";
// React
import { useState, useEffect } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
// APIs
import UserAPI from "../../apis/UserAPI";
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

const AllUsers = () => {
  // Requested data
  const [users, setUsers] =useState("");
  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const dispatch = useDispatch();

  //----- Retrieve all users on page load
  useEffect(() => {
    // Retrieve all users
    UserAPI.getAll()
    .then(res => {
      if(res.data.success) {
        // Order by newest first
        let orderedUsers = res.data.users.reverse();
        setUsers(orderedUsers);
        // Set pages
        if(res.data.users.length > 0) {
          setPages(Math.ceil(res.data.users.length / pageMax));
        }
        // Set page content
        let content = handlePagination(res.data.users, page, pageMax);
        setPageContent(content);
        setLoading(false);
      } else {
        dispatch(setPopup({
          message: "Failed to retrieve users",
          type: "danger"
        }));
      }
    })
    .catch(err => {console.log(err)});
  }, []);

  //----- Set page content on page change
  useEffect(() => {
    if(users) {
      let content = handlePagination(users, page, pageMax);
      setPageContent(content);
    }
  }, [page]);

  if(loading) {
    return <Loading message="Loading users" />
  } else {
    return (
      <Container id="allUsers">
        <Row>
          <Col id="allUsers-sec-1" sm={ 12 } md={ 10 } lg={ 8 }>
            <div id="allUsers-header">
              <h1>Users</h1>
            </div>
      
            <div id="allUsers-list-wrapper">
              {pageContent.length > 0 && <UsersDisplay users={ pageContent }/>}
              {pageContent.length <= 0 && <EmptyList listItem="user" />}
            </div>

            <div id="allUsers-pagination-wrapper">
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

export default AllUsers;