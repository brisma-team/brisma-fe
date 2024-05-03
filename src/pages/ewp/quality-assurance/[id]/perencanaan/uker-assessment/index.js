import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  PrevNextNavigation,
  UkerAssessmentTable,
} from "@/components/molecules/commons";
import {
  setObjData,
  setObjPayload,
  resetObjData,
  resetObjPayload,
} from "@/slices/ewp/quality-assurance/perencanaan/uker-assessment/ukerAssessmentEWPQualityAssuranceSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  usePostFileData,
} from "@/helpers";
import useUser from "@/data/useUser";
import { useLandingStatus } from "@/data/ewp/common";
import {
  ModalDescription,
  ModalAttachment,
} from "@/components/molecules/commons";
import { useUkerAssessment } from "@/data/ewp/quality-assurance/perencanaan/uker-assessment";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Analisa", slug: "analisa" },
  { name: "Tim", slug: "tim" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis Perencanaan", slug: "analisis-perencanaan" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal", slug: "jadwal" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [showModalAttachment, setShowModalAttachment] = useState(false);
  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(true);
  const [isOnProgress, setIsOnProgress] = useState(true);

  const data = useSelector(
    (state) => state.ukerAssessmentEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.ukerAssessmentEWPQualityAssurance.objPayload
  );
  // const validation = useSelector(
  //   (state) => state.ukerAssessmentEWPQualityAssurance.validationErrors
  // );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { landingStatus } = useLandingStatus({
    module: "qa",
    submodule: "mapa",
    id: params?.id,
  });
  const { ukerAssessment, ukerAssessmentMutate } = useUkerAssessment({
    id: params?.id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
        path: baseUrl + "/info",
      },
      {
        name: `Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `Uker Assessment`,
        path: `${pathName}/uker-assessment`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.penyusunan_mapa_real_end)
    );
  }, [auditInfo]);

  useEffect(() => {
    if (landingStatus?.data) {
      setIsOnProgress(
        Boolean(landingStatus?.data?.status_persetujuan_name == "On Progress")
      );
    }
  }, [landingStatus]);

  useEffect(() => {
    if (ukerAssessment?.data?.length) {
      const mapping = ukerAssessment?.data?.map((v, i) => {
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
          is_edit: false,
          is_new: false,
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [ukerAssessment]);

  // [ START ] handler for uker assessment table
  const handleChangePayloadUkerAssessment = (property, value) => {
    dispatch(
      setObjPayload({
        ...payload,
        [property]: value,
      })
    );
  };

  const handleClickEditUkerAssessment = (index) => {
    const objData = data[index];
    const newData = [...data];
    newData[index] = { ...newData[index], is_edit: true };
    dispatch(setObjData(newData));
    dispatch(
      setObjPayload({
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
      const newDataUkerAssessment = [...data];
      newDataUkerAssessment.push({
        ...payload,
        index: data?.length,
        is_edit: false,
        is_new: true,
      });
      dispatch(setObjData(newDataUkerAssessment));
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
      const newData = [...data];
      setIsAddNewRowUker(false);
      newData.splice(index, 1);
      dispatch(setObjData(newData));
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/uker_assesment/${uker_id}`,
      {}
    );

    ukerAssessmentMutate();
    loadingSwal("close");
  };

  const handleSaveUkerAssessment = async (isUpdate, uker_id) => {
    loadingSwal();
    const response = await fetchApi(
      isUpdate ? "PATCH" : "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/mapa/uker_assesment/${
        isUpdate ? uker_id : params?.id
      }`,
      {
        ref_auditee_branch_kode: parseInt(payload?.branch?.branch_kode),
        ref_auditee_branch_name: payload?.branch?.branch_name,
        ref_auditee_orgeh_kode: parseInt(payload?.orgeh?.orgeh_kode),
        ref_auditee_orgeh_name: payload?.orgeh?.orgeh_name,
        tipe_uker: payload?.tipe_uker,
        desc: payload?.description,
        attachments: payload?.attachments,
      }
    );
    if (response.isDismissed) return;
    setIsAddNewRowUker(false);
    ukerAssessmentMutate();
    dispatch(resetObjPayload());
    loadingSwal("close");
  };

  // [ START ] handler for modal description
  const handleClickDescription = (index) => {
    setSelectedIndex(index);
    setShowModalDescription(true);
  };

  const handleCloseModalDescription = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalDescription(false);
  };

  const handleSubmitDescription = (value) => {
    dispatch(
      setObjPayload({
        ...payload,
        description: value,
      })
    );
    setShowModalDescription(false);
  };
  // [ END ] handler for modal description

  // [ START ] handler for modal attachment
  const handleClickAttachment = (index) => {
    setSelectedIndex(index);
    setShowModalAttachment(true);
  };

  const handleCloseModalAttachment = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModalAttachment(false);
  };

  const handleUploadAttachment = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "pat",
      });

      dispatch(
        setObjPayload({
          ...payload,
          attachments: response?.url,
        })
      );
      setShowModalDescription(false);
    }
    loadingSwal("close");
  };
  // [ END ] handler for modal attachment

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="UKER Assessment" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/tim"}
          nextUrl={"/analisis-perencanaan"}
          marginLeft={"-67px"}
        />
      </div>
      {/* Start Content */}
      <UkerAssessmentTable
        data={data}
        payload={payload}
        withoutButton={!isInitiator}
        handleChange={handleChangePayloadUkerAssessment}
        handleClickAddUkerAssessment={handleClickAddRowUkerAssessment}
        handleClickSave={handleSaveUkerAssessment}
        handleClickEdit={handleClickEditUkerAssessment}
        handleClickDelete={handleClickDeleteUkerAssessment}
        handleClickDescription={handleClickDescription}
        handleClickAttachment={handleClickAttachment}
      />
      <ModalDescription
        data={
          data[selectedIndex]?.is_new
            ? payload?.description
            : data[selectedIndex]?.description
        }
        showModal={showModalDescription}
        handleCloseModal={handleCloseModalDescription}
        isEdit={data[selectedIndex]?.is_new || data[selectedIndex]?.is_edit}
        handleSubmit={handleSubmitDescription}
      />
      <ModalAttachment
        data={
          data[selectedIndex]?.is_new
            ? payload?.attachments[0]
            : data[selectedIndex]?.attachments[0]
        }
        isEdit={data[selectedIndex]?.is_new || data[selectedIndex]?.is_edit}
        showModal={showModalAttachment}
        handleCloseModal={handleCloseModalAttachment}
        handleUpload={handleUploadAttachment}
      />
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
