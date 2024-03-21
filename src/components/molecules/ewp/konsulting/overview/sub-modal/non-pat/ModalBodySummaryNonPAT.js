import { useEffect, useState } from "react";
import { DataNotFound, FormWithLabel } from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import CardContent from "../../CardContent";
import Link from "next/link";
import RowTableRelatedProjectNonPAT from "./RowTableRelatedProjectNonPAT";
import { useRelatedEWP } from "@/data/ewp/konsulting/overview";
import _ from "lodash";

const ModalBodySummaryNonPAT = ({ data, setCurrentModalStage }) => {
  const [objData, setObjData] = useState([]);
  useEffect(() => {
    setCurrentModalStage(4);
  }, []);

  const params = {
    date: "",
    project_name: "",
    project_id: "",
    ref_tipe: "",
    ref_jenis: "",
  };

  const { relatedEWP } = useRelatedEWP(params);

  useEffect(() => {
    if (relatedEWP?.data?.length) {
      const mapping = relatedEWP?.data?.filter((item) => {
        return data?.project_terkait?.some(
          (project) => project.ref_ewp_id == item.id
        );
      });
      setObjData(mapping);
    } else {
      setObjData([]);
    }
  }, [relatedEWP, data]);

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
                    label="Metode Audit"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <p>{data?.ref_tipe?.nama}</p>
                      </CardContent>
                    }
                    label="Tipe Audit"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <p>{data?.ref_jenis?.nama}</p>
                      </CardContent>
                    }
                    label="Jenis Audit"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.3rem]">
                          <p>{data?.ref_tema?.nama}</p>
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
                    label="Periode Kegiatan"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
                  <FormWithLabel
                    form={
                      <CardContent>
                        <div className="min-h-[1.3rem]">
                          <p>{data?.deskripsi || "-"}</p>
                        </div>
                      </CardContent>
                    }
                    label="Deskripsi Kegiatan"
                    widthLabel={"w-3/12"}
                    widthForm={"w-9/12"}
                  />
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
                        <p>{data?.perihal}</p>
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
          <div className="w-full text-sm mt-4">
            <div className="border-2 border-[#DFE1E6] rounded-xl">
              {/* Start Table */}
              {/* Start Table Header */}
              <div className="flex h-14 font-bold">
                <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[7%] flex items-center justify-center">
                  <p className="font-bold text-sm">AKSI</p>
                </div>
                <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[40%] flex items-center text-justify px-2 py-3">
                  <p className="font-bold text-sm">JUDUL PROYEK TERKAIT</p>
                </div>
                <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[25%] flex items-center text-justify px-2 py-3">
                  <p className="font-bold text-sm">PROJECT ID</p>
                </div>
                <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center text-justify px-2 py-3">
                  <p className="font-bold text-sm">TIPE</p>
                </div>
                <div className="border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
                  <p className="font-bold text-sm">JENIS</p>
                </div>
              </div>
              {objData?.length ? (
                <div className="overflow-y-scroll max-h-44">
                  {objData?.map((items, idx) => {
                    return (
                      <RowTableRelatedProjectNonPAT
                        key={idx}
                        idx={idx + 1}
                        value={items}
                        data={objData}
                        totalData={objData?.length}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="pb-4">
                  <DataNotFound />
                </div>
              )}
              {/* End Body Table */}
              {/* End Table */}
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ModalBodySummaryNonPAT;
