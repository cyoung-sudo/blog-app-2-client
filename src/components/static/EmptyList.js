import "./EmptyList.scss";
// Bootstrap
import Card from "react-bootstrap/Card";

const EmptyList = ({ listItem }) => {
  return (
    <div id="emptyList">
      <Card>
        <Card.Body>
          <Card.Title>No { listItem }'s...</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmptyList;