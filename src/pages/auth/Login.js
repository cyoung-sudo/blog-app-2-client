import "./Login.scss";
// React
import { useState } from  "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../reducers/sessionSlice";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import AuthAPI from "../../apis/AuthAPI";

const Login = () => {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();

    // Login user
    AuthAPI.login(username, password)
    .then(res => {
      if(res.data.success) {
        console.log("Success");

        // Set authenticated user state
        dispatch(setAuthUser(res.data.user));
        navigate(`/users/${ res.data.user._id }`);
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-form-wrapper">
        <AuthForm
          setUsername={ setUsername }
          setPassword={ setPassword }
          handleSubmit={ handleSubmit } />
      </div>
    </div>
  )
};

export default Login;