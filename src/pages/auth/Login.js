import "./Login.scss";
// React
import { useState } from  "react";
// Routing
import { useNavigate } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../reducers/sessionSlice";
import { setPopup } from "../../reducers/popupSlice";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import AuthAPI from "../../apis/AuthAPI";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
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
      // Login user
      AuthAPI.login(username, password)
      .then(res => {
        if(res.data.success) {
          // Set authenticated user state
          dispatch(setAuthUser(res.data.user));
          dispatch(setPopup({
            message: "Logged in",
            type: "success"
          }));
          navigate(`/users/${ res.data.user._id }`);
        } else {
          dispatch(setPopup({
            message: "Failed to login",
            type: "danger"
          }));
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <Container id="login">
      <Row>
        <Col id="login-sec-1" sm={ 12 } md={ 10 } lg={ 8 }>
          <div id="login-header">
            <h1>Login</h1>
          </div>

          <div id="login-form-wrapper">
            <AuthForm
              setUsername={ setUsername }
              setPassword={ setPassword }
              handleSubmit={ handleSubmit } />
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default Login;