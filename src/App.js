import "./App.scss";
// React
import { useState, useEffect } from "react";
// Routing
import { Route, Routes } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "./reducers/sessionSlice";
// APIs
import AuthAPI from "./apis/AuthAPI";
// Pages
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
// Components
import NavigationBar from "./components/navigation/NavigationBar";
import Footer from "./components/navigation/Footer";
import Loading from "./components/static/Loading";

const App = () => {
  // Loading status
  const [loading, setLoading] = useState(true);
  // Hooks
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
      <NavigationBar />
      <div id="app-content">
        {!loading &&
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        }

        {loading && 
          <Loading
            message="Checking for valid session"/>
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;