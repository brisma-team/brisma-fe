import landingPageReducer from "./slices/landing/landingPageSlice";

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

// EWP Konsulting
import projectOverviewEWPKonsultingReducer from "./slices/ewp/konsulting/projectOverviewEWPKonsultingSlice";
import timTimePlanEWPKonsultingReducer from "./slices/ewp/konsulting/perencanaan/timTimePlanEWPKonsultingSlice";
import anggaranEWPKonsultingReducer from "./slices/ewp/konsulting/perencanaan/anggaranEWPKonsultingSlice";
import programKerjaEWPKonsultingReducer from "./slices/ewp/konsulting/perencanaan/programKerjaEWPKonsultingSlice";
import documentMapaEWPKonsultingReducer from "./slices/ewp/konsulting/perencanaan/documentMapaEWPKonsultingSlice";
import lingkupEWPKonsultingReducer from "./slices/ewp/konsulting/analisa/lingkupEWPKonsultingSlice";
import matrixEWPKonsultingReducer from "./slices/ewp/konsulting/analisa/matrixEWPKonsultingSlice";
import rekomendasiEWPKonsultingReducer from "./slices/ewp/konsulting/analisa/rekomendasiEWPKonsultingSlice";
import overviewDetailPeluangReducer from "./slices/ewp/konsulting/peluang-peningkatan/overviewDetailPeluangSlice";
import documentKkpaEWPKonsultingReducer from "./slices/ewp/konsulting/analisa/documentMapaEWPKonsultingSlice";
import documentEWPKonsultingReducer from "./slices/ewp/konsulting/dokumen/documentEWPKonsultingSlice";
import overviewMeetingEWPKonsultingReducer from "./slices/ewp/konsulting/meeting/overviewMeetingEWPKonsultingSlice";
import attendanceMeetingEWPKonsultingReducer from "./slices/ewp/konsulting/meeting/attendanceMeetingEWPKonsultingSlice";
import riskRekomendasiReducer from "./slices/ewp/konsulting/peluang-peningkatan/riskRekomendasiSlice";
import notulenMeetingEWPKonsultingReducer from "./slices/ewp/konsulting/meeting/notulenMeetingEWPKonsultingSlice";
import beritaAcaraMeetingEWPKonsultingReducer from "./slices/ewp/konsulting/meeting/beritaAcaraMeetingEWPKonsultingSlice";
import documentMatrixPeluangKonsultingReducer from "./slices/ewp/konsulting/peluang-peningkatan/documentMatrixPeluangKonsultingSlice";
import documentDetailPeluangKonsultingReducer from "./slices/ewp/konsulting/peluang-peningkatan/documentDetailPeluangKonsultingSlice";
import infoEWPKonsultingReducer from "./slices/ewp/konsulting/info/infoEWPKonsultingSlice";
import timTimeplanAddendumEWPKonsultingReducer from "./slices/ewp/konsulting/addendum/utama/timTimeplanAddendumEWPKonsultingSlice";
import programKerjaAddendumEWPKonsultingReducer from "./slices/ewp/konsulting/addendum/utama/programKerjaAddendumEWPKonsultingSlice";
import anggaranSBPAddendumReducer from "./slices/ewp/konsulting/addendum/lain/anggaranSBPAddendumSlice";
import ringkasanSBPAddendumReducer from "./slices/ewp/konsulting/addendum/lain/ringkasanSBPAddendumSlice";
import ringkasanUtamaAddendumEWPKonsultingReducer from "./slices/ewp/konsulting/addendum/utama/ringkasanUtamaAddendumEWPKonsultingSlice";
import changeInitiatorReducer from "./slices/ewp/konsulting/changeInitiatorSlice";

