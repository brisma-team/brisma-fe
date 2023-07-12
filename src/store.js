import userSKAIReducer from "./slices/userSKAISlice";
import jadwalAuditReducer from "./slices/jadwalAuditSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    userSKAI: userSKAIReducer,
    jadwalAudit: jadwalAuditReducer,
  },
});
