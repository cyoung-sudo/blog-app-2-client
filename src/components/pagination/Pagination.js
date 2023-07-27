import "./Pagination.scss";
// React
import { useState, useEffect } from "react";
// Bootstrap (used different name from the component)
import Pagi from "react-bootstrap/Pagination";

const Pagination = ({ page, pages, setPage }) => {
  const [items, setItems] = useState([]);

  //----- Set pagination buttons on page load
  useEffect(() => {
    let temp = [];
    // Go to first page
    temp.push(<Pagi.First key={ 1 } onClick={() => setPage(1)}/>);
    if(page - 1 > 0) {
      // Previous page
      temp.push(
        <Pagi.Item key={ 2 } onClick={() => setPage(page - 1)}>{ page - 1 }</Pagi.Item>
      );
    }
    // Current page
    temp.push(
      <Pagi.Item key={ 3 } active>{ page }</Pagi.Item>
    );
    if(page + 1 <= pages) {
      // Next page
      temp.push(
        <Pagi.Item key={ 4 } onClick={() => setPage(page + 1)}>{ page + 1 }</Pagi.Item>
      );
    }
    // Go to last page
    temp.push(<Pagi.Last key={ 5 } onClick={() => setPage(pages)}/>);
    setItems(temp);
  }, [page, pages]);

  return (
    <div className="pagination">
      <Pagi>{ items }</Pagi>
    </div>
  );
};

export default Pagination;