// EWP Quality Assurance
import overviewEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/overview/overviewEWPQualityAssuranceSlice";
import infoEWPQualityAssuranceSliceReducer from "./slices/ewp/quality-assurance/info/infoEWPQualityAssuranceSlice";
import previewTemplateSurveyEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/info/previewTemplateSurveyEWPQualityAssuranceSlice";
import timEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/perencanaan/timEWPQualityAssuranceSlice";
import ukerAssessmentEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/perencanaan/ukerAssessmentEWPQualityAssuranceSlice";
import anggaranEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/perencanaan/anggaranEWPQualityAssuranceSlice";
import analisisPerencanaanEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/perencanaan/analisisPerencanaanEWPQualityAssuranceSlice";
import penugasanEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/perencanaan/penugasanEWPQualityAssuranceSlice";
import jadwalEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/perencanaan/jadwalEWPQualityAssuranceSlice";
import dokumenPerencanaanEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/perencanaan/dokumenPerencanaanEWPQualityAssuranceSlice";
import pelaksanaanEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/pelaksanaan/pelaksanaanEWPQualityAssuranceSlice";
import listSurveyEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/reporting/listSurveyEWPQualityAssuranceSlice";
import rencanaPerbaikanEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/reporting/rencanaPerbaikanEWPQualityAssuranceSlice";
import actionPlanEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/reporting/actionPlanEWPQualityAssuranceSlice";
import dokumenReportingEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/reporting/dokumenReportingEWPQualityAssuranceSlice";
import documentEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/dokumen/documentEWPQualityAssuranceSlice";
import overviewMeetingEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/meeting/overviewMeetingEWPQualityAssuranceSlice";
import attendanceMeetingEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/meeting/attendanceMeetingEWPQualityAssuranceSlice";
import notulenMeetingEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/meeting/notulenMeetingEWPQualityAssuranceSlice";
import beritaAcaraMeetingEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/meeting/beritaAcaraMeetingEWPQualityAssuranceSlice";
import addendumLainQualityAssuranceReducer from "./slices/ewp/quality-assurance/addendum/addendumLainQualityAssuranceSlice";
import addendumUtamaQualityAssuranceReducer from "./slices/ewp/quality-assurance/addendum/addendumUtamaQualityAssuranceSlice";
import analisisPerencanaanAddendumUtamaEWPQualityAssuranceReducer from "./slices/ewp/quality-assurance/addendum/utama/analisisPerencanaanAddendumUtamaEWPQualityAssuranceSlice";

//EWP MONOFF
import projectOverviewEWPMonoffReducer from "./slices/ewp/monitoring-offsite/projectOverviewEWPMonoffSlice";
import timEWPMonoffReducer from "./slices/ewp/monitoring-offsite/perencanaan/timEWPMonoffSlice";
import documentEWPMonoffReducer from "./slices/ewp/monitoring-offsite/dokumen/documentEWPMonoffSlice";
import attendanceMeetingEWPMonoffReducer from "./slices/ewp/monitoring-offsite/meeting/attendanceMeetingEWPMonoffSlice";
import beritaAcaraMeetingEWPMonoffReducer from "./slices/ewp/monitoring-offsite/meeting/beritaAcaraMeetingEWPMonoffSlice";
import notulenMeetingEWPMonoffReducer from "./slices/ewp/monitoring-offsite/meeting/notulenMeetingEWPMonoffSlice";
import overviewMeetingEWPMonoffReducer from "./slices/ewp/monitoring-offsite/meeting/overviewMeetingEWPMonoffSlice";
import documentMapaEWPMonoffReducer from "./slices/ewp/monitoring-offsite/reporting/documentMapaEWPMonoffSlice";
import tindakLanjutEWPMonoffReducer from "./slices/ewp/monitoring-offsite/tindak-lanjut/tindakLanjutEWPMonoffSlice";
import ukerAssessmentEWPMonoffReducer from "./slices/ewp/monitoring-offsite/perencanaan/ukerAssessmentEWPMonoffSlice";

// EWP Agile
import overviewEWPAgileReducer from "./slices/ewp/agile/overview/overviewEWPAgileSlice";
import infoEWPAgileReducer from "./slices/ewp/agile/info/infoEWPAgileSlice";
import auditCanvasEWPAgileReducer from "./slices/ewp/agile/initiation/auditCanvasEWPAgileSlice";
import workingAgreementsEWPAgileReducer from "./slices/ewp/agile/initiation/workingAgreementsEWPAgileSlice";
import dokumenInitiationEWPAgileReducer from "./slices/ewp/agile/initiation/dokumenInitiationEWPAgileSlice";
import storyAggregationEWPAgileReducer from "./slices/ewp/agile/plannings/storyAggregationEWPAgileSlice";
import storyAggregationSelectedEWPAgileReducer from "./slices/ewp/agile/plannings/storyAggregationSelectedEWPAgileSlice";
import auditBacklogEWPAgileReducer from "./slices/ewp/agile/plannings/auditBacklogEWPAgileSlice";
import sprintPlanningEWPAgileReducer from "./slices/ewp/agile/plannings/sprintPlanningEWPAgileSlice";
import dokumenPlanningEWPAgileReducer from "./slices/ewp/agile/plannings/dokumenPlanningEWPAgileSlice";
import auditBacklogExecutionEWPAgileReducer from "./slices/ewp/agile/executions/auditBacklogExecutionEWPAgileSlice";
import sprintExecutionEWPAgileReducer from "./slices/ewp/agile/executions/sprintExecutionEWPAgileSlice";
import storyPointDetailEWPAgileReducer from "./slices/ewp/agile/executions/storyPointDetailEWPAgileSlice";
import sprintWorkingPaperExecutionEWPAgileReducer from "./slices/ewp/agile/executions/sprintWorkingPaperExecutionEWPAgileSlice";
import workingPaperExecutionEWPAgileReducer from "./slices/ewp/agile/executions/workingPaperExecutionEWPAgileSlice";
import designEffectivenessExecutionEWPAgileReducer from "./slices/ewp/agile/executions/designEffectivenessExecutionEWPAgileSlice";

