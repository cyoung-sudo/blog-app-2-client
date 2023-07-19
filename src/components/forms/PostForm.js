import "./PostForm.scss";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PostForm = ({ setTitle, setDesc, handleSubmit }) => {
  return (
    <Form className="postForm" onSubmit={ handleSubmit }>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={e => setDesc(e.target.value)}
          as="textarea" 
          rows={3} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;