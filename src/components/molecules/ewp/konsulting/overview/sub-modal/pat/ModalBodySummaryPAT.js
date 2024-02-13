import { useEffect } from "react";
import { FormWithLabel } from "@/components/molecules/commons";
import { DatepickerStartEnd, TextInput } from "@/components/atoms";
import useUser from "@/data/useUser";
import { addDaysToDate, dateNow } from "@/helpers";

const ModalBodySummaryPAT = ({
  data,
  validationErrors,
  isDisabled,
  isPat,
  handleChange,
  setCurrentModalStage,
}) => {
  const { user } = useUser();

  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

  return (
    <div className="w-[43rem] px-4 py-2">
      <p className="text-brisma text-lg font-bold">Ringkasan Project</p>
      <div className="mt-2 p-4 rounded-xl shadow">
        <FormWithLabel
          form={
            <TextInput
              value={data?.project_name}
              placeholder="Project Name"
              isDisabled={true}
            />
          }
          label="Project Name"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <FormWithLabel
          form={
            <div className="w-36">
              <TextInput
                value={data?.audit_year}
                placeholder="Tahun Audit"
                isDisabled={true}
              />
            </div>
          }
          label="Tahun"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <div className="flex gap-3 -my-2">
          <div className="w-1/2">
            <FormWithLabel
              form={
                <TextInput
                  value={data?.ref_metode.nama}
                  placeholder="Metode Audit"
                  isDisabled={true}
                />
              }
              label="Metode Audit"
              widthLabel={"w-1/2"}
              widthForm={"w-1/2"}
              classNameForm={"pl-1"}
            />
          </div>
          <div className="w-1/2 pl-3">
            <FormWithLabel
              form={
                <TextInput
                  value={data?.ref_tipe.nama}
                  placeholder="Tipe Audit"
                  isDisabled={true}
                />
              }
              label="Tipe Audit"
              widthLabel={"w-2/6"}
              widthForm={"w-4/6"}
              classNameForm={"pl-1"}
            />
          </div>
        </div>
        <div className="flex gap-3 -my-2">
          <div className="w-1/2">
            <FormWithLabel
              form={
                <TextInput
                  value={data?.ref_jenis.nama}
                  placeholder="Jenis Audit"
                  isDisabled={true}
                />
              }
              label="Jenis Audit"
              widthLabel={"w-1/2"}
              widthForm={"w-1/2"}
              classNameForm={"pl-1"}
            />
          </div>
          <div className="w-1/2 pl-3">
            <FormWithLabel
              form={
                <TextInput
                  value={data?.ref_tema.nama}
                  placeholder="Tema Audit"
                  isDisabled={true}
                />
              }
              label="Tema Audit"
              widthLabel={"w-2/6"}
              widthForm={"w-4/6"}
              classNameForm={"pl-1"}
            />
          </div>
        </div>
        <FormWithLabel
          form={
            <TextInput
              placeholder="Ketua Tim Audit"
              value={
                isPat
                  ? data?.tim_audit
                    ? "findKTA()"
                    : ""
                  : user?.data?.fullName
              }
              isDisabled={true}
            />
          }
          label="Ketua Tim Audit"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
        <FormWithLabel
          form={
            <div className="w-[19.7rem]">
              <DatepickerStartEnd
                valueStart={data?.info_periode_pelaksanaan_start}
                valueEnd={data?.info_periode_pelaksanaan_end}
                handlerChangeStart={(e) =>
                  handleChange("info_periode_pelaksanaan_start", e)
                }
                handlerChangeEnd={(e) =>
                  handleChange("info_periode_pelaksanaan_end", e)
                }
                placeholderStart="Pilih Tanggal"
                placeholderEnd="Pilih Tanggal"
                isDisabled={isDisabled}
                format={"DD/MM/YYYY"}
                minDateStart={dateNow()}
                maxDateStart={
                  addDaysToDate(data?.info_periode_pelaksanaan_end, "-", 1) ||
                  null
                }
                minDateEnd={
                  addDaysToDate(data?.info_periode_pelaksanaan_start, "+", 1) ||
                  addDaysToDate(dateNow(), "+", 1) ||
                  null
                }
                validationStart={
                  validationErrors["info_periode_pelaksanaan_start"]
                }
                validationEnd={validationErrors["info_periode_pelaksanaan_end"]}
              />
            </div>
          }
          label="Periode Ruang Lingkup"
          widthLabel={"w-3/12"}
          widthForm={"w-9/12"}
        />
      </div>
    </div>
  );
};

export default ModalBodySummaryPAT;