// ENTRANCE
import notulenEntranceEWPReducer from "./slices/ewp/konvensional/entrance/notulenEntranceEWPSlice";
import beritaAcaraEntranceEWPReducer from "./slices/ewp/konvensional/entrance/beritaAcaraEntranceEWPSlice";

// RPM Konsulting
import documentRPMKegiatanReducer from "./slices/rpm/kegiatan/documentRPMKegiatanSlice";

// RPM Quality Assurance
import overviewRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/overviewRPMQualityAssuranceSlice";
import timOverviewRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/timOverviewRPMQualityAssuranceSlice";
import tindakLanjutRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/tindakLanjutRPMQualityAssuranceSlice";
import tindakLanjutActionPlanRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/tindakLanjutActionPlanRPMQualityAssuranceSlice";
import evaluasiRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/evaluasiRPMQualityAssuranceSlice";
import evaluasiActionPlanRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/evaluasiActionPlanRPMQualityAssuranceSlice";
import negosiasiRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/negosiasiRPMQualityAssuranceSlice";
import negosiasiActionPlanRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/negosiasiActionPlanRPMQualityAssuranceSlice";
import summaryRPMQualityAssuranceReducer from "./slices/rpm/quality-assurance/summaryRPMQualityAssuranceSlice";

// CATALOG
import catalogEWPReducer from "./slices/catalog/ewp/catalogEWPSlice";
import catalogPATReducer from "./slices/catalog/pat/catalogPATSlice";
import catalogRPMReducer from "./slices/catalog/rpm/catalogRPMSlice";

// REFERENCE
import createTemplateReferenceSlice from "./slices/reference/createTemplateReferenceSlice";
import approvalAdminSurveyReferenceReducer from "./slices/reference/approvalAdminSurveyReferenceSlice";
import simulasiTemplateReferenceReducer from "./slices/reference/simulasiTemplateReferenceSlice";

