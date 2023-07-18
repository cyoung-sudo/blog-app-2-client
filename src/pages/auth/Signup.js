import "./Signup.scss";
// React
import { useState } from  "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setPopup } from "../../reducers/popupSlice";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import UserAPI from "../../apis/UserAPI";

const Signup = () => {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();

    // Validations
    if(username === "" || password === "") {
      dispatch(setPopup({
        message: "Missing required field",
        type: "warning"
      }));
    } else {
      // Create user
      UserAPI.create(username, password)
      .then(res => {
        if(res.data.success) {
          dispatch(setPopup({
            message: "Account created",
            type: "success"
          }));
          navigate("/login");
        } else {
          dispatch(setPopup({
            message: res.data.message,
            type: "danger"
          }));
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-form-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit } />
      </div>
    </div>
  )
};

export default Signup;