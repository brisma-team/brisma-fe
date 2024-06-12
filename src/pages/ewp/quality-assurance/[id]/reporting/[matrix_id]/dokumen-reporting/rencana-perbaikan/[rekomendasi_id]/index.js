import {
  Breadcrumbs,
  ButtonField,
  ButtonIconBack,
  Card,
  PageTitle,
} from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuditInfo } from "@/data/ewp/common/info";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/quality-assurance/reporting/actionPlanEWPQualityAssuranceSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useDokumenReporting,
  useDokumenReportingDetail,
} from "@/data/ewp/quality-assurance/reporting";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import { addActionPlanSchema } from "@/helpers/schemas/ewp/quality-assurance/quality-assurance/actionPlanEWPQualityAssuranceSchema";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { TableActionPlan } from "@/components/molecules/ewp/quality-assurance/reporting/dokumen-reporting";
import { IconPlus } from "@/components/icons";
import ModalActionPlan from "@/components/molecules/ewp/quality-assurance/reporting/dokumen-reporting/ModalActionPlan";
import useUser from "@/data/useUser";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    id: 0,
    matrix_id: 0,
    rekomendasi_id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/reporting/${params?.matrix_id}/dokumen-reporting`;

  const [dataRekomendasi, setDataRekomendasi] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  const [isInitiator, setIsInitiator] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const data = useSelector(
    (state) => state.actionPlanEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.actionPlanEWPQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.actionPlanEWPQualityAssurance.validationErrors
  );

  const { user } = useUser();
  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { dokumenReporting, dokumenReportingMutate } = useDokumenReporting({
    id: params?.rekomendasi_id,
    page_type: "action_plan",
  });
  const { dokumenReportingDetail } = useDokumenReportingDetail({
    id: selectedId,
    page_type: "action_plan",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id, matrix_id, rekomendasi_id } = router.query;
    setParams({
      id,
      matrix_id,
      rekomendasi_id,
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
      { name: "Reporting", path: `${baseUrl}/reporting` },
      {
        name: "Dokumen Reporting",
        path: pathName,
      },
      {
        name: "Rencana Perbaikan",
        path: `${pathName}/rencana-perbaikan`,
      },
      {
        name: "Action Plan",
        path: `${pathName}/rencana-perbaikan/${params?.rekomendasi_id}`,
      },
    ]);
    setIsCloseSubmodule(
      Boolean(auditInfo?.data?.realisasi?.monitoring_real_end)
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

  useEffect(() => {
    if (dokumenReporting?.data) {
      const { kkpt, desc } = dokumenReporting.data.info_rekomendasi;
      setDataRekomendasi({ judul: kkpt?.judul_kkpt, desc });

      if (dokumenReporting?.data?.action_plans?.length) {
        const mapping = dokumenReporting?.data?.action_plans?.map(
          (action_plan) => {
            return _.pick(action_plan, ["id", "desc", "batas_waktu"]);
          }
        );
        dispatch(setObjData(mapping));
      } else {
        dispatch(resetObjData());
      }
    } else {
      dispatch(resetObjData());
    }
  }, [dokumenReporting]);

  useEffect(() => {
    if (dokumenReportingDetail?.data) {
      const { desc, batas_waktu } = dokumenReportingDetail.data;
      dispatch(setObjPayload({ desc, batas_waktu }));
    }
  }, [dokumenReportingDetail, showModal]);

  // [ START ] handler for modal add action plan
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setIsEdit(false);
    setSelectedId(0);
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleResetPayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleSubmitForm = async () => {
    const schemaMappings = {
      schema: addActionPlanSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      let objPayload;
      if (isEdit) {
        objPayload = { ...payload, id: selectedId };
      } else {
        objPayload = { ...payload, rekomendasi_id: params?.rekomendasi_id };
      }

      loadingSwal();
      await fetchApi(
        isEdit ? "PATCH" : "POST",
        `${
          process.env.NEXT_PUBLIC_API_URL_EWP
        }/ewp/qa/reporting/dokumen_reporting/action_plan${
          isEdit ? "/update" : ""
        }`,
        objPayload
      );
      setShowModal(false);
      setIsEdit(false);
      setSelectedId(0);
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      dokumenReportingMutate();
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal add action plan

  // [ START ] handler for table action plan
  const handleClickEdit = (id) => {
    setShowModal(true);
    setSelectedId(id);
    setIsEdit(true);
  };

  const handleClickDelete = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda takin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/dokumen_reporting/action_plan/${id}`,
      {}
    );
    dokumenReportingMutate();
    loadingSwal("close");
  };

  const handleClickAdd = () => {
    setShowModal(true);
    setIsEdit(false);
  };
  // [ END ] handler for table action plan

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-6">
        <ButtonIconBack
          backUrl={`/ewp/quality-assurance/${params?.id}/reporting/${params?.matrix_id}/dokumen-reporting/rencana-perbaikan?stage=2`}
        />
        <PageTitle text="Action Plan" />
      </div>
      <Card>
        <div className="flex flex-col gap-3 w-full px-4 py-2">
          <div>
            <p className="text-sm font-bold">OBJEK AUDIT :</p>
            <p className="text-sm font-bold text-atlasian-red">
              {dataRekomendasi?.judul}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">REKOMENDASI :</p>
            <p className="text-sm font-bold">{dataRekomendasi?.desc}</p>
          </div>
        </div>
      </Card>
      <CardContentHeaderFooter
        header={
          <div className="px-4 py-3">
            <p className="text-base font-semibold">Action Plan</p>
          </div>
        }
        footer={
          !isCloseSubmodule && isInitiator ? (
            <div className="flex justify-end py-3 px-4">
              <div className="w-fit">
                <ButtonField
                  iconAfter={
                    <div className="text-atlasian-purple">
                      <IconPlus size="medium" />
                    </div>
                  }
                  text={"Tambah ACTION PLAN"}
                  textColor={"purple"}
                  handler={handleClickAdd}
                />
              </div>
            </div>
          ) : (
            ""
          )
        }
        className={"mt-4"}
      >
        <div className="p-4">
          <TableActionPlan
            data={data}
            withoutButton={!(!isCloseSubmodule && isInitiator)}
            handleClickDelete={handleClickDelete}
            handleClickEdit={handleClickEdit}
          />
        </div>
      </CardContentHeaderFooter>
      <ModalActionPlan
        payload={payload}
        validation={validation}
        showModal={showModal}
        handleChangePayload={handleChangePayload}
        handleResetPayload={handleResetPayload}
        handleSubmit={handleSubmitForm}
        handleCloseModal={handleCloseModal}
      />
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
