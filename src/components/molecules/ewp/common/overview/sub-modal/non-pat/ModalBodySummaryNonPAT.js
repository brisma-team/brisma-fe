import { useEffect } from "react";
import { FormWithLabel } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import CardContent from "../../CardContent";
import Link from "next/link";
import TableRelatedProject from "./TableRelatedProject";

const ModalBodySummaryNonPAT = ({ module, data, setCurrentModalStage }) => {
  useEffect(() => {
    setCurrentModalStage(4);
  }, []);

  return (
    <div className="w-[61rem] pb-4">
      <CardContent>
        <div className="p-2">
          <CardContent>
            <p className="font-semibold text-base">{data?.project_name}</p>
          </CardContent>
          <div className="flex gap-3 mt-3">
            <div className="w-1/2">
              <CardContent>
                <div className="px-2">
                  <FormWithLabel
                    form={
                      <CardContent>
                        <p>{data?.ref_metode?.nama}</p>
                      </CardContent>
                    }
                    label="Metode Audit*"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <p>{data?.ref_tipe?.nama}</p>
                      </CardContent>
                    }
                    label="Tipe Audit*"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.1rem]">
                          <p>{data?.ref_jenis?.nama || "-"}</p>
                        </div>
                      </CardContent>
                    }
                    label={`Jenis Audit${module !== "qa" ? "*" : ""}`}
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.1rem]">
                          <p>{data?.ref_tema?.nama || "-"}</p>
                        </div>
                      </CardContent>
                    }
                    label="Tema Audit"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <div className="flex gap-2">
                        <CardContent>
                          <p>
                            {convertDate(
                              data?.info_periode_pelaksanaan_start,
                              "/",
                              "d"
                            )}
                          </p>
                        </CardContent>
                        <p>-</p>
                        <CardContent>
                          <p>
                            {convertDate(
                              data?.info_periode_pelaksanaan_end,
                              "/",
                              "d"
                            )}
                          </p>
                        </CardContent>
                      </div>
                    }
                    label="Periode Kegiatan*"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  {/* <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.1rem]">
                          <p>{data?.deskripsi || "-"}</p>
                        </div>
                      </CardContent>
                    }
                    label="Deskripsi Kegiatan"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  /> */}
                </div>
              </CardContent>
            </div>
            <div className="w-1/2">
              <CardContent>
                <div className="px-2">
                  <FormWithLabel
                    form={
                      <CardContent>
                        <p>{data?.no_surat}</p>
                      </CardContent>
                    }
                    label="Nomor Surat"
                    widthLabel={"w-1/3"}
                    widthForm={"w-2/3"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.1rem]">
                          <p>{data?.perihal}</p>
                        </div>
                      </CardContent>
                    }
                    label="Perihal"
                    widthLabel={"w-1/3"}
                    widthForm={"w-2/3"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <p>{convertDate(data?.tanggal_surat, "/", "d")}</p>
                      </CardContent>
                    }
                    label="Tanggal Surat"
                    widthLabel={"w-1/3"}
                    widthForm={"w-2/3"}
                  />
                  <FormWithLabel
                    form={
                      <Link
                        className="font-medium text-base underline"
                        href={data?.url_file_surat}
                        target="_blank"
                      >
                        {data?.nama_file_surat}
                      </Link>
                    }
                    label="Lampiran Surat"
                    widthLabel={"w-1/3"}
                    widthForm={"w-2/3"}
                  />
                </div>
              </CardContent>
            </div>
          </div>
          <div className="w-full mt-4">
            <TableRelatedProject data={data?.project_terkait} withoutButton />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ModalBodySummaryNonPAT;
