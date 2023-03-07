import userSKAIReducer from "./slices/userSKAISlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		userSKAI: userSKAIReducer,
	},
});
