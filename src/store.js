import userSKAIReducer from "./slices/userSKAISlice";
import jadwalAuditReducer from "./slices/jadwalAuditSlice";
import projectOverviewReducer from "./slices/pat/projectOverviewSlice";
import statusPatReducer from "./slices/pat/statusPatSlice";
import auditTeamReducer from "./slices/pat/auditTeamSlice";
import auditScheduleReducer from "./slices/pat/auditScheduleSlice";
import activityScheduleReducer from "./slices/pat/activityScheduleSlice";
import activityScheduleOtherReducer from "./slices/pat/activityScheduleOtherSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    userSKAI: userSKAIReducer,
    jadwalAudit: jadwalAuditReducer,
    projectOverview: projectOverviewReducer,
    statusPat: statusPatReducer,
    auditTeam: auditTeamReducer,
    auditSchedule: auditScheduleReducer,
    activitySchedule: activityScheduleReducer,
    activityScheduleOther: activityScheduleOtherReducer,
  },
});
