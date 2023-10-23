import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	suratData: {},
};

export const suratEWPSlice = createSlice({
	name: "suratEWP",
	initialState,
	reducers: {
		setSuratData: (state, action) => {
			state.suratData = action.payload;
		},
		resetSuratData: (state) => {
			state.suratData = {};
		},
	},
});

export const { setSuratData, resetSuratData } = suratEWPSlice.actions;

export default suratEWPSlice.reducer;
