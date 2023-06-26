import "./AuthForm.css";

const AuthForm = (setUsername, setPassword, handleSubmit) => {
  return (
    <form id="authForm" onSubmit={ handleSubmit }>
      <div className="authForm-group">
        <label>Username</label>
        <input 
          onChange={e => setUsername(e.target.value) }
          type="text"
          placeholder="username"/>
      </div>

      <div className="authForm-group">
        <label>Password</label>
        <input
          onChange={e => setPassword(e.target.value) }
          type="password" 
          placeholder="password"/>
      </div>

      <div className="authForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  )
}

export default AuthForm;