// PAT
import userSKAIReducer from "./slices/userSKAISlice";
import jadwalAuditReducer from "./slices/jadwalAuditSlice";
import projectOverviewReducer from "./slices/pat/projectOverviewSlice";
import statusPatReducer from "./slices/pat/statusPatSlice";
import auditTeamReducer from "./slices/pat/auditTeamSlice";
import auditScheduleReducer from "./slices/pat/auditScheduleSlice";
import activityScheduleReducer from "./slices/pat/activityScheduleSlice";
import activityScheduleOtherReducer from "./slices/pat/activityScheduleOtherSlice";
import documentPATReducer from "./slices/pat/documentSlice";
import latarBelakangReducer from "./slices/pat/latarBelakangSlice";
import sumberInformasiReducer from "./slices/pat/sumberInformasiSlice";

// EWP
import auditorInfoEWPReducer from "./slices/ewp/auditorInfoEWPSlice";
import projectOverviewEWPReducer from "./slices/ewp/projectOverviewEWPSlice";
import auditTeamMapaEWPReducer from "./slices/ewp/konvensional/mapa/auditTeamMapaEWPSlice";
import ukerAssessmentMapaEWPReducer from "./slices/ewp/konvensional/mapa/ukerAssessmentMapaEWPSlice";
import planningAnalysisMapaEWPReducer from "./slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import assignmentMapaEWPReducer from "./slices/ewp/konvensional/mapa/assignmentMapaEWPSlice";
import auditScheduleMapaEWPReducer from "./slices/ewp/konvensional/mapa/auditScheduleMapaEWPSlice";
import budgetMapaEWPReducer from "./slices/ewp/konvensional/mapa/budgetMapaEWPSlice";
import documentMapaEWPReducer from "./slices/ewp/konvensional/mapa/documentMapaEWPSlice";
import suratEWPReducer from "./slices/ewp/konvensional/surat/suratEWPSlice";
import documentSuratEWPReducer from "./slices/ewp/konvensional/surat/documentSuratEWPSlice";
// ENTRANCE
import notulenEntranceEWPReducer from "./slices/ewp/konvensional/entrance/notulenEntranceEWPSlice";

// CATALOG
import catalogEWPReducer from "./slices/catalog/ewp/catalogEWPSlice";

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
		documentPAT: documentPATReducer,
		latarBelakang: latarBelakangReducer,
		sumberInformasi: sumberInformasiReducer,
		auditorInfoEWP: auditorInfoEWPReducer,
		projectOverviewEWP: projectOverviewEWPReducer,
		auditTeamMapaEWP: auditTeamMapaEWPReducer,
		ukerAssessmentMapaEWP: ukerAssessmentMapaEWPReducer,
		planningAnalysisMapaEWP: planningAnalysisMapaEWPReducer,
		catalogEWP: catalogEWPReducer,
		assignmentMapaEWP: assignmentMapaEWPReducer,
		auditScheduleMapaEWP: auditScheduleMapaEWPReducer,
		budgetMapaEWP: budgetMapaEWPReducer,
		notulenEntranceEWP: notulenEntranceEWPReducer,
		documentMapaEWP: documentMapaEWPReducer,
		suratEWP: suratEWPReducer,
		documentSuratEWP: documentSuratEWPReducer,
	},
});
