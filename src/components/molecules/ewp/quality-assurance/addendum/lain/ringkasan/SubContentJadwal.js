import { TableJadwal } from "@/components/molecules/ewp/common/jadwal";
import { useEffect, useState } from "react";
import _ from "lodash";

const SubContentJadwal = ({ data }) => {
  const [dataJadwal, setDataJadwal] = useState([]);
  const [payloadJadwal, setPayloadJadwal] = useState({});
  useEffect(() => {
    if (data) {
      const mappingData = [
        {
          keterangan: "Perencanaan (MAR)",
          property_start: "penyusunan_mapa_plan_start",
          property_end: "penyusunan_mapa_plan_end",
        },
        {
          keterangan: "Pelaksanaan",
          property_start: "pelaksanaan_audit_plan_start",
          property_end: "pelaksanaan_audit_plan_end",
        },
        {
          keterangan: "Reporting",
          property_start: "monitoring_plan_start",
          property_end: "monitoring_plan_end",
        },
        {
          keterangan: "Wrap-up Meeting",
          property_start: "Wrapup_Meeting_plan_start",
          property_end: "Wrapup_Meeting_plan_end",
        },
      ];

      const mappingPayload = _.pick(data, [
        "penyusunan_mapa_plan_start",
        "penyusunan_mapa_plan_end",
        "pelaksanaan_audit_plan_start",
        "pelaksanaan_audit_plan_end",
        "monitoring_plan_start",
        "monitoring_plan_end",
        "Wrapup_Meeting_plan_start",
        "Wrapup_Meeting_plan_end",
      ]);

      setDataJadwal(mappingData);
      setPayloadJadwal(mappingPayload);
    } else {
      setDataJadwal([]);
      setPayloadJadwal({});
    }
  }, [data]);

  return <TableJadwal data={dataJadwal} payload={payloadJadwal} isDisabled />;
};

export default SubContentJadwal;
