import "./UsersDisplay.scss";
// Bootstrap
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
// Bootstrap Routing
import { LinkContainer } from "react-router-bootstrap";

const UsersDisplay = ({ users }) => {
  return (
    <div className="usersDisplay">
      {users.map((user, idx) => (
        <Card key={ idx }>
          <Card.Body>
            <Card.Title>{ user.username }</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ new Date(user.createdAt).toDateString() }</Card.Subtitle>
            <LinkContainer to={ `/users/${user._id}` }>
              <Button>View Profile</Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UsersDisplay;