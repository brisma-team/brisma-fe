import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auditScheduleData: {
    pat_id: "",
    name_kegiatan_audit: "",
    ref_metode: {
      kode: "",
      nama: "",
    },
    ref_tipe: {
      kode: "",
      nama: "",
    },
    ref_jenis: {
      kode: "",
      nama: "",
    },
    ref_tema: {
      kode: "",
      nama: "",
    },
    pelaksanaan_start: "",
    pelaksanaan_end: "",
    deskripsi: "",
    uker: [],
    echannel: [
      {
        ref_echanel_type_kode: {
          kode: "1",
          nama: "A.T.M",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "2",
          nama: "E.D.C",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "3",
          nama: "C.R.M",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
    ],
    tim_audit_id: "",
    anggaran_kegiatan: [],
    anggaran_dinas: [],
  },
  auditScheduleDefaultData: {
    pat_id: "",
    name_kegiatan_audit: "",
    ref_metode: {
      kode: "",
      nama: "",
    },
    ref_tipe: {
      kode: "",
      nama: "",
    },
    ref_jenis: {
      kode: "",
      nama: "",
    },
    ref_tema: {
      kode: "",
      nama: "",
    },
    pelaksanaan_start: "",
    pelaksanaan_end: "",
    deskripsi: "",
    uker: [
      {
        ref_auditee_orgeh_kode: "",
        ref_auditee_orgeh_name: "",
        ref_auditee_branch_kode: "",
        ref_auditee_branch_name: "",
        tipe_uker: "",
        attachments: [""],
      },
    ],
    echannel: [
      {
        ref_echanel_type_kode: {
          kode: "1",
          nama: "A.T.M",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "2",
          nama: "E.D.C",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "3",
          nama: "C.R.M",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
    ],
    tim_audit_id: "",
    anggaran_kegiatan: [],
    anggaran_dinas: [],
  },
  auditTeamData: [],
};

export const auditScheduleSlice = createSlice({
  name: "auditSchedule",
  initialState,
  reducers: {
    setAuditScheduleData: (state, action) => {
      state.auditScheduleData = action.payload;
    },
    setAuditScheduleDefaultData: (state, action) => {
      state.auditScheduleDefaultData = action.payload;
    },
    setAuditTeamData: (state, action) => {
      state.auditTeamData = action.payload;
    },
  },
});

export const {
  setAuditScheduleData,
  setAuditScheduleDefaultData,
  setAuditTeamData,
} = auditScheduleSlice.actions;

export default auditScheduleSlice.reducer;