// SURVEY
import penilaianSurveyReducer from "./slices/survey/initiator/penilaianSurveySlice";
import createSurveyReducer from "./slices/survey/initiator/createSurveySlice";
import previewTemplateReferenceReducer from "./slices/reference/previewTemplateReferenceSlice";
import respondenSurveyReducer from "./slices/survey/initiator/respondenSurveySlice";
import respondenAnswerReducer from "./slices/survey/responden/respondenAnswerSlice";
import penilaianRespondenSurveyReducer from "./slices/survey/responden/penilaianRespondenSurvey";
import previewSurveyReducer from "./slices/survey/initiator/previewSurveySlice";
import approvalInitiatorSurveyReducer from "./slices/survey/initiator/approvalSurveySlice";
import approvalRespondenSurveyReducer from "./slices/survey/responden/approvalSurveySlice";
import additionalQuestionSurveyReducer from "./slices/survey/initiator/additionalQuestionSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    landingPage: landingPageReducer,
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
    catalogPAT: catalogPATReducer,
    catalogRPM: catalogRPMReducer,
    assignmentMapaEWP: assignmentMapaEWPReducer,
    auditScheduleMapaEWP: auditScheduleMapaEWPReducer,
    budgetMapaEWP: budgetMapaEWPReducer,
    notulenEntranceEWP: notulenEntranceEWPReducer,
    beritaAcaraEntranceEWP: beritaAcaraEntranceEWPReducer,
    documentMapaEWP: documentMapaEWPReducer,
    suratEWP: suratEWPReducer,
    documentSuratEWP: documentSuratEWPReducer,

    // EWP Konsulting
    projectOverviewEWPKonsulting: projectOverviewEWPKonsultingReducer,
    timTimePlanEWPKonsulting: timTimePlanEWPKonsultingReducer,
    anggaranEWPKonsulting: anggaranEWPKonsultingReducer,
    programKerjaEWPKonsulting: programKerjaEWPKonsultingReducer,
    documentMapaEWPKonsulting: documentMapaEWPKonsultingReducer,
    lingkupEWPKonsulting: lingkupEWPKonsultingReducer,
    matrixEWPKonsulting: matrixEWPKonsultingReducer,
    rekomendasiEWPKonsulting: rekomendasiEWPKonsultingReducer,
    overviewDetailPeluang: overviewDetailPeluangReducer,
    documentKkpaEWPKonsulting: documentKkpaEWPKonsultingReducer,
    documentEWPKonsulting: documentEWPKonsultingReducer,
    overviewMeetingEWPKonsulting: overviewMeetingEWPKonsultingReducer,
    attendanceMeetingEWPKonsulting: attendanceMeetingEWPKonsultingReducer,
    riskRekomendasi: riskRekomendasiReducer,
    notulenMeetingEWPKonsulting: notulenMeetingEWPKonsultingReducer,
    beritaAcaraMeetingEWPKonsulting: beritaAcaraMeetingEWPKonsultingReducer,
    documentMatrixPeluangKonsulting: documentMatrixPeluangKonsultingReducer,
    documentDetailPeluangKonsulting: documentDetailPeluangKonsultingReducer,
    infoEWPKonsulting: infoEWPKonsultingReducer,
    timTimeplanAddendumEWPKonsulting: timTimeplanAddendumEWPKonsultingReducer,
    programKerjaAddendumEWPKonsulting: programKerjaAddendumEWPKonsultingReducer,
    anggaranSBPAddendum: anggaranSBPAddendumReducer,
    ringkasanSBPAddendum: ringkasanSBPAddendumReducer,
    ringkasanUtamaAddendumEWPKonsulting:
      ringkasanUtamaAddendumEWPKonsultingReducer,
    changeInitiator: changeInitiatorReducer,

    // EWP Quality Assurance
    overviewEWPQualityAssurance: overviewEWPQualityAssuranceReducer,
    infoEWPQualityAssurance: infoEWPQualityAssuranceSliceReducer,
    previewTemplateSurveyEWPQualityAssurance:
      previewTemplateSurveyEWPQualityAssuranceReducer,
    timEWPQualityAssurance: timEWPQualityAssuranceReducer,
    ukerAssessmentEWPQualityAssurance: ukerAssessmentEWPQualityAssuranceReducer,
    anggaranEWPQualityAssurance: anggaranEWPQualityAssuranceReducer,
    analisisPerencanaanEWPQualityAssurance:
      analisisPerencanaanEWPQualityAssuranceReducer,
    penugasanEWPQualityAssurance: penugasanEWPQualityAssuranceReducer,
    jadwalEWPQualityAssurance: jadwalEWPQualityAssuranceReducer,
    dokumenPerencanaanEWPQualityAssurance:
      dokumenPerencanaanEWPQualityAssuranceReducer,
    pelaksanaanEWPQualityAssurance: pelaksanaanEWPQualityAssuranceReducer,
    listSurveyEWPQualityAssurance: listSurveyEWPQualityAssuranceReducer,
    rencanaPerbaikanEWPQualityAssurance:
      rencanaPerbaikanEWPQualityAssuranceReducer,
    actionPlanEWPQualityAssurance: actionPlanEWPQualityAssuranceReducer,
    dokumenReportingEWPQualityAssurance:
      dokumenReportingEWPQualityAssuranceReducer,
    documentEWPQualityAssurance: documentEWPQualityAssuranceReducer,
    overviewMeetingEWPQualityAssurance:
      overviewMeetingEWPQualityAssuranceReducer,
    attendanceMeetingEWPQualityAssurance:
      attendanceMeetingEWPQualityAssuranceReducer,
    notulenMeetingEWPQualityAssurance: notulenMeetingEWPQualityAssuranceReducer,
    beritaAcaraMeetingEWPQualityAssurance:
      beritaAcaraMeetingEWPQualityAssuranceReducer,
    addendumLainQualityAssurance: addendumLainQualityAssuranceReducer,
    addendumUtamaQualityAssurance: addendumUtamaQualityAssuranceReducer,
    analisisPerencanaanAddendumUtamaEWPQualityAssurance:
      analisisPerencanaanAddendumUtamaEWPQualityAssuranceReducer,

    // EWP Agile
    overviewEWPAgile: overviewEWPAgileReducer,
    infoEWPAgile: infoEWPAgileReducer,
    auditCanvasEWPAgile: auditCanvasEWPAgileReducer,
    workingAgreementsEWPAgile: workingAgreementsEWPAgileReducer,
    dokumenInitiationEWPAgile: dokumenInitiationEWPAgileReducer,
    storyAggregationEWPAgile: storyAggregationEWPAgileReducer,
    storyAggregationSelectedEWPAgile: storyAggregationSelectedEWPAgileReducer,
    auditBacklogEWPAgile: auditBacklogEWPAgileReducer,
    sprintPlanningEWPAgile: sprintPlanningEWPAgileReducer,
    dokumenPlanningEWPAgile: dokumenPlanningEWPAgileReducer,
    auditBacklogExecutionEWPAgile: auditBacklogExecutionEWPAgileReducer,
    sprintExecutionEWPAgile: sprintExecutionEWPAgileReducer,
    storyPointDetailEWPAgile: storyPointDetailEWPAgileReducer,
    sprintWorkingPaperExecutionEWPAgile:
      sprintWorkingPaperExecutionEWPAgileReducer,
    workingPaperExecutionEWPAgile: workingPaperExecutionEWPAgileReducer,
    designEffectivenessExecutionEWPAgile:
      designEffectivenessExecutionEWPAgileReducer,

    // RPM Konsulting
    documentRPMKegiatan: documentRPMKegiatanReducer,

    // RPM QualityAssurance
    overviewRPMQualityAssurance: overviewRPMQualityAssuranceReducer,
    timOverviewRPMQualityAssurance: timOverviewRPMQualityAssuranceReducer,
    tindakLanjutRPMQualityAssurance: tindakLanjutRPMQualityAssuranceReducer,
    tindakLanjutActionPlanRPMQualityAssurance:
      tindakLanjutActionPlanRPMQualityAssuranceReducer,
    evaluasiRPMQualityAssurance: evaluasiRPMQualityAssuranceReducer,
    evaluasiActionPlanRPMQualityAssurance:
      evaluasiActionPlanRPMQualityAssuranceReducer,
    negosiasiRPMQualityAssurance: negosiasiRPMQualityAssuranceReducer,
    negosiasiActionPlanRPMQualityAssurance:
      negosiasiActionPlanRPMQualityAssuranceReducer,
    summaryRPMQualityAssurance: summaryRPMQualityAssuranceReducer,

    //EWP Monoff
    projectOverviewEWPMonoff: projectOverviewEWPMonoffReducer,
    timEWPMonoff: timEWPMonoffReducer,
    dokumenEWPMonoff: documentEWPMonoffReducer,
    attendanceMeetingEWPMonoff: attendanceMeetingEWPMonoffReducer,
    beritaAcaraMeetingEWPMonoff: beritaAcaraMeetingEWPMonoffReducer,
    notulenMeetingEWPMonoff: notulenMeetingEWPMonoffReducer,
    overviewMeetingEWPMonoff: overviewMeetingEWPMonoffReducer,
    documentMapaEWPMonoff: documentMapaEWPMonoffReducer,
    tindakLanjutEWPMonoff: tindakLanjutEWPMonoffReducer,
    ukerAssessmentEWPMonoff: ukerAssessmentEWPMonoffReducer,

    // REFERENCE
    createTemplateReference: createTemplateReferenceSlice,
    approvalAdminSurveyReference: approvalAdminSurveyReferenceReducer,
    simulasiTemplateReference: simulasiTemplateReferenceReducer,

    // SURVEY
    penilaianSurvey: penilaianSurveyReducer,
    createSurvey: createSurveyReducer,
    previewTemplateReference: previewTemplateReferenceReducer,
    respondenSurvey: respondenSurveyReducer,
    respondenAnswer: respondenAnswerReducer,
    penilaianRespondenSurvey: penilaianRespondenSurveyReducer,
    previewSurvey: previewSurveyReducer,
    approvalInitiatorSurvey: approvalInitiatorSurveyReducer,
    approvalRespondenSurvey: approvalRespondenSurveyReducer,
    additionalQuestionSurvey: additionalQuestionSurveyReducer,
  },
});
