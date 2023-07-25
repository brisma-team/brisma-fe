import userSKAIReducer from "./slices/userSKAISlice";
<<<<<<< Updated upstream
import jadwalAuditReducer from "./slices/jadwalAuditSlice";
=======
>>>>>>> Stashed changes

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
<<<<<<< Updated upstream
  reducer: {
    userSKAI: userSKAIReducer,
    jadwalAudit: jadwalAuditReducer,
  },
=======
	reducer: {
		userSKAI: userSKAIReducer,
	},
>>>>>>> Stashed changes
});
