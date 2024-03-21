import { useEffect } from "react";
import { CardTitleValue, FormWithLabel } from "@/components/molecules/commons";
import { DatepickerStartEnd } from "@/components/atoms";
import { addDaysToDate, convertDate, dateNow } from "@/helpers";
import CardContent from "../../CardContent";

const ModalBodySummaryPAT = ({
  data,
  validationErrors,
  isDisabled,
  handleChange,
  setCurrentModalStage,
}) => {
  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

  return (
    <div className="w-[56rem] pb-2 flex flex-col gap-3">
      <CardContent>
        <p className="font-semibold text-base">{data?.project_name}</p>
      </CardContent>
      <div className="flex gap-3">
        <div className="w-7/12">
          <CardContent>
            <FormWithLabel
              form={
                <CardContent>
                  <p>{data?.ref_metode?.nama}</p>
                </CardContent>
              }
              label="Metode Audit"
              widthLabel={"w-1/3"}
              widthForm={"w-2/3"}
            />
            <FormWithLabel
              form={
                <CardContent>
                  <p>{data?.ref_tipe?.nama}</p>
                </CardContent>
              }
              label="Tipe Audit"
              widthLabel={"w-1/3"}
              widthForm={"w-2/3"}
            />
            <FormWithLabel
              form={
                <CardContent>
                  <p>{data?.ref_jenis?.nama}</p>
                </CardContent>
              }
              label="Jenis Audit"
              widthLabel={"w-1/3"}
              widthForm={"w-2/3"}
            />
            <FormWithLabel
              form={
                <CardContent>
                  <p>{data?.ref_tema?.nama}</p>
                </CardContent>
              }
              label="Tema Audit"
              widthLabel={"w-1/3"}
              widthForm={"w-2/3"}
            />
            <FormWithLabel
              form={
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
                    addDaysToDate(
                      data?.info_periode_pelaksanaan_start,
                      "+",
                      1
                    ) ||
                    addDaysToDate(dateNow(), "+", 1) ||
                    null
                  }
                  validationStart={
                    validationErrors["info_periode_pelaksanaan_start"]
                  }
                  validationEnd={
                    validationErrors["info_periode_pelaksanaan_end"]
                  }
                />
              }
              label="Periode"
              widthLabel={"w-1/3"}
              widthForm={"w-2/3"}
            />
            <FormWithLabel
              form={
                <CardContent>
                  <p>{data?.deskripsi || "-"}</p>
                </CardContent>
              }
              label="Deskripsi Kegiatan"
              widthLabel={"w-1/3"}
              widthForm={"w-2/3"}
            />
          </CardContent>
        </div>
        <div className="w-5/12">
          <CardContent>
            <div className="border-x border-t">
              <CardTitleValue
                title={"Maker"}
                value={
                  data?.create_by?.pn
                    ? `${data?.create_by?.pn} - ${data?.create_by?.nama}`
                    : "-"
                }
                widthTitle={"w-2/5"}
                widthValue={"w-3/5"}
              />
              <CardTitleValue
                title={"Tanggal Inisiasi"}
                value={
                  data?.createdAt ? convertDate(data?.createdAt, "/", "d") : "-"
                }
                widthTitle={"w-2/5"}
                widthValue={"w-3/5"}
              />
            </div>
            <div className="w-full h-[10rem] border-2 my-3 p-2 overflow-y-auto">
              <p className="font-semibold text-lg">Pelaksana</p>
              <p className="text-blue-600 font-semibold">PIC</p>
              {data?.ref_penanggung_jawabs?.length
                ? data?.ref_penanggung_jawabs?.map((v, i) => {
                    return <p key={i}>{v?.pn + " - " + v?.nama}</p>;
                  })
                : ""}
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default ModalBodySummaryPAT;
