import "./App.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { Route, Routes } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "./reducers/sessionSlice";
// APIs
import AuthAPI from "./apis/AuthAPI";
// Pages
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AllUsers from "./pages/users/AllUsers";
import Profile from "./pages/users/Profile";
import AllPosts from "./pages/posts/AllPosts";
import NewPost from "./pages/posts/NewPost";
import ShowPost from "./pages/posts/ShowPost";
import AllFollowers from "./pages/follows/AllFollowers";
import AllFollows from "./pages/follows/AllFollows";
import Settings from "./pages/settings/Settings";
// Components
import NavigationBar from "./components/navigation/NavigationBar";
import Footer from "./components/navigation/Footer";
import Popup from "./components/messages/Popup";
// Utils
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
  const { authUser } = useSelector(state => state.session);
  const dispatch = useDispatch();

  //----- Check for valid session on page load
  useEffect(() => {
    // Retrieve authenticated user
    AuthAPI.getAuthUser()
    .then(res => {
      if(res.data.success) {
        // Set authenticated user state
        dispatch(setAuthUser(res.data.user));
      }
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id="app">
      {!loading && <>
        <NavigationBar />
        <div id="app-content">
          <Popup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="users">
              <Route index element={<AllUsers />} />
              <Route path=":id" element={<Profile />} />
            </Route>

            <Route path="posts">
              <Route index element={<AllPosts />} />
              <Route path="new" element={(
                <ProtectedRoute authUser={ authUser }>
                  <NewPost />
                </ProtectedRoute>
              )} />
              <Route path=":id" element={<ShowPost />} />
            </Route>

            <Route path="follows/:id" element={<AllFollows />} />
            <Route path="followers/:id" element={<AllFollowers />} />

            <Route path="settings" element={(
              <ProtectedRoute authUser={ authUser }>
                <Settings />
              </ProtectedRoute>
            )} />
          </Routes>
        </div>
        <Footer />
      </>}

      {loading && <div id="app-loading">
        <h1>Loading...</h1>
        <p>Waking up server</p>
        <p>Could take a minute :)</p>
      </div>}
    </div>
  );
}

export default App;