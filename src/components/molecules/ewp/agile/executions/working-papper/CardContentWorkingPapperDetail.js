import { Card } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";

const Content = ({ property, value }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="font-bold">{property} :</div>
      <div className="font-medium">{value}</div>
    </div>
  );
};

const CardContentWorkingPapperDetail = ({ data }) => {
  return (
    <Card>
      <div className="w-full px-3 py-1 flex gap-3 max-h-[12rem] overflow-y-scroll">
        <div className="w-1/2 flex flex-col gap-3">
          <Content
            property={"AUDITOR"}
            value={`${data?.auditor?.pn} - ${data?.auditor?.name}`}
          />
          <Content property={"STATUS"} value={data?.status_persetujuan} />
          <Content
            property={"UKER / DIVISI"}
            value={`[${data?.uker?.ref_auditee_orgeh_kode}][${data?.uker?.ref_auditee_branch_kode}] - ${data?.uker?.ref_auditee_branch_name}`}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <Content
            property={"STORY POINT (RISK ISSUE)"}
            value={`${data?.risk_issue?.abbr} - ${data?.risk_issue?.nama}`}
          />
          <Content
            property={"EPIC (SUB MAJOR RISK)"}
            value={
              data?.sub_major_proses?.kode
                ? `${data?.sub_major_proses?.abbr} - ${data?.sub_major_proses?.nama}`
                : ""
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default CardContentWorkingPapperDetail;
