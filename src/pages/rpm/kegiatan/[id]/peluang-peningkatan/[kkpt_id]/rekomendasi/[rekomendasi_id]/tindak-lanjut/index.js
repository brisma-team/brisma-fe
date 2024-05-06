import React, { useEffect, useState } from "react";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

import Image from "next/image";
import {
  Breadcrumbs,
  ButtonField,
  Card,
  PageTitle,
  Select,
} from "@/components/atoms";
import { LandingLayoutRPMKegiatan } from "@/layouts/rpm";
import { DataTables } from "@/components/molecules/rpm/kegiatan/overview/berkas";

import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { useTindakLanjutRekomendasi, useWorkflow } from "@/data/rpm/kegiatan";
import { useRouter } from "next/router";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  usePostFileData,
} from "@/helpers";
import { ModalTanggapanRekomendasi } from "@/components/molecules/rpm/kegiatan/overview/tindak-lanjut";

const CardStatus = ({
  selectedData,
  setSelectedData,
  handleSubmit,
  isEditable,
}) => {
  return (
    <div>
      <div className="no-underline hover:no-underline w-56">
        <Card>
          <div className="w-full px-3 py-1">
            <div className="flex justify-between">
              <p className="text-brisma font-bold text-xl mb-2">
                {"Status RPM"}
              </p>
            </div>
            <div className="mt-1">
              <Select
                value={selectedData}
                onChange={(e) =>
                  setSelectedData({ label: e.label, value: e.value })
                }
                isDisabled={!isEditable}
                optionValue={[
                  { label: "Incomplete", value: "Incomplete" },
                  { label: "On Progress", value: "On Progress" },
                  { label: "Complete", value: "Complete" },
                  // Add more options as needed
                ]}
              />
            </div>
            {isEditable && (
              <div className="mt-2">
                <div className="bg-atlasian-green rounded-md">
                  <ButtonField text={"Simpan"} handler={handleSubmit} />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

const index = () => {
  const { id, kkpt_id, rekomendasi_id } = useRouter().query;
  const baseUrl = `/rpm/kegiatan/${id}`;
  const [showModal, setShowModal] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [statusRpm, setStatusRpm] = useState({
    label: "",
    value: "",
  });
  const [tanggapan, setTanggapan] = useState("");
  const [data, setData] = useState({
    judul_peluang: "",
    rekomendasi: "",
    status: "",
    berkas: [],
  });
  const [isEditable, setIsEditable] = useState(false);
  const { detailRekomendasi, detailRekomendasiMutate } =
    useTindakLanjutRekomendasi(rekomendasi_id);

  const { workflowRPMData } = useWorkflow({
    type: "project_rpm",
    id,
  });

  useEffect(() => {
    if (workflowRPMData?.data) {
      const workflowInfo = workflowRPMData?.data?.info;
      setIsEditable(
        Boolean(workflowInfo?.status_persetujuan === "On Progress")
      );
    }
  }, [workflowRPMData]);

  useEffect(() => {
    if (data?.status !== undefined && data?.status !== "") {
      setStatusRpm({
        label: data?.status,
        value: data?.status,
      });
    }
  }, [data?.status]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Kegiatan Overview", path: "/rpm/kegiatan" },
      {
        name: `Landing Monitoring`,
        path: `${baseUrl}`,
      },
      {
        name: `Peluang Peningkatan`,
        path: `${baseUrl}/peluang-peningkatan`,
      },
      {
        name: `Rekomendasi Overview`,
        path: `${baseUrl}/peluang-peningkatan/${kkpt_id}`,
      },
      {
        name: `Tindak Lanjut`,
        path: `${baseUrl}/peluang-peningkatan/${kkpt_id}/rekomendasi/${rekomendasi_id}/tindak-lanjut`,
      },
    ]);
  }, [id]);

  useEffect(() => {
    if (detailRekomendasi !== undefined) {
      const thisdata = detailRekomendasi?.data;
      setData({
        ...data,
        judul_peluang: thisdata?.kkpt_rpm?.nama_kkpt,
        rekomendasi: thisdata?.rekomendasi_kkpt?.description,
        status: thisdata?.status_complete,
        berkas: thisdata?.lampiran,
      });
      setTanggapan(thisdata?.desc_tanggapan);
    }
  }, [detailRekomendasi]);
  const handleClickTanggapan = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/rekomendasi/update/${rekomendasi_id}`,
      {
        desc_tanggapan: tanggapan,
        status_complete: statusRpm?.value,
      }
    );
    setShowModal(false);
    detailRekomendasiMutate();
  };
  const handleUpdateTanggapan = async () => {
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/rekomendasi/update/${rekomendasi_id}`,
      {
        desc_tanggapan: tanggapan,
        status_complete: statusRpm?.value,
      }
    );
    setShowModal(false);
    detailRekomendasiMutate();
  };

  const handleUploadDocument = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      await usePostFileData(url, {
        file: e.target.files[0],
        modul: "rpm",
      }).then(async (response) => {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/rekomendasi/upload/${rekomendasi_id}`,
          {
            berkas: {
              file_url: response.url[0],
              file_name: e.target.files[0].name,
            },
          }
        );
      });
    }
    detailRekomendasiMutate();
    loadingSwal("close");
  };

  const handleClickDelete = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus dokumen ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/rekomendasi/delete/${rekomendasi_id}?file_id=${id}`,
      { id }
    );
    detailRekomendasiMutate();
    loadingSwal("close");
  };

  return (
    <LandingLayoutRPMKegiatan>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flexitems-center mb-6">
        <PageTitle text={"Tindak Lanjut Rekomendasi"} />
      </div>
      {/* Start Content */}
      <div className="flex gap-4">
        <div className="w-[60rem]">
          <Card>
            <div className="w-full p-4">
              <div
                className={`${`w-full`} ${`h-full`} rounded flex flex-col items-center`}
                style={{
                  color: token("color.text", N800),
                  borderRadius: "10px",
                  boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
                }}
              >
                <div className="flex justify-between">
                  <div className="w-[51rem] min-h-[12rem] p-5">
                    <div className="mb-4">
                      <p className="text-brisma font-bold text-sm">
                        {"Peluang Peningkatan :"}
                      </p>
                      <p className="text-sm font-semibold text-atlasian-red mt-0">
                        {data?.judul_peluang || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-brisma font-bold text-sm">
                        {"Rekomendasi :"}
                      </p>
                      <p className="text-sm text-justify mt-0">
                        {data?.rekomendasi || "-"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-auto text-center border-l-2 hover:cursor-pointer hover:bg-gray-100 border-slate-500 flex justify-center items-center rounded-se-md rounded-br-md"
                    role="button"
                    onClick={handleClickTanggapan}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      // Check if the Enter key is pressed (key code 13)
                      if (event.keyCode === 13) {
                        // Trigger the click handler
                        handleClickTanggapan();
                      }
                    }}
                  >
                    <div className="px-4">
                      <Image
                        src={"/images/beri_tanggapan.png"}
                        alt="chat"
                        width={85}
                        height={85}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-4 -mt-2">
              <CardContentHeaderFooter
                header={
                  <div className="py-2 px-4 text-base font-semibold w-full">
                    Dokumen Lampiran Tindak Lanjut
                  </div>
                }
              >
                <div className="flex flex-col gap-4 px-6 py-4 w-full">
                  <DataTables
                    data={data?.berkas}
                    handleUploadDocument={handleUploadDocument}
                    handleClickDelete={handleClickDelete}
                    isEditable={isEditable}
                  />
                  <div className="w-full flex justify-end gap-3"></div>
                </div>
              </CardContentHeaderFooter>
            </div>
          </Card>
        </div>
        <div>
          <CardStatus
            selectedData={statusRpm}
            setSelectedData={setStatusRpm}
            handleSubmit={handleSubmit}
            isEditable={isEditable}
          />
        </div>
      </div>

      <ModalTanggapanRekomendasi
        showModal={showModal}
        setShowModal={setShowModal}
        handleUpdateTanggapan={handleUpdateTanggapan}
        selectedValue={tanggapan}
        setSelectedValue={setTanggapan}
        isEditable={isEditable}
      />
      {/* End Content */}
    </LandingLayoutRPMKegiatan>
  );
};

export default index;
