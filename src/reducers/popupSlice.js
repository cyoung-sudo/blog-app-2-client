import { createSlice } from "@reduxjs/toolkit";

export const popupSlice = createSlice({
  name: "popup",
  initialState: {
    message: "",
    type: ""
  },
  reducers: {
    setPopup: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn"t actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    resetPopup: state => {
      state.message = "";
      state.type = "";
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPopup, resetPopup } = popupSlice.actions

export default popupSlice.reducer;