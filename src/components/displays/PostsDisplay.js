import "./PostsDisplay.scss";
// Bootstrap
import Card from "react-bootstrap/Card";

const PostsDisplay = ({ posts }) => {
  return (
    <div className="postsDisplay">
      {posts.map((post, idx) => (
        <Card key={ idx }>
          <Card.Body>
            <Card.Title>{ post.title }</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ new Date(post.createdAt).toDateString() }</Card.Subtitle>
            <Card.Text>{ post.desc }</Card.Text>
            <Card.Link href="#">Like</Card.Link>
            <Card.Link href="#">Dislike</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostsDisplay;