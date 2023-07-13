import "./AllFollows.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { useParams } from "react-router-dom";
// API
import UserAPI from "../../apis/UserAPI";
import FollowAPI from "../../apis/FollowAPI";
// Components
import UsersDisplay from "../../components/displays/UsersDisplay";
import Loading from "../../components/static/Loading";

const AllFollows = () => {
  // Requested data
  const [follows, setFollows] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const { id } = useParams();

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
      }
    })
    .then(responses => {
      // Extract users from responses
      let followedUsers = [];
      for(let res of responses) {
        if(res.data.success) {
          followedUsers.push(res.data.user);
        } else {
          throw new Error("Failed to retrieve follow data");
        }
      }
      setFollows(followedUsers);
      setLoading(false);
    })
    .catch(err => console.log(err));
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
          <UsersDisplay users={ follows } />
        </div>
      </div>
    );
  }
};

export default AllFollows;