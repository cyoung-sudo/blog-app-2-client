import "./Loading.scss";
// Bootstrap
import Container from "react-bootstrap/Container";

const Loading = ({ message }) => {
  return (
    <Container className="loading">
      <h1>Loading</h1>
      <div>{ message }</div>
    </Container>
  )
};

export default Loading;