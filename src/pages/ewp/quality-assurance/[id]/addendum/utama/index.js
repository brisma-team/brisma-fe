//React & Next Library
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

//helpers
import {
  confirmationSwal,
  convertIntegerToDecimal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";

//data
import { useAuditInfo } from "@/data/ewp/common/info";
import {
  useTim,
  useUkerAssessment,
  useRingkasan,
  useDetailRingkasan,
} from "@/data/ewp/common/addendum/utama";

//layout
import { LandingLayoutEWPAddendum } from "@/layouts/ewp";

//molecules
import { NavigationTab } from "@/components/molecules/commons";

//atoms
import { Breadcrumbs, PageTitle } from "@/components/atoms";

//reducers
import {
  setObjDataContentTim,
  setObjDataContentUkerAssessment,
  setObjDataContentRingkasan,
  setObjDataContentDetailRingkasan,
  setObjPayloadUkerAssessment,
  setObjPayloadRingkasan,
  setValidationErrorsTim,
  // setValidationErrorsRingkasan,
  resetObjDataContentTim,
  resetObjDataContentUkerAssessment,
  resetObjDataContentRingkasan,
  resetObjDataContentDetailRingkasan,
  resetObjPayloadUkerAssessment,
  resetObjPayloadRingkasan,
  resetValidationErrorsTim,
  resetValidationErrorsRingkasan,
} from "@/slices/ewp/quality-assurance/addendum/addendumUtamaQualityAssuranceSlice";
import {
  ContentTim,
  ContentUkerAssessment,
  ContentAnalisisPerencanaan,
  ContentRingkasan,
} from "@/components/molecules/ewp/quality-assurance/addendum/utama";
import timEWPQualityAssuranceSchema from "@/helpers/schemas/ewp/quality-assurance/tim/timEWPQualityAssuranceSchema";
import useUser from "@/data/useUser";
import {
  useAnalisisPerencanaanEksternal,
  useAnalisisPerencanaanInternal,
} from "@/data/ewp/common/addendum/utama/analisis-perencanaan";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    id: 0,
  });
  const pathName = `/ewp/quality-assurance/${params?.id}/addendum/utama`;
  const navigationTabItems = [
    { idx: 1, title: "Tim Review" },
    { idx: 2, title: "Uker Assessment" },
    { idx: 3, title: "Analisis Perencanaan" },
    { idx: 4, title: "Ringkasan" },
  ];

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [
    isCloseSubmodule,
    // setIsCloseSubmodule
  ] = useState(false);
  const [
    isOnProgress,
    // setIsOnProgress
  ] = useState(true);
  const [
    isInitiator,
    // setIsInitiator
  ] = useState(true);
  // const [isAuditor, setIsAuditor] = useState(true);

  // content ringkasan
  const [showModalDetailRingkasan, setShowModalDetailRingkasan] =
    useState(false);
  const [showModalEditRingkasan, setShowModalEditRingkasan] = useState(false);
  const [selectedRingkasanId, setSelectedRingkasanId] = useState("");

  // state for uker assessment
  const [selectedIndexUker, setSelectedIndexUker] = useState(1);
  const [showModalDescriptionUker, setShowModalDescriptionUker] =
    useState(false);
  const [showModalAttachmentUker, setShowModalAttachmentUker] = useState(false);
  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);

  const dataContentTim = useSelector(
    (state) => state.addendumUtamaQualityAssurance.objDataContentTim
  );
  const dataContentUkerAssessment = useSelector(
    (state) => state.addendumUtamaQualityAssurance.objDataContentUkerAssessment
  );
  const dataContentRingkasan = useSelector(
    (state) => state.addendumUtamaQualityAssurance.objDataContentRingkasan
  );
  const dataContentDetailRingkasan = useSelector(
    (state) => state.addendumUtamaQualityAssurance.objDataContentDetailRingkasan
  );
  const payloadUkerAssessment = useSelector(
    (state) => state.addendumUtamaQualityAssurance.objPayloadUkerAssessment
  );
  const payloadRingkasan = useSelector(
    (state) => state.addendumUtamaQualityAssurance.objPayloadRingkasan
  );
  const validationTim = useSelector(
    (state) => state.addendumUtamaQualityAssurance.validationErrorsTim
  );
  const validationRingkasan = useSelector(
    (state) => state.addendumUtamaQualityAssurance.validationErrorsRingkasan
  );

  useEffect(() => {
    if (!router.isReady) return;
    const { id, stage } = router.query;
    setParams({
      id,
    });
    setCurrentContentStage(parseInt(stage) || 1);
  }, [router.isReady]);

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ id: params?.id, module: "qa" });

  const { tim, timMutate } = useTim({
    id: params?.id,
    module: "qa",
  });
  const { ukerAssessment, ukerAssessmentMutate } = useUkerAssessment({
    id: params?.id,
    module: "qa",
  });
  const { analisisPerencanaanInternalMutate } = useAnalisisPerencanaanInternal({
    id: params?.id,
  });
  const { analisisPerencanaanEksternalMutate } =
    useAnalisisPerencanaanEksternal({ id: params?.id });
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
        name: "Utama",
        path: `/ewp/quality-assurance/${params?.id}/addendum/utama`,
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    if (tim?.data?.tim_audit) {
      const mapping = mappingDataTeam(tim?.data?.tim_audit);
      dispatch(setObjDataContentTim(mapping));
    } else {
      dispatch(resetObjDataContentTim());
    }
  }, [tim, auditInfo]);

  useEffect(() => {
    if (ukerAssessment?.data?.uker?.length) {
      const mapping = mappingDataUkerAssessment(ukerAssessment?.data);
      dispatch(setObjDataContentUkerAssessment(mapping));
    } else {
      dispatch(resetObjDataContentUkerAssessment());
    }
  }, [ukerAssessment]);

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

  const mappingDataTeam = (data) => {
    const mappingInitiator = [auditInfo?.data?.project_info?.initiator];
    const mappingKTA = data?.kta?.length
      ? data?.kta?.map((v) => {
          const { pn, nama, is_initiator } = v;
          return {
            pn,
            nama,
            is_initiator,
          };
        })
      : [];
    const mappingMA = data?.ma?.length
      ? data?.ma?.map((v) => {
          const { pn, nama, is_initiator } = v;
          return {
            pn,
            nama,
            is_initiator,
          };
        })
      : [];
    const mappingATA = data?.ata?.length
      ? data?.ata?.map((v) => {
          const { pn, nama, is_initiator, mandays, deskripsi } = v;
          return {
            pn,
            nama,
            is_initiator,
            mandays: convertIntegerToDecimal(mandays).decimal,
            deskripsi,
          };
        })
      : [];

    return {
      initiator: mappingInitiator,
      kta: mappingKTA,
      ma: mappingMA,
      ata: mappingATA,
    };
  };

  const mappingDataUkerAssessment = (data) => {
    const listUpdated = data?.updated_uker || [];
    const mapping = data?.uker?.map((v, i) => {
      return {
        index: i,
        uker_id: v?.id,
        branch: {
          branch_kode: v?.ref_auditee_branch_kode,
          branch_name: v?.ref_auditee_branch_name,
        },
        orgeh: {
          orgeh_kode: v?.ref_auditee_orgeh_kode,
          orgeh_name: v?.ref_auditee_orgeh_name,
        },
        uker_type: { name: v?.tipe_uker },
        description: v?.desc,
        attachments: v?.attachments,
        is_new: false,
        is_edit: false,
        is_data_new: Boolean(!v?.mapa_uker_origin_id),
        is_data_edit: Boolean(listUpdated?.find((id) => id == v?.id)),
        is_data_delete: Boolean(!v?.is_active),
      };
    });

    return mapping;
  };

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
    router.push({
      pathname: pathName,
      query: { stage: index },
    });
  };

  const handleLoadDataFromMAR = async (type) => {
    loadingSwal();
    const response = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/load_from_mapa/${params?.id}?part=${type}`,
      {}
    );
    if (type == "tim" && response?.data?.tim_audit) {
      dispatch(
        setObjDataContentTim(mappingDataTeam(response?.data?.tim_audit))
      );
    } else if (type == "analisis_perencanaan") {
      ukerAssessmentMutate();
      analisisPerencanaanInternalMutate();
      analisisPerencanaanEksternalMutate();
    }
    loadingSwal("close");
  };

  // [ START ] handler for tab tim
  const handleAddObjectPayloadTim = (property) => {
    const newTimAudit = [...dataContentTim[property]];
    newTimAudit.push({ pn: "", nama: "", is_initiator: false });
    dispatch(
      setObjDataContentTim({ ...dataContentTim, [property]: newTimAudit })
    );
  };

  const handleDeleteObjectPayloadTim = (index, property) => {
    const newData = [...dataContentTim[property]];
    newData.splice(index, 1);
    dispatch(setObjDataContentTim({ ...dataContentTim, [property]: newData }));
  };

  const handleChangeSelectPayloadTim = (property, index, value) => {
    const newData = [...dataContentTim[property]];
    const updated = {
      ...newData[index],
      pn: value?.pn,
      nama: value?.name,
    };
    newData[index] = updated;
    dispatch(
      setObjDataContentTim({
        ...dataContentTim,
        [property]: newData,
      })
    );
  };

  const handleChangeTextPayloadTim = (property, propertyObj, index, value) => {
    const newData = [...dataContentTim[property]];
    const updated = {
      ...newData[index],
      [propertyObj]: value,
    };
    newData[index] = updated;
    dispatch(
      setObjDataContentTim({
        ...dataContentTim,
        [property]: newData,
      })
    );
  };

  const handleSubmitTim = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: timEWPQualityAssuranceSchema,
      resetErrors: resetValidationErrorsTim,
      setErrors: setValidationErrorsTim,
    };
    const validate = setErrorValidation(
      dataContentTim,
      dispatch,
      schemaMapping
    );

    if (validate) {
      const mappingATA = dataContentTim?.ata?.map((v) => {
        return {
          ..._.omit(v, ["mandays"]),
          mandays: convertIntegerToDecimal(v?.mandays).integer,
        };
      });
      const objPayload = {
        ..._.omit(dataContentTim, ["ata"]),
        ata: mappingATA,
      };
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/tim/${params?.id}`,
        { tim_audit: _.omit(objPayload, ["initiator"]) }
      );
      timMutate();
      ringkasanMutate();
      loadingSwal("close");
    }
  };
  // [ END ] handler for tab tim

  // [ START ] handler for tab ringkasan
  // [ START ] handler for table ringkasan
  const handleClickUpdateRingkasan = async (addendum_id) => {
    setShowModalEditRingkasan(true);
    setSelectedRingkasanId(addendum_id);
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
        type: "core",
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/summary/reset/${params?.id}?module=core`,
      {}
    );

    ringkasanMutate();
    timMutate();
    ukerAssessmentMutate();
    analisisPerencanaanInternalMutate();
    analisisPerencanaanEksternalMutate();
    loadingSwal("close");
  };
  // [ END ] handler for modal ringkasan
  // [ END ] handler for tab ringkasan

  // [ START ] handler for tab uker assessment
  // [ START ] handler for uker assessment table
  const handleChangePayloadUkerAssessment = (property, value) => {
    dispatch(
      setObjPayloadUkerAssessment({
        ...payloadUkerAssessment,
        [property]: value,
      })
    );
  };

  const handleClickEditUkerAssessment = (index) => {
    const objData = dataContentUkerAssessment[index];
    const newData = [...dataContentUkerAssessment];
    newData[index] = { ...newData[index], is_edit: true };
    dispatch(setObjDataContentUkerAssessment(newData));
    dispatch(
      setObjPayloadUkerAssessment({
        branch: {
          branch_kode: objData?.branch?.branch_kode,
          branch_name: objData?.branch?.branch_name,
        },
        orgeh: {
          orgeh_kode: objData?.orgeh?.orgeh_kode,
          orgeh_name: objData?.orgeh?.orgeh_name,
        },
        tipe_uker: objData?.uker_type?.name,
        description: objData?.desc,
      })
    );
  };

  const handleClickAddRowUkerAssessment = () => {
    if (!isAddNewRowUker) {
      const newDataUkerAssessment = [...dataContentUkerAssessment];
      newDataUkerAssessment.push({
        ...payloadUkerAssessment,
        index: dataContentUkerAssessment?.length,
        is_edit: false,
        is_new: true,
      });
      dispatch(setObjDataContentUkerAssessment(newDataUkerAssessment));
      setIsAddNewRowUker(true);
    }
  };

  const handleClickDeleteUkerAssessment = async (uker_id, index) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (!confirm.value) {
      return;
    }

    if (isAddNewRowUker) {
      const newData = [...dataContentUkerAssessment];
      setIsAddNewRowUker(false);
      newData.splice(index, 1);
      dispatch(setObjDataContentUkerAssessment(newData));
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/uker/${uker_id}`,
      {}
    );

    ukerAssessmentMutate();
    ringkasanMutate();
    loadingSwal("close");
  };

  const handleClickRestoreUkerAssessment = async (uker_id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin mengembalikan perubahan data Uker seperti semula?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/uker/restore/${uker_id}`,
      {}
    );

    ukerAssessmentMutate();
    ringkasanMutate();
    loadingSwal("close");
  };

  const handleSaveUkerAssessment = async (isUpdate, uker_id) => {
    loadingSwal();
    const response = await fetchApi(
      isUpdate ? "PATCH" : "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/addendum/uker/${
        isUpdate ? uker_id : params?.id
      }${!isUpdate ? "/create" : ""}`,
      {
        ref_auditee_branch_kode: parseInt(
          payloadUkerAssessment?.branch?.branch_kode
        ),
        ref_auditee_branch_name: payloadUkerAssessment?.branch?.branch_name,
        ref_auditee_orgeh_kode: parseInt(
          payloadUkerAssessment?.orgeh?.orgeh_kode
        ),
        ref_auditee_orgeh_name: payloadUkerAssessment?.orgeh?.orgeh_name,
        tipe_uker: payloadUkerAssessment?.tipe_uker,
        desc: payloadUkerAssessment?.description,
        attachments: payloadUkerAssessment?.attachments,
      }
    );
    if (response.isDismissed) return;
    setIsAddNewRowUker(false);
    ukerAssessmentMutate();
    ringkasanMutate();
    dispatch(resetObjPayloadUkerAssessment());
    loadingSwal("close");
  };

  // [ START ] handler for modal description
  const handleClickDescriptionUkerAssessment = (index) => {
    setSelectedIndexUker(index);
    setShowModalDescriptionUker(true);
  };

  const handleCloseModalDescriptionUkerAssessment = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalDescriptionUker(false);
  };

  const handleSubmitDescriptionUkerAssessment = (value) => {
    dispatch(
      setObjPayloadUkerAssessment({
        ...payloadUkerAssessment,
        description: value,
      })
    );
    setShowModalDescriptionUker(false);
  };
  // [ END ] handler for modal description

  // [ START ] handler for modal attachment
  const handleClickAttachmentUkerAssessment = (index) => {
    setSelectedIndexUker(index);
    setShowModalAttachmentUker(true);
  };

  const handleCloseModalAttachmentUkerAssessment = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalAttachmentUker(false);
  };

  const handleUploadAttachmentUkerAssessment = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "pat",
      });

      dispatch(
        setObjPayloadUkerAssessment({
          ...payloadUkerAssessment,
          attachments: response?.url,
        })
      );
      setShowModalDescriptionUker(false);
    }
    loadingSwal("close");
  };
  // [ END ] handler for modal attachment
  // [ END ] handler for tab uker assessment
  return (
    <LandingLayoutEWPAddendum type="quality-assurance">
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Addendum Utama" className={"text-atlasian-red"} />
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
          <ContentTim
            data={dataContentTim}
            validation={validationTim}
            handleAddObject={handleAddObjectPayloadTim}
            handleDeleteObject={handleDeleteObjectPayloadTim}
            handleChangeSelect={handleChangeSelectPayloadTim}
            handleChangeText={handleChangeTextPayloadTim}
            handleLoadDataFromMAR={handleLoadDataFromMAR}
            handleSubmit={handleSubmitTim}
          />
        ) : currentContentStage == "2" ? (
          <ContentUkerAssessment
            data={dataContentUkerAssessment}
            payload={payloadUkerAssessment}
            selectedIndex={selectedIndexUker}
            showModalAttachment={showModalAttachmentUker}
            showModalDescription={showModalDescriptionUker}
            handleCloseModalAttachment={
              handleCloseModalAttachmentUkerAssessment
            }
            handleCloseModalDescription={
              handleCloseModalDescriptionUkerAssessment
            }
            handleChangePayloadUkerAssessment={
              handleChangePayloadUkerAssessment
            }
            handleClickAddRowUkerAssessment={handleClickAddRowUkerAssessment}
            handleClickEditUkerAssessment={handleClickEditUkerAssessment}
            handleClickDeleteUkerAssessment={handleClickDeleteUkerAssessment}
            handleClickRestoreUkerAssessment={handleClickRestoreUkerAssessment}
            handleClickAttachment={handleClickAttachmentUkerAssessment}
            handleClickDescription={handleClickDescriptionUkerAssessment}
            handleSaveUkerAssessment={handleSaveUkerAssessment}
            handleSubmitDescription={handleSubmitDescriptionUkerAssessment}
            handleUploadAttachment={handleUploadAttachmentUkerAssessment}
          />
        ) : currentContentStage == "3" ? (
          <ContentAnalisisPerencanaan
            isCloseSubmodule={isCloseSubmodule}
            isInitiator={isInitiator}
            isOnProgress={isOnProgress}
            params={params}
            tim={tim}
            user={user}
            handleLoadDataFromMAR={handleLoadDataFromMAR}
          />
        ) : currentContentStage == "4" ? (
          <ContentRingkasan
            data={dataContentRingkasan}
            dataDetail={dataContentDetailRingkasan}
            dataInfoProject={auditInfo?.data}
            payload={payloadRingkasan}
            validation={validationRingkasan}
            showModalDetail={showModalDetailRingkasan}
            showModalEdit={showModalEditRingkasan}
            handleCloseModal={handleCloseModalRingkasan}
            handleChangePayload={handleChangePayloadRingkasan}
            handleClickUpdate={handleClickUpdateRingkasan}
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
