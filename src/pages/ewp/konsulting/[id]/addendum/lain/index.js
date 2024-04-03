import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import {
  AttachmentClipping,
  ImageClipping,
  NavigationTab,
} from "@/components/molecules/commons";
import { DataTables } from "@/components/molecules/ewp/konsulting/perencanaan/anggaran";
import { DataTables as DataTables2 } from "@/components/molecules/ewp/konsulting/addendum/lain";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { loadingSwal, usePostFileData } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [params, setParams] = useState({
    id: 1,
  });
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  const { projectDetail } = useProjectDetail({ id: params?.id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/konsulting/${params?.id}`,
      },
      {
        name: "Addendum Perencanaan Kegiatan",
        path: `/ewp/konsulting/${params?.id}/addendum`,
      },
    ]);
  }, [projectDetail]);

  const navigationTabItems = [
    { idx: 1, title: "Sumber Informasi" },
    { idx: 2, title: "Anggaran" },
    { idx: 3, title: "Ringkasan" },
  ];

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
  };

  const handleUploadFile = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipList((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const sample_data = [
    {
      id: "1",
      tipe_anggaran_name: "Anggaran Perjalanan Dinas",
      tanggal: "2022-03-04",
      tanggal_end: "2022-04-04",
      amount: "1000000",
      deskripsi: "",
    },
    {
      id: "2",
      tipe_anggaran_name: "Anggaran Fasilitas Penginapan",
      tanggal: "2022-03-04",
      tanggal_end: "2022-04-04",
      amount: "1000000",
      deskripsi: "",
    },
    {
      id: "3",
      tipe_anggaran_name: "Anggaran Pengangkutan",
      tanggal: "2022-03-04",
      tanggal_end: "2022-04-04",
      amount: "1000000",
      deskripsi: "",
    },
    {
      id: "4",
      tipe_anggaran_name: "Anggara Maintenance",
      tanggal: "2022-03-04",
      tanggal_end: "2022-04-04",
      amount: "1000000",
      deskripsi: "",
    },
    {
      id: "5",
      tipe_anggaran_name: "Anggaran Harian",
      tanggal: "2022-03-04",
      tanggal_end: "2022-04-04",
      amount: "1000000",
      deskripsi: "",
    },
    {
      id: "6",
      tipe_anggaran_name: "Anggaran Lain-Lain",
      tanggal: "2022-03-04",
      tanggal_end: "2022-04-04",
      amount: "1000000",
      deskripsi: "",
    },
  ];

  const sample_data2 = [
    {
      id: "1",
      section: "Sumber Informasi",
      keterangan: "Update Sumber Informasi",
      sebelum: "Sumber data di Indonesia",
      sesudah: "Sumber data di Internasional",
      alasan: "coba",
    },
    {
      id: "2",
      section: "Anggaran",
      keterangan: "Update Anggaran",
      sebelum: "Anggaran 500 Milyar",
      sesudah: "Revisi Anggaran Menjadi 50 Juta",
      alasan: "coba lagi",
    },
  ];

  const Editor = dynamic(() => import("@/components/atoms/Editor"), {
    ssr: false,
  });

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Addendum Lain" className={"text-atlasian-red"} />
      </div>
      {/* Start Content */}
      <div className="mt-7">
        <NavigationTab
          items={navigationTabItems}
          currentStage={currentContentStage}
          width={"w-[30rem]"}
          handleChange={handleChangeTab}
        />
        {currentContentStage === 1 ? (
          <div className="my-4 flex justify-between">
            <div className="flex gap-6">
              <div className="w-64 flex flex-col gap-4">
                <ImageClipping
                  data={imageClipList}
                  // handleChange={handleUploadFile}
                  // handleClick={handleClickUploadImage}
                  // isHideButton={!(isInitiator && !isCloseSubmodule)}
                />
                <AttachmentClipping
                  data={attachmentClipList}
                  handleChange={handleUploadFile}
                  // handleClick={handleClickUploadAttachment}
                  // isHideButton={!(isInitiator && !isCloseSubmodule)}
                />
              </div>
              <div>
                <div className="ckeditor-latar-belakang-mapa-ewp">
                  <Editor
                    contentData={content}
                    ready
                    onChange={(value) => setContent(value)}
                  />
                </div>
                {/* {isInitiator && !isCloseSubmodule ? ( */}
                <div className="mt-3 flex justify-end">
                  <div className="w-[7.75rem] bg-atlasian-green rounded">
                    <ButtonField
                      text={"Simpan"}
                      // handler={handleSubmit}
                    />
                  </div>
                </div>
                {/* ) : (
                ""
              )} */}
              </div>
            </div>
          </div>
        ) : currentContentStage === 2 ? (
          <div className="w-full">
            <Card>
              <div className="px-6 pt-2 pb-4 w-full">
                <p className="ml-2 font-bold text-base">Usulan Anggaran</p>
                <div className="my-2 " />
                <DataTables
                  data={sample_data}
                  //   setShowModal={setShowModal}
                  //   handleClickAdd={handleClickAddTable}
                  //   handleClickUpdate={handleClickUpdateTable}
                  //   handleClickDelete={handleClickDeleteTable}
                  //   withoutButtonAction={!(isInitiator && !isCloseSubmodule)}
                />
              </div>
            </Card>
            <div className="mt-3 flex justify-end gap-2">
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField
                  text={"Simpan"}
                  // handler={handleSubmit}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <Card>
              <div className="px-6 pt-2 pb-4 w-full">
                <p className="ml-2 font-bold text-base">Ringkasan</p>
                <div className="my-2 " />
                <DataTables2
                  data={sample_data2}
                  //   setShowModal={setShowModal}
                  //   handleClickAdd={handleClickAddTable}
                  //   handleClickUpdate={handleClickUpdateTable}
                  //   handleClickDelete={handleClickDeleteTable}
                  //   withoutButtonAction={!(isInitiator && !isCloseSubmodule)}
                />
              </div>
            </Card>
            <div className="mt-3 flex justify-end gap-2">
              <div className="w-[7.75rem] bg-atlasian-red rounded">
                <ButtonField
                  text={"Reset"}
                  // handler={handleSubmit}
                />
              </div>
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField
                  text={"Simpan"}
                  // handler={handleSubmit}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
