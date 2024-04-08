import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objPayloadLogin: {
    pn: "",
    password: "",
    remember_me: false,
    captcha: "",
  },
  resetObjPayloadLogin: {
    pn: "",
    password: "",
    remember_me: false,
    captcha: "",
  },
  validationErrorsLogin: {},
};

export const landingPageSlice = createSlice({
  name: "landingPage",
  initialState,
  reducers: {
    setObjPayloadLogin: (state, action) => {
      state.objPayloadLogin = action.payload;
    },
    setValidationErrorsLogin: (state, action) => {
      state.validationErrorsLogin = action.payload;
    },
    resetObjPayloadLogin: (state) => {
      state.objPayloadLogin = { ...state.resetObjPayloadLogin };
    },
    resetValidationErrorsLogin: (state) => {
      state.validationErrorsLogin = {};
    },
  },
});

export const {
  setObjPayloadLogin,
  setValidationErrorsLogin,
  resetObjPayloadLogin,
  resetValidationErrorsLogin,
} = landingPageSlice.actions;

export default landingPageSlice.reducer;
