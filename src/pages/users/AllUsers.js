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
import Loading from "../../components/static/Loading";

const AllUsers = () => {
  // Requested data
  const [users, setUsers] =useState("");
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

  if(loading) {
    return <Loading message="Loading users" />
  } else {
    return (
      <div id="allUsers">
        <div id="allUsers-header">
          <h1>Users</h1>
        </div>
  
        <div id="allUsers-list-wrapper">
          <UsersDisplay users={ users }/>
        </div>
      </div>
    );
  }
};

export default AllUsers;