import "./CommentsDisplay.scss";
// Bootstrap
import ListGroup from "react-bootstrap/ListGroup";

const CommentDisplay = ({ comments }) => {
  if(comments.length <= 0) {
    return (
      <ListGroup className="commentDisplay">
        <ListGroup.Item active>No Comments</ListGroup.Item>
      </ListGroup>
    );
  } else {
    return (
      <ListGroup className="commentDisplay">
        <ListGroup.Item active>Comments</ListGroup.Item>
        {comments.map((comment, idx) => (
          <ListGroup.Item key={ idx }>{ comment.text }</ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
};

export default CommentDisplay;