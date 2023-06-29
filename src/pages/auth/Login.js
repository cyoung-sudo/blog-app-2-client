import "./Login.scss";
// Components
import AuthForm from "../../components/forms/AuthForm";

const Login = () => {
  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-form-wrapper">
        <AuthForm />
      </div>
    </div>
  )
};

export default Login;