//React & Next Library
import React, { useState, useEffect } from "react";
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
import { useAuditInfo } from "@/data/ewp/common/info";
import {
  useLatarBelakang,
  useTujuan,
  useAnalisa,
  useAnggaran,
  useJadwal,
  useDetailAnggaran,
  useRingkasan,
  useDetailRingkasan,
} from "@/data/ewp/common/addendum/lain";

//molecules
import { NavigationTab } from "@/components/molecules/commons";

//atoms
import { Breadcrumbs, PageTitle } from "@/components/atoms";

//reducers
import {
  setObjDataContentLatarBelakang,
  setObjDataContentTujuan,
  setObjDataContentAnalisa,
  setObjDataContentAnggaran,
  setObjDataContentJadwal,
  setObjDataContentRingkasan,
  setObjDataContentDetailRingkasan,
  setObjPayloadAnggaran,
  setObjPayloadJadwal,
  setObjPayloadRingkasan,
  setValidationErrorsAnggaran,
  // setValidationErrorsRingkasan,
  // resetObjDataContentLatarBelakang,
  // resetObjDataContentTujuan,
  // resetObjDataContentAnalisa,
  resetObjDataContentAnggaran,
  resetObjDataContentJadwal,
  resetObjDataContentRingkasan,
  resetObjDataContentDetailRingkasan,
  resetObjPayloadAnggaran,
  resetObjPayloadJadwal,
  resetObjPayloadRingkasan,
  resetValidationErrorsAnggaran,
  resetValidationErrorsRingkasan,
} from "@/slices/ewp/quality-assurance/addendum/addendumLainQualityAssuranceSlice";
import {
  ContentAnggaran,
  ContentJadwal,
  ContentCKEditorAddendum,
  ContentRingkasan,
} from "@/components/molecules/ewp/quality-assurance/addendum/lain";
import anggaranEWPSchema from "@/helpers/schemas/ewp/common/anggaranEWPSchema";
import { LandingLayoutEWPAddendum } from "@/layouts/ewp";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    id: 0,
  });
  const pathName = `/ewp/quality-assurance/${params?.id}/addendum/lain`;
  const navigationTabItems = [
    { idx: 1, title: "Latar Belakang" },
    { idx: 2, title: "Tujuan" },
    { idx: 3, title: "Analisa" },
    { idx: 4, title: "Anggaran" },
    { idx: 5, title: "Jadwal" },
    { idx: 6, title: "Ringkasan" },
  ];

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [typeUpload, setTypeUpload] = useState("");
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(true);
  const [isInitiator, setIsInitiator] = useState(true);
  const [isAuditor, setIsAuditor] = useState(true);

  const [showModalAnggaran, setShowModalAnggaran] = useState(false);
  const [typeModalAnggaran, setTypeModalAnggaran] = useState("");

  // content ringkasan
  const [showModalDetailRingkasan, setShowModalDetailRingkasan] =
    useState(false);
  const [showModalEditRingkasan, setShowModalEditRingkasan] = useState(false);
  const [selectedRingkasanId, setSelectedRingkasanId] = useState("");

  const [imageClipListLatarBelakang, setImageClipListLatarBelakang] = useState(
    []
  );
  const [imageClipListTujuan, setImageClipListTujuan] = useState([]);
  const [imageClipListAnalisa, setImageClipListAnalisa] = useState([]);
  const [attachmentClipListLatarBelakang, setAttachmentClipListLatarBelakang] =
    useState([]);
  const [attachmentClipListTujuan, setAttachmentClipListTujuan] = useState([]);
  const [attachmentClipListAnalisa, setAttachmentClipListAnalisa] = useState(
    []
  );

  const [selectedAnggaranId, setSelectedAnggaranId] = useState(1);

  const dataContentLatarBelakang = useSelector(
    (state) => state.addendumLainQualityAssurance.objDataContentLatarBelakang
  );
  const dataContentTujuan = useSelector(
    (state) => state.addendumLainQualityAssurance.objDataContentTujuan
  );
  const dataContentAnalisa = useSelector(
    (state) => state.addendumLainQualityAssurance.objDataContentAnalisa
  );
  const dataContentAnggaran = useSelector(
    (state) => state.addendumLainQualityAssurance.objDataContentAnggaran
  );
  const dataContentJadwal = useSelector(
    (state) => state.addendumLainQualityAssurance.objDataContentJadwal
  );
  const dataContentRingkasan = useSelector(
    (state) => state.addendumLainQualityAssurance.objDataContentRingkasan
  );
  const dataContentDetailRingkasan = useSelector(
    (state) => state.addendumLainQualityAssurance.objDataContentDetailRingkasan
  );
  const payloadAnggaran = useSelector(
    (state) => state.addendumLainQualityAssurance.objPayloadAnggaran
  );
  const payloadJadwal = useSelector(
    (state) => state.addendumLainQualityAssurance.objPayloadJadwal
  );
  const payloadRingkasan = useSelector(
    (state) => state.addendumLainQualityAssurance.objPayloadRingkasan
  );
  const validationAnggaran = useSelector(
    (state) => state.addendumLainQualityAssurance.validationErrorsAnggaran
  );
  const validationRingkasan = useSelector(
    (state) => state.addendumLainQualityAssurance.validationErrorsRingkasan
  );

  useEffect(() => {
    if (!router.isReady) return;
    const { id, stage } = router.query;
    setParams({
      id,
    });
    setCurrentContentStage(parseInt(stage) || 1);
  }, [router.isReady]);

  const { auditInfo } = useAuditInfo({ id: params?.id, module: "qa" });

  const { latarBelakang, latarBelakangMutate } = useLatarBelakang({
    id: params?.id,
    module: "qa",
  });
  const { tujuan, tujuanMutate } = useTujuan({
    id: params?.id,
    module: "qa",
  });
  const { analisa, analisaMutate } = useAnalisa({
    id: params?.id,
    module: "qa",
  });
  const { anggaran, anggaranMutate } = useAnggaran({
    id: params?.id,
    module: "qa",
  });
  const { detailAnggaran } = useDetailAnggaran({
    id: selectedAnggaranId,
    module: "qa",
  });
  const { jadwal, jadwalMutate } = useJadwal({
    id: params?.id,
    module: "qa",
  });
  const { ringkasan, ringkasanMutate } = useRingkasan({
    id: params?.id,
    module: "qa",
  });
  const { detailRingkasan } = useDetailRingkasan({
    id: selectedRingkasanId,
    module: "qa",
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/quality-assurance/${params?.id}/info`,
      },
      {
        name: "Addendum Perencanaan",
        path: `/ewp/quality-assurance/${params?.id}/addendum`,
      },
      {
        name: "Lain",
        path: `/ewp/quality-assurance/${params?.id}/addendum/lain`,
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    dispatch(setObjDataContentLatarBelakang(latarBelakang?.data || ""));
  }, [latarBelakang]);

  useEffect(() => {
    dispatch(setObjDataContentTujuan(tujuan?.data || ""));
  }, [tujuan]);

  useEffect(() => {
    dispatch(setObjDataContentAnalisa(analisa?.data || ""));
  }, [analisa]);

  useEffect(() => {
    if (anggaran?.data?.anggaran?.length) {
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
      dispatch(setObjDataContentAnggaran(mappingAnggaran));
    } else {
      dispatch(resetObjDataContentAnggaran());
    }
  }, [anggaran]);

  useEffect(() => {
    if (detailAnggaran?.data && typeModalAnggaran === "update") {
      dispatch(
        setObjPayloadAnggaran(
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
      dispatch(resetObjPayloadAnggaran());
    }
  }, [detailAnggaran, showModalAnggaran]);

  useEffect(() => {
    if (jadwal?.data) {
      const mappingData = [
        {
          keterangan: "Perencanaan (MAR)",
          property_start: "penyusunan_mapa_plan_start",
          property_end: "penyusunan_mapa_plan_end",
        },
        {
          keterangan: "Pelaksanaan",
          property_start: "pelaksanaan_audit_plan_start",
          property_end: "pelaksanaan_audit_plan_end",
        },
        {
          keterangan: "Reporting",
          property_start: "monitoring_plan_start",
          property_end: "monitoring_plan_end",
        },
        {
          keterangan: "Wrap-up Meeting",
          property_start: "Wrapup_Meeting_plan_start",
          property_end: "Wrapup_Meeting_plan_end",
        },
      ];

      const mappingPayload = _.pick(jadwal?.data, [
        "penyusunan_mapa_plan_start",
        "penyusunan_mapa_plan_end",
        "pelaksanaan_audit_plan_start",
        "pelaksanaan_audit_plan_end",
        "monitoring_plan_start",
        "monitoring_plan_end",
        "Wrapup_Meeting_plan_start",
        "Wrapup_Meeting_plan_end",
      ]);

      dispatch(setObjDataContentJadwal(mappingData));
      dispatch(setObjPayloadJadwal(mappingPayload));
    } else {
      dispatch(resetObjDataContentJadwal());
      dispatch(resetObjPayloadJadwal());
    }
  }, [jadwal]);

  useEffect(() => {
    if (ringkasan?.data?.length) {
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
      dispatch(setObjDataContentRingkasan(mappingRingkasan));
    } else {
      dispatch(resetObjDataContentRingkasan());
    }
  }, [ringkasan]);

  useEffect(() => {
    if (detailRingkasan?.data) {
      dispatch(
        setObjDataContentDetailRingkasan(
          _.pick(detailRingkasan?.data, [
            "part",
            "sebelum",
            "sesudah",
            "method",
          ])
        )
      );
    } else {
      dispatch(resetObjDataContentDetailRingkasan());
    }
  }, [detailRingkasan, showModalDetailRingkasan]);

  useEffect(() => {
    if (showModalEditRingkasan && detailRingkasan?.data) {
      dispatch(
        setObjPayloadRingkasan(
          _.pick(detailRingkasan?.data, [
            "keterangan",
            "note_sebelum",
            "note_sesudah",
            "alasan",
          ])
        )
      );
    } else {
      dispatch(resetObjPayloadRingkasan());
    }
  }, [detailRingkasan, showModalEditRingkasan]);

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
    router.push({
      pathname: pathName,
      query: { stage: index },
    });
  };

  const handleClickUploadAttachment = () => {
    setTypeUpload("attachment");
  };

  const handleClickUploadImage = () => {
    setTypeUpload("image");
  };

  const handleLoadDataFromMAR = async (type) => {
    loadingSwal();
    const response = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/load_from_mapa/${params?.id}?part=${type}`,
      {}
    );
    if (type === "latar_belakang") {
      dispatch(setObjDataContentLatarBelakang(response?.data));
    } else if (type === "tujuan") {
      dispatch(setObjDataContentTujuan(response?.data));
    } else if (type === "analisa") {
      dispatch(setObjDataContentAnalisa(response?.data));
    } else if (type === "anggaran") {
      anggaranMutate();
    } else if (type === "jadwal") {
      jadwalMutate();
    }
    ringkasanMutate();
    loadingSwal("close");
  };

  // [ START ] handler for tab latar belakang
  const handleChangeContentLatarBelakang = (value) => {
    dispatch(setObjDataContentLatarBelakang(value));
  };

  const handleUploadFileLatarBelakang = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipListLatarBelakang((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipListLatarBelakang((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const handleSubmitLatarBelakang = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/latar_belakang`,
      { latar_belakang: dataContentLatarBelakang, id: params?.id }
    );
    latarBelakangMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for tab latar belakang

  // [ START ] handler for tab tujuan
  const handleChangeContentTujuan = (value) => {
    dispatch(setObjDataContentTujuan(value));
  };

  const handleUploadFileTujuan = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipListTujuan((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipListTujuan((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const handleSubmitTujuan = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/tujuan`,
      { tujuan: dataContentTujuan, id: params?.id }
    );
    tujuanMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for tab tujuan

  // [ START ] handler for tab analisa
  const handleChangeContentAnalisa = (value) => {
    dispatch(setObjDataContentAnalisa(value));
  };

  const handleUploadFileAnalisa = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      switch (typeUpload) {
        case "attachment":
          setAttachmentClipListAnalisa((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
        case "image":
          setImageClipListAnalisa((prev) => [
            ...prev,
            { url: response.url[0], name: e.target.files[0].name },
          ]);
          break;
      }
    }
    setTypeUpload("");
    loadingSwal("close");
  };

  const handleSubmitAnalisa = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/analisa`,
      { analisa: dataContentAnalisa, id: params?.id }
    );
    analisaMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for tab analisa

  // [ START ] handler for tab anggaran
  // [ START ] handler for modal
  const handleCloseModalAnggaran = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalAnggaran(false);
    setTypeModalAnggaran("");
    setSelectedAnggaranId("");
    dispatch(resetObjPayloadAnggaran());
    dispatch(resetValidationErrorsAnggaran());
  };

  const handleChangePayloadAnggaran = (property, value) => {
    const updatedData = {
      ...payloadAnggaran,
      [property]: value,
    };
    dispatch(setObjPayloadAnggaran(updatedData));
  };

  const handleSubmitAnggaran = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: anggaranEWPSchema,
      resetErrors: resetValidationErrorsAnggaran,
      setErrors: setValidationErrorsAnggaran,
    };
    const validate = setErrorValidation(
      payloadAnggaran,
      dispatch,
      schemaMapping
    );

    const objPayload = {
      amount: parseInt(payloadAnggaran?.amount?.replace(/\./g, "")),
      ..._.omit(payloadAnggaran, ["amount"]),
    };

    if (validate) {
      loadingSwal();
      if (typeModalAnggaran === "update") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/anggaran/${selectedAnggaranId}`,
          { ...objPayload }
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/anggaran/${params?.id}/create`,
          objPayload
        );
      }

      anggaranMutate();
      ringkasanMutate();
      setShowModalAnggaran(false);
      setTypeModalAnggaran("");
      setSelectedAnggaranId("");
      dispatch(resetObjPayloadAnggaran());
      loadingSwal("close");
    }
  };
  const handleSaveAnggaran = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/anggaran/${params?.id}/save`,
      {
        alasan: "",
      }
    );
    anggaranMutate();
    ringkasanMutate();
    dispatch(resetObjPayloadAnggaran());
    setShowModalAnggaran(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal anggaran

  // [ START ] handler for table anggaran
  const handleClickAddAnggaran = () => {
    setShowModalAnggaran(true);
  };

  const handleClickUpdateAnggaran = async (id) => {
    setShowModalAnggaran(true);
    setTypeModalAnggaran("update");
    setSelectedAnggaranId(id);
  };

  const handleClickDeleteAnggaran = async (id) => {
    const confirm = await confirmationSwal("Menghapus Anggaran.");

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/anggaran/${id}`
    );
    anggaranMutate();
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table
  // [ END ] handler for tab anggaran

  // [ START ] hanlder for tab jadwal
  const handleChangePayloadJadwal = (property, value) => {
    dispatch(
      setObjPayloadJadwal({
        ...payloadJadwal,
        [property]: value,
      })
    );
  };

  const handleSubmitJadwal = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/jadwal/${params?.id}`,
      { jadwal: payloadJadwal }
    );

    jadwalMutate();
    ringkasanMutate();
    dispatch(resetObjPayloadJadwal());
    loadingSwal("close");
  };
  // [ END ] hanlder for tab jadwal

  // [ START ] handler for tab ringkasan
  // [ START ] handler for table ringkasan
  const handleClickUpdateRingkasan = async (addendum_id) => {
    setShowModalEditRingkasan(true);
    setSelectedRingkasanId(addendum_id);
  };

  const handleClickDeleteRingkasan = async (addendum_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin mengembalikan data seperti semula?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/summary/delete/${addendum_id}`,
      {}
    );
    loadingSwal("close");
  };

  const handleClickViewRingkasan = async (addendum_id) => {
    setShowModalDetailRingkasan(true);
    setSelectedRingkasanId(addendum_id);
  };
  // [ END ] handler for table ringkasan

  // [ START ] handler for modal ringkasan
  const handleCloseModalRingkasan = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalDetailRingkasan(false);
    setShowModalEditRingkasan(false);
    setSelectedRingkasanId(0);
    dispatch(resetObjPayloadRingkasan());
    dispatch(resetValidationErrorsRingkasan());
  };

  const handleChangePayloadRingkasan = (property, value) => {
    dispatch(
      setObjPayloadRingkasan({
        ...payloadRingkasan,
        [property]: value,
      })
    );
  };

  const handleSubmitEditRingkasan = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/summary/update/${selectedRingkasanId}`,
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

    ringkasanMutate();
    setShowModalEditRingkasan(false);
    setSelectedRingkasanId(0);
    dispatch(resetObjPayloadRingkasan());
    loadingSwal("close");
  };

  const handleSaveRingkasan = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/summary`,
      {
        id: params?.id,
        type: "others",
      }
    );

    ringkasanMutate();
    setShowModalEditRingkasan(false);
    setSelectedRingkasanId(0);
    dispatch(resetObjPayloadRingkasan());
    loadingSwal("close");
  };

  const handleResetRingkasan = async (e) => {
    e.preventDefault();
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin melakukan reset perubahan data?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/summary/reset/${params?.id}?module=others`,
      {}
    );

    ringkasanMutate();
    latarBelakangMutate();
    tujuanMutate();
    analisaMutate();
    anggaranMutate();
    jadwalMutate();
    loadingSwal("close");
  };
  // [ END ] handler for modal ringkasan
  // [ END ] handler for tab ringkasan
  return (
    <LandingLayoutEWPAddendum type="quality-assurance">
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
          width={"w-[32rem]"}
          handleChange={handleChangeTab}
        />
        {currentContentStage == "1" ? (
          <ContentCKEditorAddendum
            part={"latar_belakang"}
            isDisabled={
              !((isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress)
            }
            dataContent={dataContentLatarBelakang}
            dataAttachmentList={attachmentClipListLatarBelakang}
            dataImageClipList={imageClipListLatarBelakang}
            handleChangeContent={handleChangeContentLatarBelakang}
            handleUploadFile={handleUploadFileLatarBelakang}
            handleClickUploadAttachment={handleClickUploadAttachment}
            handleClickUploadImage={handleClickUploadImage}
            handleSubmit={handleSubmitLatarBelakang}
            handleLoadDataFromMAR={handleLoadDataFromMAR}
          />
        ) : currentContentStage == "2" ? (
          <ContentCKEditorAddendum
            part={"tujuan"}
            isDisabled={
              !((isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress)
            }
            dataContent={dataContentTujuan}
            dataAttachmentList={attachmentClipListTujuan}
            dataImageClipList={imageClipListTujuan}
            handleChangeContent={handleChangeContentTujuan}
            handleUploadFile={handleUploadFileTujuan}
            handleClickUploadAttachment={handleClickUploadAttachment}
            handleClickUploadImage={handleClickUploadImage}
            handleSubmit={handleSubmitTujuan}
            handleLoadDataFromMAR={handleLoadDataFromMAR}
          />
        ) : currentContentStage == "3" ? (
          <ContentCKEditorAddendum
            part={"analisa"}
            isDisabled={
              !((isInitiator || isAuditor) && !isCloseSubmodule && isOnProgress)
            }
            dataContent={dataContentAnalisa}
            dataAttachmentList={attachmentClipListAnalisa}
            dataImageClipList={imageClipListAnalisa}
            handleChangeContent={handleChangeContentAnalisa}
            handleUploadFile={handleUploadFileAnalisa}
            handleClickUploadAttachment={handleClickUploadAttachment}
            handleClickUploadImage={handleClickUploadImage}
            handleSubmit={handleSubmitAnalisa}
            handleLoadDataFromMAR={handleLoadDataFromMAR}
          />
        ) : currentContentStage == "4" ? (
          <ContentAnggaran
            showModal={showModalAnggaran}
            dataContent={dataContentAnggaran}
            payload={payloadAnggaran}
            validation={validationAnggaran}
            handleChangePayload={handleChangePayloadAnggaran}
            handleClickAddAnggaran={handleClickAddAnggaran}
            handleClickUpdateAnggaran={handleClickUpdateAnggaran}
            handleClickDeleteAnggaran={handleClickDeleteAnggaran}
            handleCloseModalAnggaran={handleCloseModalAnggaran}
            handleLoadDataFromMAR={handleLoadDataFromMAR}
            handleSaveAnggaran={handleSaveAnggaran}
            handleSubmitAnggaran={handleSubmitAnggaran}
          />
        ) : currentContentStage == "5" ? (
          <ContentJadwal
            data={dataContentJadwal}
            payload={payloadJadwal}
            handleChange={handleChangePayloadJadwal}
            handleSubmit={handleSubmitJadwal}
            handleLoadDataFromMAR={handleLoadDataFromMAR}
          />
        ) : currentContentStage == "6" ? (
          <ContentRingkasan
            data={dataContentRingkasan}
            dataDetail={dataContentDetailRingkasan}
            payload={payloadRingkasan}
            validation={validationRingkasan}
            showModalDetail={showModalDetailRingkasan}
            showModalEdit={showModalEditRingkasan}
            handleCloseModal={handleCloseModalRingkasan}
            handleChangePayload={handleChangePayloadRingkasan}
            handleClickUpdate={handleClickUpdateRingkasan}
            handleClickDelete={handleClickDeleteRingkasan}
            handleClickView={handleClickViewRingkasan}
            handleSaveRingkasan={handleSaveRingkasan}
            handleResetRingkasan={handleResetRingkasan}
            handleSubmitEditRingkasan={handleSubmitEditRingkasan}
          />
        ) : (
          ""
        )}
      </div>
      {/* End Content */}
    </LandingLayoutEWPAddendum>
  );
};

export default index;
