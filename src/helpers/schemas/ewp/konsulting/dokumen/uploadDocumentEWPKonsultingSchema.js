import * as yup from "yup";

const uploadDocumentEWPKonsultingSchema = yup.object().shape({
  document_name: yup.string().required("Wajib diisi"),
  ref_document_id: yup.string().required("Wajib diisi"),
  file_url: yup.string().required("Wajib diisi"),
  desc: yup.string().required("Wajib diisi"),
});

export default uploadDocumentEWPKonsultingSchema;
