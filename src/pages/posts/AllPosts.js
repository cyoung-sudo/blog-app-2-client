import "./AllPosts.scss";
// React
import { useState, useEffect } from "react";
// APIs
import PostAPI from "../../apis/PostAPI";
// Components
import PostsDisplay from "../../components/displays/PostsDisplay";
import Loading from "../../components/static/Loading";

const AllPosts = () => {
  // Requested data
  const [posts, setPosts] =useState("");
  // Loading status
  const [loading, setLoading] = useState(true);

  //----- Retrieve all posts on page load
  useEffect(() => {
    // Retrieve all posts
    PostAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setPosts(res.data.posts);
      }
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  if(loading) {
    return <Loading message="Loading posts" />
  } else {
    return (
      <div id="allPosts">
        <div id="allPosts-header">
          <h1>Posts</h1>
        </div>
  
        <div id="allPosts-list-wrapper">
          <PostsDisplay posts={ posts }/>
        </div>
      </div>
    );
  }
};

export default AllPosts;