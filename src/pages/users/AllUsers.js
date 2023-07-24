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

// Items/page
const pageMax = 3;

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
        setUsers(res.data.users);
        // Set pages
        setPages(Math.ceil(res.data.users.length / pageMax));
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
      <div id="allUsers">
        <div id="allUsers-header">
          <h1>Users</h1>
        </div>
  
        <Container id="allUsers-list-wrapper">
          {pageContent.length > 0 && <UsersDisplay users={ pageContent }/>}
          {pageContent.length <= 0 && <EmptyList listItem="user" />}
        </Container>

        <Container id="allUsers-pagination-wrapper">
          <Pagination 
            page={ page }
            pages={ pages }
            setPage={ setPage }/>
        </Container>
      </div>
    );
  }
};

export default AllUsers;