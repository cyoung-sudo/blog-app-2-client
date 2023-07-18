import { configureStore } from "@reduxjs/toolkit";
// Reducers
import sessionReducer from "../reducers/sessionSlice";
import popupReducer from "../reducers/popupSlice";

export default configureStore({
  reducer: {
    session: sessionReducer,
    popup: popupReducer
  }
});