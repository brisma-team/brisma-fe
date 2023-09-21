import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auditTeamData: {
    pat_id: "",
    name: "",
    ref_tipe_tim: { kode: "", nama: "" },
    ref_tim_audit_ma: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_kta: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_ata: [
      {
        pn: "",
        nama: "",
        jabatan: "",
        uker_binaans: [
          {
            orgeh_kode: "",
            orgeh_name: "",
            branch_name: "",
            branch_kode: "",
          },
        ],
      },
    ],
  },
  defaultData: {
    pat_id: "",
    name: "",
    ref_tipe_tim: { kode: "", nama: "" },
    ref_tim_audit_ma: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_kta: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_ata: [
      {
        pn: "",
        nama: "",
        jabatan: "",
        uker_binaans: [
          {
            orgeh_kode: "",
            orgeh_name: "",
            branch_name: "",
            branch_kode: "",
          },
        ],
      },
    ],
  },
  searchParam: {},
};

export const auditTeamSlice = createSlice({
  name: "auditTeam",
  initialState,
  reducers: {
    setAuditTeamData: (state, action) => {
      state.auditTeamData = action.payload;
    },
    setSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
    resetAuditTeamData: (state) => {
      state.auditTeamData = { ...state.defaultData };
    },
  },
});

export const { setAuditTeamData, setSearchParam, resetAuditTeamData } =
  auditTeamSlice.actions;

export default auditTeamSlice.reducer;
