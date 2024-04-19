//React & Next Library
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

//helpers
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";

//data
import { useProjectDetail } from "@/data/ewp/konsulting";
import {
  useSumberInformasi,
  useAnggaran,
  useDetailAnggaran,
  useRingkasan,
  useDetailRingkasan,
} from "@/data/ewp/konsulting/addendum/lain";

//layout
import LandingLayoutEWPSBPAddendum from "@/layouts/ewp/LandingLayoutEWPSBPAddendum";

//molecules
import {
  AttachmentClipping,
  ImageClipping,
  NavigationTab,
} from "@/components/molecules/commons";
import {
  RingkasanTables,
  AnggaranTables,
  ModalAddBudget,
  ModalRingkasan,
} from "@/components/molecules/ewp/konsulting/addendum/lain";

//atoms
import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";

//reducers
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/addendum/lain/anggaranSBPAddendumSlice";
import {
  setObjDataRingkasan,
  setObjPayloadRingkasan,
  resetObjDataRingkasan,
  resetObjPayloadRingkasan,
  resetValidationErrorsRingkasan,
} from "@/slices/ewp/konsulting/addendum/lain/ringkasanSBPAddendumSlice";
import anggaranEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/perencanaan/anggaranEWPKonsultingSchema";

const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [params, setParams] = useState({
    id: 0,
  });
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [imageClipList, setImageClipList] = useState([]);
  const [attachmentClipList, setAttachmentClipList] = useState([]);
  const [typeUpload, setTypeUpload] = useState("");
  const [content, setContent] = useState("");

  const [showModalAnggaran, setShowModalAnggaran] = useState(false);
  const [showModalRingkasan, setShowModalRingkasan] = useState(false);
  // const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  // const [isInitiator, setIsInitiator] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [typeModalRingkasan, setTypeModalRingkasan] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedIdRingkasan, setSelectedIdRingkasan] = useState("");

  //anggaran
  const data_anggaran = useSelector(
    (state) => state.anggaranSBPAddendum.objData
  );
  const payload = useSelector((state) => state.anggaranSBPAddendum.objPayload);
  const validation = useSelector(
    (state) => state.anggaranSBPAddendum.validationErrors
  );

  //ringkasan
  const data_ringkasan = useSelector(
    (state) => state.ringkasanSBPAddendum.objDataRingkasan
  );
  const payloadRingkasan = useSelector(
    (state) => state.ringkasanSBPAddendum.objPayloadRingkasan
  );
  const validationRingkasan = useSelector(
    (state) => state.ringkasanSBPAddendum.validationErrorsRingkasan
  );

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  const { projectDetail } = useProjectDetail({ id: params?.id });

  const { sumberInformasi, sumberInformasiMutate } = useSumberInformasi({
    id: params?.id,
  });

  const { anggaran, anggaranMutate } = useAnggaran({ id: params?.id });
  const { ringkasan, ringkasanMutate } = useRingkasan({ id: params?.id });
  const { detailAnggaran } = useDetailAnggaran({ id: selectedId });
  const { detailRingkasan } = useDetailRingkasan({
    addendum_id: selectedIdRingkasan,
  });

  const pathName = `/ewp/konsulting/${params?.id}/perencanaan`;

  useEffect(() => {
    setContent(sumberInformasi?.data || "");
  }, [sumberInformasi]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/konsulting/${params?.id}/info`,
      },
      {
        name: "Addendum Perencanaan Kegiatan",
        path: `/ewp/konsulting/${params?.id}/addendum`,
      },
      {
        name: "Lain",
        path: `/ewp/konsulting/${params?.id}/addendum/lain`,
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

  const handleClickUploadAttachment = () => {
    setTypeUpload("attachment");
  };

  const handleClickUploadImage = () => {
    setTypeUpload("image");
  };

  const handleSubmitSumberInformasi = async () => {
    loadingSwal();
    const upload = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/sumber_informasi`,
      { sumber_informasi: content, id: params?.id }
    );
    if (upload.isConfirmed) {
      router.push(pathName);
      return;
    }
    sumberInformasiMutate();
    ringkasanMutate();
    loadingSwal("close");
  };

  useEffect(() => {
    if (params?.id !== 0 && anggaran?.data?.anggaran?.length) {
      const mappingAnggaran = anggaran?.data?.anggaran?.map((v) => {
        return _.pick(v, [
          "id",
          "tipe_anggaran_name",
          "amount",
          "deskripsi",
          "tanggal",
          "tanggal_end",
        ]);
      });
      dispatch(setObjData(mappingAnggaran));
    } else {
      dispatch(resetObjData());
    }
  }, [anggaran, params]);

  useEffect(() => {
    if (params?.id !== 0 && ringkasan?.data?.length) {
      const mappingRingkasan = ringkasan?.data?.map((v) => {
        return _.pick(v, [
          "id",
          "addendum_id",
          "part",
          "keterangan",
          "alasan",
          "note_sebelum",
          "note_sesudah",
          "module",
        ]);
      });
      dispatch(setObjDataRingkasan(mappingRingkasan));
    } else {
      dispatch(resetObjDataRingkasan());
    }
  }, [ringkasan, params]);

  useEffect(() => {
    if (detailAnggaran?.data && typeModal === "update") {
      dispatch(
        setObjPayload(
          _.pick(detailAnggaran?.data, [
            "tipe_anggaran_name",
            "tanggal",
            "tanggal_end",
            "amount",
            "deskripsi",
          ])
        )
      );
    } else {
      dispatch(resetObjPayload());
    }
  }, [detailAnggaran, selectedId, showModalAnggaran]);

  useEffect(() => {
    if (detailRingkasan?.data) {
      dispatch(
        setObjPayloadRingkasan(
          _.pick(detailRingkasan?.data, [
            "id",
            "addendum_id",
            "part",
            "keterangan",
            "alasan",
            "sebelum",
            "sesudah",
            "note_sebelum",
            "note_sesudah",
            "module",
          ])
        )
      );
    } else {
      dispatch(resetObjPayloadRingkasan());
    }
  }, [detailRingkasan, selectedIdRingkasan, showModalRingkasan]);

  // [ START ] handler for modal
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalAnggaran(false);
    setTypeModal("");
    setSelectedId("");
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
  };

  const handleChangeText = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleSubmitAnggaran = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: anggaranEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    const objPayload = {
      amount: parseInt(payload?.amount?.replace(/\./g, "")),
      ..._.omit(payload, ["amount"]),
    };

    if (validate) {
      loadingSwal();
      if (typeModal === "update") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/anggaran/${selectedId}`,
          { ...objPayload }
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/anggaran/${params?.id}/create`,
          objPayload
        );
      }

      anggaranMutate();
      ringkasanMutate();
      setShowModalAnggaran(false);
      setTypeModal("");
      setSelectedId("");
      dispatch(resetObjPayload());
      loadingSwal("close");
    }
  };
  const handleSaveAnggaran = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/anggaran/${params?.id}/save`,
      {
        alasan: "",
      }
    );
    anggaranMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for modal anggaran

  // [ START ] handler for table anggaran
  const handleClickAddTable = () => {
    setShowModalAnggaran(true);
  };

  const handleClickUpdateTable = async (id) => {
    setShowModalAnggaran(true);
    setTypeModal("update");
    setSelectedId(id);
  };

  const handleClickDeleteTable = async (id) => {
    const confirm = await confirmationSwal("Menghapus Anggaran.");

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/anggaran/${id}`
    );
    anggaranMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table

  // [ START ] handler for modal
  const handleCloseModalRingkasan = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalRingkasan(false);
    setTypeModalRingkasan("");
    setSelectedIdRingkasan("");
    dispatch(resetObjPayloadRingkasan());
    dispatch(resetValidationErrorsRingkasan());
  };

  const handleChangeTextRingkasan = (property, value) => {
    const updatedData = {
      ...payloadRingkasan,
      [property]: value,
    };
    dispatch(setObjPayloadRingkasan(updatedData));
  };

  const handleSubmitRingkasan = async (e) => {
    e.preventDefault();

    loadingSwal();
    if (typeModalRingkasan === "update") {
      await fetchApi(
        "PATCH",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/summary/update/${selectedIdRingkasan}`,
        {
          ..._.omit(payloadRingkasan, [
            "id",
            "sebelum",
            "sesudah",
            "part",
            "module",
          ]),
        }
      );
    }

    ringkasanMutate();
    setShowModalRingkasan(false);
    setTypeModalRingkasan("");
    setSelectedIdRingkasan("");
    dispatch(resetObjPayloadRingkasan());
    loadingSwal("close");
  };
  // [ END ] handler for modal ringkasan

  // [ START ] handler for table ringkasan

  const handleClickUpdateTableRingkasan = async (addendum_id) => {
    setShowModalRingkasan(true);
    setTypeModalRingkasan("update");
    setSelectedIdRingkasan(addendum_id);
  };

  const handleClickViewTableRingkasan = async (addendum_id) => {
    setShowModalRingkasan(true);
    setTypeModalRingkasan("view");
    setSelectedIdRingkasan(addendum_id);
  };

  const handleClickDeleteTableRingkasan = async (id) => {
    const confirm = await confirmationSwal("Menghapus Ringkasan.");

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/summary/delete/${id}`
    );
    sumberInformasiMutate();
    anggaranMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table ringkasan

  // [ Start ] handler for Reset and Save Ringkasan
  const handleResetRingkasan = async (e) => {
    e.preventDefault();
    const module = "others";

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/summary/reset/${params?.id}?module=${module}`,
      {}
    );
    sumberInformasiMutate();
    anggaranMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  const handleSaveRingkasan = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/summary`,
      {
        id: params?.id,
        type: "others",
      }
    );
    loadingSwal("close");
  };

  // [ End ] handler for Reset and Save Ringkasan
  const handleLoad = async (type) => {
    loadingSwal();
    const response = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/load_from_mapa/${params?.id}?part=${type}`,
      {}
    );
    if (type == "sumber_informasi") {
      setContent(response?.data);
    } else if (type == "anggaran") {
      anggaranMutate();
    }
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPSBPAddendum>
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
                  handleChange={handleUploadFile}
                  handleClick={handleClickUploadImage}
                  // isHideButton={!(isInitiator && !isCloseSubmodule)}
                />
                <AttachmentClipping
                  data={attachmentClipList}
                  handleChange={handleUploadFile}
                  handleClick={handleClickUploadAttachment}
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
                <div className="mt-3 flex justify-end gap-2">
                  <div className="w-[8.75rem] bg-atlasian-yellow rounded">
                    <ButtonField
                      text={"Load from MAPA"}
                      handler={() => handleLoad("sumber_informasi")}
                    />
                  </div>
                  <div className="w-[7.75rem] bg-atlasian-green rounded">
                    <ButtonField
                      text={"Simpan"}
                      handler={handleSubmitSumberInformasi}
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
                <AnggaranTables
                  data={data_anggaran}
                  setShowModal={setShowModalAnggaran}
                  handleClickAdd={handleClickAddTable}
                  handleClickUpdate={handleClickUpdateTable}
                  handleClickDelete={handleClickDeleteTable}
                  //   withoutButtonAction={!(isInitiator && !isCloseSubmodule)}
                />
              </div>
            </Card>
            <div className="mt-3 flex justify-end gap-2">
              <div className="w-[8.75rem] bg-atlasian-yellow rounded">
                <ButtonField
                  text={"Load from MAPA"}
                  handler={() => handleLoad("anggaran")}
                />
              </div>
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField text={"Simpan"} handler={handleSaveAnggaran} />
              </div>
            </div>
            <ModalAddBudget
              data={payload}
              showModal={showModalAnggaran}
              validation={validation}
              handleChangeText={handleChangeText}
              handleCloseModal={handleCloseModal}
              handleSubmit={handleSubmitAnggaran}
              typeModal={typeModal}
            />
          </div>
        ) : (
          <div className="w-full">
            <Card>
              <div className="px-6 pt-2 pb-4 w-full">
                <p className="ml-2 font-bold text-base">Ringkasan</p>
                <div className="my-2 " />
                <RingkasanTables
                  data={data_ringkasan}
                  handleClickUpdate={handleClickUpdateTableRingkasan}
                  handleClickDelete={handleClickDeleteTableRingkasan}
                  handleClickView={handleClickViewTableRingkasan}
                  //   withoutButtonAction={!(isInitiator && !isCloseSubmodule)}
                />
              </div>
            </Card>
            <ModalRingkasan
              data={payloadRingkasan}
              showModal={showModalRingkasan}
              validation={validationRingkasan}
              handleChangeText={handleChangeTextRingkasan}
              handleCloseModal={handleCloseModalRingkasan}
              handleSubmit={handleSubmitRingkasan}
              typeModal={typeModalRingkasan}
            />
            <div className="mt-3 flex justify-end gap-2">
              <div className="w-[7.75rem] bg-atlasian-red rounded">
                <ButtonField text={"Reset"} handler={handleResetRingkasan} />
              </div>
              <div className="w-[7.75rem] bg-atlasian-green rounded">
                <ButtonField text={"Simpan"} handler={handleSaveRingkasan} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* End Content */}
    </LandingLayoutEWPSBPAddendum>
  );
};

export default index;
