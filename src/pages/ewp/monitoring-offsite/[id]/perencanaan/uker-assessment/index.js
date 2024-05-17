import { Breadcrumbs, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/monitoring-offsite";
import { LandingLayoutEWPMonOff } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  ModalAttachment,
  ModalDescription,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useDispatch } from "react-redux";
import {
  setObjPayload,
  resetObjPayload,
} from "@/slices/ewp/monitoring-offsite/perencanaan/ukerAssessmentEWPMonoffSlice";
import { useSelector } from "react-redux";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  usePostFileData,
} from "@/helpers";
import { useUkerAssessment } from "@/data/ewp/monitoring-offsite/perencanaan/uker-assessment";
import UkerAssessmentTable from "@/components/molecules/ewp/monitoring-offsite/perencanaan/uker-assessment/UkerAssessmentTable";

const routes = [
  {
    name: "Tim Audit",
    slug: "tim",
  },
  {
    name: "UKER Assessment",
    slug: "uker-assessment",
  },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/monitoring-offsite/${id}`;
  const pathName = `${baseUrl}/perencanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  //Uker Assessment
  const [dataUkerAssessment, setDataUkerAssessment] = useState([]);
  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [showModalDescription, setShowModalDescription] = useState(false);
  const [showModalAttachment, setShowModalAttachment] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  //   const data = useSelector((state) => state.ukerAssessmentEWPMonoff.objData);
  const payload = useSelector(
    (state) => state.ukerAssessmentEWPMonoff.objPayload
  );
  //   const validation = useSelector(
  //     (state) => state.ukerAssessmentEWPMonoff.validationErrors
  //   );

  const { projectDetail } = useProjectDetail({ id });
  const { userAssessment, userAssessmentMutate } = useUkerAssessment({ id });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      {
        name: "Monitoring Offsite / Overview",
        path: "/ewp/monitoring-offsite",
      },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Perencanaan Kegiatan`,
        path: pathName,
      },
      {
        name: `UKER Assessment`,
        path: `${baseUrl}/perencanaan/uker-assessment`,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (userAssessment?.data?.length) {
      const mapping = userAssessment?.data?.map((v, i) => {
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
      setDataUkerAssessment(mapping);
    } else {
      setDataUkerAssessment([]);
    }
  }, [userAssessment]);

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

  // [ START ] handler for uker assessment table
  const handleChangepayload = (property, value) => {
    dispatch(
      setObjPayload({
        ...payload,
        [property]: value,
      })
    );
  };

  const handleClickEditUkerAssessment = (index) => {
    const objData = dataUkerAssessment[index];
    const newData = [...dataUkerAssessment];
    newData[index] = { ...newData[index], is_edit: true };
    setDataUkerAssessment(newData);
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
        deskripsi: objData?.desc,
      })
    );
  };

  const handleClickAddRowUkerAssessment = () => {
    if (!isAddNewRowUker) {
      const newDataUkerAssessment = [...dataUkerAssessment];
      newDataUkerAssessment.push({
        ...payload,
        index: dataUkerAssessment?.length,
        is_edit: false,
        is_new: true,
      });
      setDataUkerAssessment(newDataUkerAssessment);
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
      const newData = [...dataUkerAssessment];
      setIsAddNewRowUker(false);
      newData.splice(index, 1);
      setDataUkerAssessment(newData);
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/mapa/uker_info/${uker_id}`,
      {}
    );

    userAssessmentMutate();
    loadingSwal("close");
  };

  const handleSaveUkerAssessment = async (isUpdate, uker_id) => {
    loadingSwal();
    const response = await fetchApi(
      isUpdate ? "PATCH" : "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/monoff/mapa/uker_info/${
        isUpdate ? uker_id : id
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
    userAssessmentMutate();
    dispatch(resetObjPayload());
    loadingSwal("close");
  };
  // [ END ] handler for uker assessment table

  return (
    <LandingLayoutEWPMonOff>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="UKER Assessment" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/tim"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="w-full">
        <Card>
          <div className="px-6 pt-2 pb-4 w-full">
            <p className="ml-2 font-bold text-base">UKER Assessment</p>
            <div className="my-2 " />
            <UkerAssessmentTable
              data={dataUkerAssessment}
              payload={payload}
              //   withoutButton={!isInitiator || isFinalProject}
              handleChange={handleChangepayload}
              handleClickAddUkerAssessment={handleClickAddRowUkerAssessment}
              handleClickSave={handleSaveUkerAssessment}
              handleClickEdit={handleClickEditUkerAssessment}
              handleClickDelete={handleClickDeleteUkerAssessment}
              handleClickDescription={handleClickDescription}
              handleClickAttachment={handleClickAttachment}
            />
          </div>
        </Card>
      </div>
      <ModalDescription
        data={
          dataUkerAssessment[selectedIndex]?.is_new
            ? payload?.description
            : dataUkerAssessment[selectedIndex]?.description
        }
        showModal={showModalDescription}
        handleCloseModal={handleCloseModalDescription}
        isEdit={
          dataUkerAssessment[selectedIndex]?.is_new ||
          dataUkerAssessment[selectedIndex]?.is_edit
        }
        handleSubmit={handleSubmitDescription}
      />
      <ModalAttachment
        data={
          dataUkerAssessment[selectedIndex]?.is_new
            ? payload?.attachments[0]
            : dataUkerAssessment[selectedIndex]?.attachments[0]
        }
        isEdit={
          dataUkerAssessment[selectedIndex]?.is_new ||
          dataUkerAssessment[selectedIndex]?.is_edit
        }
        showModal={showModalAttachment}
        handleCloseModal={handleCloseModalAttachment}
        handleUpload={handleUploadAttachment}
      />
      {/* End Content */}
    </LandingLayoutEWPMonOff>
  );
};

export default index;
