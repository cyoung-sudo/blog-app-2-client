import "./App.scss";
// Routing
import { Route, Routes } from "react-router-dom"
// Pages
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
// Components
import NavigationBar from "./components/navigation/NavigationBar";
import Footer from "./components/navigation/Footer";

const App = () => {
  return (
    <div id="app">
      <NavigationBar />
      <div id="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;