import "./Popup.scss";
// React
import { useEffect, useRef } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { resetPopup} from "../../reducers/popupSlice";
// Bootstrap
import Alert from "react-bootstrap/Alert";

const Popup = () => {
  // Hooks
  const timerId = useRef(null);
  const { message, type } = useSelector(state => state.popup);
  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to top for new messages
    if(message !== "") {
      window.scrollTo(0, 0);
    }

    // Set reference to timer
    timerId.current = setTimeout(() => {
      dispatch(resetPopup());
    }, 3000);

    // Clear timer on unmount
    return () => {
      clearTimeout(timerId.current);
    };
  }, [message, type]);

  if(message && type) {
    return (
      <div id="popup">
        <Alert variant={ type }>
          { message }
        </Alert>
      </div>
    );
  }
};

export default Popup;