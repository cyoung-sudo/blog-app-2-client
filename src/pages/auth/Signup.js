import "./Signup.scss";
// Components
import AuthForm from "../../components/forms/AuthForm";

const Signup = () => {
  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-form-wrapper">
        <AuthForm />
      </div>
    </div>
  )
};

export default Signup;