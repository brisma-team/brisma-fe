import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	searchParamObject: {},
	searchParam: "",
};

export const userSKAISlice = createSlice({
	name: "userSKAI",
	initialState,
	reducers: {
		setSearchParamObject: (state, action) => {
			state.searchParamObject = action.payload;
		},
		setSearchParam: (state, action) => {
			state.searchParam = action.payload;
		},
	},
});

export const { setSearchParam, setSearchParamObject } = userSKAISlice.actions;

export default userSKAISlice.reducer;
