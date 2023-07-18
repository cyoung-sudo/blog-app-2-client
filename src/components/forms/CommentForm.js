import "./CommentForm.scss";
// Bootstrap
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const CommentForm = ({ comment, setComment, handleComment }) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          onChange={e => setComment(e.target.value)}
          value={ comment }
          placeholder="Comment"
          aria-label="Comment"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={ handleComment }
          variant="outline-secondary" 
          id="button-addon2">
          Submit
        </Button>
      </InputGroup>
    </div>
  );  
};

export default CommentForm;