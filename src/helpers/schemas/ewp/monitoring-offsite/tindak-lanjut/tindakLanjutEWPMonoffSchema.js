import * as yup from "yup";
const tindakLanjutEWPMonoffSchema = yup.object().shape({
	auditor: yup
		.array()
		.of(
			yup.object().shape({
				pn: yup.string().required("Field wajib diisi"),
			})
		)
		.min(1, "Minimal 1 data Auditor wajib diisi")
		.test("uniquePn", "PN tidak boleh sama", function (value) {
			const dataPn = value.map((item) => item.pn);
			const duplicatePnInAuditor = dataPn.filter(
				(pn, index) => dataPn.indexOf(pn) !== index
			);
			return duplicatePnInAuditor.length === 0;
		})
		.test("uniquePnInAuditor", "PN tidak boleh sama", function (value) {
			const pnsInAuditor = value.map((item) => item.pn);
			const pnsInAuditee = this.parent.auditee
				? this.parent.auditee.map((item) => item.pn)
				: [];
			const pnsInATA = this.parent.ata
				? this.parent.ata.map((item) => item.pn)
				: [];

			const duplicates = pnsInAuditor.filter(
				(pn) => pnsInAuditee.includes(pn) || pnsInATA.includes(pn)
			);

			return duplicates.length === 0;
		}),
	desc: yup
		.array()
		.of(
			yup.object().shape({
				deskripsi: yup.string().required("Field wajib diisi"),
			})
		),
});

export default tindakLanjutEWPMonoffSchema;
