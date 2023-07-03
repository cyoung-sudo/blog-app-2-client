import "./Signup.scss";
// React
import { useState } from  "react";
// Components
import AuthForm from "../../components/forms/AuthForm";
// APIs
import UserAPI from "../../apis/UserAPI";

const Signup = () => {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //----- Submit form data
  const handleSubmit = e => {
    e.preventDefault();

    // Create user
    UserAPI.create(username, password)
    .then(res => {
      if(res.data.success) {
        console.log("Success");
      } else {
        console.log("Failed");
      }
    })
    .catch(e => console.log(e));
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