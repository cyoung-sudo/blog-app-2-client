import "./PostsDisplay.scss";
// Bootstrap
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
// Bootstrap Routing
import { LinkContainer } from "react-router-bootstrap";

const PostsDisplay = ({ posts }) => {
  return (
    <div className="postsDisplay">
      {posts.map((post, idx) => (
        <Card key={ idx }>
          <Card.Body>
            <Card.Title>{ post.title }</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ new Date(post.createdAt).toDateString() }</Card.Subtitle>
            <Card.Text>{ post.desc }</Card.Text>
            <LinkContainer to={`/posts/${ post._id }`}>
              <Button>View Post</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostsDisplay;