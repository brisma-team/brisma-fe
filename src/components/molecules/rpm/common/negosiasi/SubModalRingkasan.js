import {
  CardContent,
  CardContentHeaderFooter,
  FormLabel,
  RecommendationTypeSelect,
} from "@/components/molecules/commons";
import { convertDate, dateNow } from "@/helpers";
import Content from "./Content";
import {
  DatepickerField,
  ErrorValidation,
  TextAreaField,
  TextInput,
} from "@/components/atoms";

const SubModalRingkasan = ({
  payload,
  data,
  validation,
  handleChangePayload,
}) => {
  return (
    <>
      <CardContent>
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="text-sm text-brisma font-bold">
              ALASAN NEGOSIASI
            </div>
            <div className="text-sm text-brisma">{payload?.alasan || ""}</div>
          </div>
        </div>
      </CardContent>
      <div className="flex gap-3">
        <CardContentHeaderFooter
          header={
            <div className="px-3 py-2 font-semibold text-base">Objek Awal</div>
          }
        >
          <div className="p-3 flex flex-col gap-2.5 h-full">
            <Content
              title={"OBJEK TINDAK LANJUT"}
              value={`[${data?.object?.id || ""}] ${data?.object?.name || ""}`}
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
        </CardContentHeaderFooter>
        <CardContentHeaderFooter
          header={
            <div className="px-3 py-2 font-semibold text-base">
              Objek Pengganti
            </div>
          }
        >
          <div className="p-3 flex flex-col gap-2.5">
            <FormLabel
              title={"TIPE REKOMENDASI"}
              form={
                <RecommendationTypeSelect
                  selectedValue={
                    payload?.tipe_rekomendasi?.kode
                      ? {
                          label: payload?.tipe_rekomendasi?.nama?.toUpperCase(),
                          value: payload?.tipe_rekomendasi,
                        }
                      : null
                  }
                  handleChange={(e) =>
                    handleChangePayload("tipe_rekomendasi", e.value)
                  }
                  isDisabled={["1", "2"].includes(payload?.metode_nego?.kode)}
                />
              }
              validationError={
                validation && validation["tipe_rekomendasi.kode"] ? (
                  <ErrorValidation
                    message={validation["tipe_rekomendasi.kode"]}
                    className={"!-mt-1"}
                  />
                ) : (
                  ""
                )
              }
            />
            <FormLabel
              title={"DESKRISPI REKOMENDASI"}
              form={
                <TextAreaField
                  value={payload?.deskripsi_rekomendasi || ""}
                  handleChange={(e) =>
                    handleChangePayload("deskripsi_rekomendasi", e.target.value)
                  }
                  isDisabled={["1", "2"].includes(payload?.metode_nego?.kode)}
                  resize="auto"
                />
              }
              validationError={
                validation && validation["deskripsi_rekomendasi"] ? (
                  <ErrorValidation
                    message={validation["deskripsi_rekomendasi"]}
                    className={"!-mt-1"}
                  />
                ) : (
                  ""
                )
              }
            />
            <FormLabel
              title={"ACTION PLAN"}
              form={
                <TextInput
                  value={payload?.action_plan || ""}
                  onChange={(e) =>
                    handleChangePayload("action_plan", e.target.value)
                  }
                  isDisabled={["1"].includes(payload?.metode_nego?.kode)}
                />
              }
              validationError={
                validation && validation["action_plan"] ? (
                  <ErrorValidation
                    message={validation["action_plan"]}
                    className={"!-mt-1"}
                  />
                ) : (
                  ""
                )
              }
            />
            <FormLabel
              title={"DEADLINE"}
              form={
                <DatepickerField
                  value={payload?.deadline || ""}
                  format={"DD-MM-YYYY"}
                  handleChange={(value) =>
                    handleChangePayload("deadline", value)
                  }
                  placeholder={"Deadline"}
                  minDate={dateNow()}
                />
              }
              validationError={
                validation && validation["deadline"] ? (
                  <ErrorValidation
                    message={validation["deadline"]}
                    className={"!-mt-1"}
                  />
                ) : (
                  ""
                )
              }
            />
          </div>
        </CardContentHeaderFooter>
      </div>
    </>
  );
};

export default SubModalRingkasan;
