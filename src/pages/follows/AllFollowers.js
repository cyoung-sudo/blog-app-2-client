import "./AllFollowers.scss";
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

const AllFollowers = () => {
  // Requested data
  const [followers, setFollowers] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const { id } = useParams();

  //----- Retrieve followers data on page load
  useEffect(() => {
    // Retrieve user followers
    FollowAPI.getForFollowed(id)
    .then(res => {
      if(res.data.success) {
        // Retrieve users from given followers
        let promises = [];
        for(let follow of res.data.followers) {
          promises.push(UserAPI.getUser(follow.followedId));
        }
        return Promise.all(promises);
      }
    })
    .then(responses => {
      // Extract users from responses
      let followingUsers = [];
      for(let res of responses) {
        if(res.data.success) {
          followingUsers.push(res.data.user);
        } else {
          throw new Error("Failed to retrieve follow data");
        }
      }
      setFollowers(followingUsers);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  if(loading) {
    return <Loading message="Loading follow data" />
  } else {
    return (
      <div id="allFollowers">
        <div id="allFollowers-header">
          <h1>Followers</h1>
        </div>
  
        <div id="allFollowers-list-wrapper">
          <UsersDisplay users={ followers } />
        </div>
      </div>
    );
  }
};

export default AllFollowers;