import { convertDate } from "@/helpers";
import Content from "../negosiasi/Content";
import { CardContentHeaderFooter } from "@/components/molecules/commons";

const CardContentObjek = ({ data, isNewData }) => {
  return (
    <CardContentHeaderFooter
      header={
        <div className="px-3 py-2">
          <div className="font-semibold text-base">
            OBJEK {isNewData ? "NEGOSIASI" : "AWAL"}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-2.5 h-full px-3 py-2">
        <Content
          title={"OBJEK TINDAK LANJUT"}
          value={`[${data?.object?.id?.toUpperCase() || ""}] ${
            data?.object?.name || ""
          }`}
          titleColor={isNewData ? "text-atlasian-red" : ""}
          textColor={isNewData ? "text-atlasian-red" : ""}
        />
        <Content
          title={"UKER"}
          value={`[${data?.uker?.ref_auditee_orgeh_kode || ""}][${
            data?.uker?.ref_auditee_branch_kode || ""
          }] - ${data?.uker?.ref_auditee_branch_name || ""}`}
          titleColor={isNewData ? "text-atlasian-red" : ""}
          textColor={isNewData ? "text-atlasian-red" : ""}
        />
        <Content
          title={`REKOMENDASI - ${
            data?.rekomendasi?.nama?.toUpperCase() || ""
          }`}
          value={data?.rekomendasi?.description || ""}
          titleColor={isNewData ? "text-atlasian-red" : ""}
          textColor={isNewData ? "text-atlasian-red" : ""}
        />
        <Content
          title={"ACTION PLAN"}
          value={data?.action_plan?.name || ""}
          titleColor={isNewData ? "text-atlasian-red" : ""}
          textColor={isNewData ? "text-atlasian-red" : ""}
        />
        <Content
          title={"DEADLINE"}
          value={data?.deadline ? convertDate(data?.deadline, "-", "d") : ""}
          titleColor={isNewData ? "text-atlasian-red" : ""}
          textColor={isNewData ? "text-atlasian-red" : ""}
        />
      </div>
    </CardContentHeaderFooter>
  );
};

export default CardContentObjek;
