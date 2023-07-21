import "./Loading.scss";

const Loading = ({ message }) => {
  return (
    <div className="loading">
      <h1>Loading</h1>
      <div>{ message }</div>
    </div>
  )
};

export default Loading;