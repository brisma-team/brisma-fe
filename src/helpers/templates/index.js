import moment from "moment";
import { getBiayaDinasTable } from "./biaya_dinas";
import { getBiayaLainTable } from "./biaya_lainnya";
import { getBiayaTotalHtml } from "./biaya_total";
import { getAuditScheduleTable } from "./auditSchedule";
import { getJadwalLainTable } from "./jadwal_lain";
import { getActivityScheduleTable } from "./activitySchedule";
import { getTargetAuditAiwTable } from "./auditTarget";
import { getAuditTeamTable } from "./auditTeam";
import { getHtml } from "./html";

export const generateHtmlAiw = ({
  tahun,
  uka_info,
  latar_belakang,
  sumber_informasi,
  target_audit_data,
  jadwal_audit_data,
  sbp_data,
  jadwal_lain_data,
  tim_audit_data,
  biaya_total_data,
  biaya_dinas_data,
  biaya_lain_data,
  signers,
}) => {
  const sbp_table = getActivityScheduleTable(sbp_data);
  const jadwal_lain_table = getJadwalLainTable(jadwal_lain_data);
  const tim_audit_table = getAuditTeamTable(tim_audit_data);
  const biaya_total = getBiayaTotalHtml(tahun, biaya_total_data);
  const biaya_dinas_table = getBiayaDinasTable(biaya_dinas_data);
  const biaya_lain_table = getBiayaLainTable(biaya_lain_data);
  const target_audit_aiw_table = getTargetAuditAiwTable(target_audit_data);
  const jadwal_audit_aiw_table = getAuditScheduleTable(jadwal_audit_data);

  const html = getHtml(
    uka_info,
    latar_belakang,
    sumber_informasi,
    target_audit_aiw_table,
    jadwal_audit_aiw_table,
    sbp_table,
    jadwal_lain_table,
    tim_audit_table,
    biaya_total,
    biaya_dinas_table,
    biaya_lain_table,
    tahun,
    moment().format("DD MMMM YYYY"),
    signers
  );

  return html;
};
