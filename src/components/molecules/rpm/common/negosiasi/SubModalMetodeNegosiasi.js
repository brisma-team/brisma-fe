import { ButtonIcon, RadioField } from "@/components/atoms";
import { ButtonEdit, CardContent } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import Content from "./Content";

const SubModalMetodeNegosiasi = ({
  data,
  payload,
  handleChangePayload,
  handleClickEditReason,
}) => {
  const valueRadio = [
    { kode: "1", nama: "Perpanjangan Deadline" },
    { kode: "2", nama: "Penggantian Action Plan" },
    { kode: "3", nama: "Penggantian Rekomendasi" },
  ];
  return (
    <>
      <div className="flex gap-3">
        <div className="w-3/5">
          <CardContent>
            <div className="flex flex-col gap-2.5">
              <Content
                title={"OBJEK TINDAK LANJUT"}
                value={`[${data?.object?.id || ""}] ${
                  data?.object?.name || ""
                }`}
              />
              <Content
                title={"UKER"}
                value={`[${data?.uker?.ref_auditee_orgeh_kode || ""}][${
                  data?.uker?.ref_auditee_branch_kode || ""
                }] - ${data?.uker?.ref_auditee_branch_name || ""}`}
              />
              <Content
                title={`REKOMENDASI - ${
                  data?.rekomendasi?.nama?.toUpperCase() || ""
                }`}
                value={data?.rekomendasi?.description || ""}
              />
              <Content
                title={"ACTION PLAN"}
                value={data?.action_plan?.name || ""}
              />
              <Content
                title={"DEADLINE"}
                value={
                  data?.deadline ? convertDate(data?.deadline, "-", "d") : ""
                }
              />
            </div>
          </CardContent>
        </div>
        <div className="w-2/5">
          <CardContent className="h-full">
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="text-sm text-brisma font-bold">
                  ALASAN NEGOSIASI :
                </div>
                <div className="text-sm text-brisma">
                  {payload?.alasan || ""}
                </div>
              </div>
              <div className="flex justify-end">
                <ButtonIcon
                  icon={<ButtonEdit />}
                  handleClick={handleClickEditReason}
                />
              </div>
            </div>
          </CardContent>
        </div>
      </div>
      <CardContent>
        <p className="text-sm font-bold">PILIH METODE NEGOSIASI</p>
        <div className="flex justify-between mt-2">
          {valueRadio?.map((value, index) => {
            return (
              <RadioField
                key={index}
                label={value?.nama}
                value={JSON.stringify(value)}
                isChecked={payload?.metode_nego?.kode === value?.kode}
                handleChange={(e) =>
                  handleChangePayload("metode_nego", JSON.parse(e.target.value))
                }
              />
            );
          })}
        </div>
      </CardContent>
    </>
  );
};

export default SubModalMetodeNegosiasi;
