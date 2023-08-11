import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentData: {
    ref_tim_audit_maker: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_approver: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_signer: [{ pn: "", nama: "", jabatan: "" }],
  },
  defaultData: {
    ref_tim_audit_maker: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_approver: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_signer: [{ pn: "", nama: "", jabatan: "" }],
  },
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocumentData: (state, action) => {
      state.documentData = action.payload;
    },
    resetDcumentData: (state) => {
      state.documentData = { ...state.defaultData };
    },
  },
});

export const { setDocumentData, resetDcumentData } = documentSlice.actions;

export default documentSlice.reducer;
