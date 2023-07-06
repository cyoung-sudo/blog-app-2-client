import { configureStore } from "@reduxjs/toolkit";
// Reducers
import sessionReducer from "../reducers/sessionSlice";

export default configureStore({
  reducer: {
    session: sessionReducer
  }
});