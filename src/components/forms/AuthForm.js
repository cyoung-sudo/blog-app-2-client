import "./AuthForm.scss";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AuthForm = ({ setUsername, setPassword, handleSubmit }) => {
  return (
    <Form onSubmit={ handleSubmit }>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AuthForm;