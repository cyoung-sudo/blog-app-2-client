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
import Loading from "../../components/static/Loading";
import EmptyList from "../../components/static/EmptyList";

const AllFollows = () => {
  // Requested data
  const [follows, setFollows] = useState(null);
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
      setLoading(false);
    })
    .catch(err => {
      dispatch(setPopup({
        message: err.message,
        type: "danger"
      }));
    });
  }, []);

  if(loading) {
    return <Loading message="Loading follow data" />
  } else {
    return (
      <div id="allFollows">
        <div id="allFollows-header">
          <h1>Following</h1>
        </div>
  
        <div id="allFollows-list-wrapper">
          {follows.length > 0 && <UsersDisplay users={ follows } />}
          {follows.length <= 0 && <EmptyList listItem="follow" />}
        </div>
      </div>
    );
  }
};

export default AllFollows;