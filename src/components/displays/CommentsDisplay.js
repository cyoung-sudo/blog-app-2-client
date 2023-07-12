import "./CommentsDisplay.scss";
// Bootstrap
import ListGroup from "react-bootstrap/ListGroup";

const CommentDisplay = ({ comments }) => {
  return (
    <ListGroup className="commentDisplay">
      {comments.map((comment, idx) => (
        <ListGroup.Item key={ idx }>{ comment.text }</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentDisplay;