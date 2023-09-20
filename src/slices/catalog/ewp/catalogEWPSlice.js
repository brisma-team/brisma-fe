import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchParamObjectCAT: {},
};

export const catalogEWPSlice = createSlice({
	name: "catalogEWP",
	initialState,
	reducers: {
		setSearchParamsCATEWP: (state, action) => {
			state.searchParamObjectCAT = action.payload;
		},
	},
});

export const { setSearchParamsCATEWP} =
	catalogEWPSlice.actions;

export default catalogEWPSlice.reducer;
