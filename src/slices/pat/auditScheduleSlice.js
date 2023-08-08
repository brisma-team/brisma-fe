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
          name: "A.T.M",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "2",
          name: "E.D.C",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "3",
          name: "C.R.M",
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
  defaultData: {
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
          name: "A.T.M",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "2",
          name: "E.D.C",
        },
        jumlah_existing: null,
        jumlah_target: null,
        posisi_data: "",
      },
      {
        ref_echanel_type_kode: {
          kode: "3",
          name: "C.R.M",
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
    setAuditTeamData: (state, action) => {
      state.auditTeamData = action.payload;
    },
    resetAuditScheduleData: (state) => {
      state.auditScheduleData = { ...state.defaultData };
    },
  },
});

export const {
  setAuditScheduleData,
  setAuditTeamData,
  resetAuditScheduleData,
} = auditScheduleSlice.actions;

export default auditScheduleSlice.reducer;
