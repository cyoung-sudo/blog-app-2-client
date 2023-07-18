import "./EmptyList.scss";

const EmptyList = ({ listItem }) => {
  return (
    <div id="emptyList">
      <h1>No { listItem }'s...</h1>
    </div>
  );
}

export default EmptyList;