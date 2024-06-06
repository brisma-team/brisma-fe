import React, { useEffect, useState } from "react";
import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useObjectAuditDetailRPM } from "@/data/rpm/common";
import { useActionPlan, useRekomendasiList } from "@/data/rpm/common/negosiasi";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjDataContent,
  setObjDataActionPlan,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjDataContent,
  resetObjDataActionPlan,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/rpm/quality-assurance/negosiasiRPMQualityAssuranceSlice";
import _ from "lodash";
import {
  ModalInisiasiNegosiasi,
  TableRekomendasi,
} from "@/components/molecules/rpm/common/negosiasi";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import useUser from "@/data/useUser";
import { CardContentRekomendasi } from "@/components/molecules/rpm/common";
import { ModalDescription } from "@/components/molecules/commons";
import {
  perpanjanganDeadlineSchema,
  penggantianActionPlanSchema,
  penggantianRekomendasiSchema,
} from "@/helpers/schemas/rpm/negosiasi/negosiasiRPMSchema";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
  });
  const baseUrl = `/rpm/quality-assurance/${params?.id}/overview/${params?.kkpt_id}`;

  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isPIC, setIsPIC] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [expansionMap, setExpansionMap] = useState({});
  const [showModalInisiasiNegosiasi, setShowModalInisiasiNegosiasi] =
    useState(false);
  const [showModalEditReason, setShowModalEditReason] = useState(false);
  const [selectedActionPlanId, setSelectedActionPlanId] = useState(0);

  const data = useSelector(
    (state) => state.negosiasiRPMQualityAssurance.objData
  );
  const dataContent = useSelector(
    (state) => state.negosiasiRPMQualityAssurance.objDataContent
  );
  const dataActionPlan = useSelector(
    (state) => state.negosiasiRPMQualityAssurance.objDataActionPlan
  );
  const payload = useSelector(
    (state) => state.negosiasiRPMQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.negosiasiRPMQualityAssurance.validationErrors
  );

  const { user } = useUser();
  const { objectAuditDetailRPM } = useObjectAuditDetailRPM({
    id: params?.kkpt_id,
    module: "qa",
  });
  const { rekomendasiList, rekomendasiListMutate } = useRekomendasiList({
    id: params?.id,
    module: "qa",
    kkpt_id: params?.kkpt_id,
  });
  const { actionPlan } = useActionPlan({
    id: selectedActionPlanId,
    module: "qa",
  });
  // const { negosiasiDetail } = useNegosiasiDetail({
  //   id: selectedActionPlanId,
  //   module: "qa",
  // });

  useEffect(() => {
    setTimeout(() => {
      setIsDisabled(!(payload?.alasan && payload?.metode_nego?.kode));
    }, 1000);
  }, [payload]);

  useEffect(() => {
    if (!router.isReady) return;
    const { id, kkpt_id } = router.query;
    setParams({
      id,
      kkpt_id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (objectAuditDetailRPM?.data) {
      const kkptInfo = objectAuditDetailRPM?.data?.kkpt;
      const projectInfo = objectAuditDetailRPM?.data?.project;
      const mappingContent = {
        object: {
          id: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_id,
          name: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit
            ?.project_name,
        },
        survey:
          kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.project_survey?.project_survey_id,
        uker: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.mapa_uker,
      };

      const isPIC = projectInfo?.pic_nego?.pn === user?.data?.pn;

      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "RPM", path: "/rpm" },
        { name: "Overview", path: "/rpm/quality-assurance" },
        {
          name: projectInfo?.project_id?.toUpperCase(),
          path: `/rpm/quality-assurance/${params?.id}/overview`,
        },
        {
          name: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_id,
          path: baseUrl,
        },
      ]);

      setIsPIC(isPIC);
      dispatch(setObjDataContent(mappingContent));
    } else {
      setIsPIC(false);
      dispatch(resetObjDataContent());
      setBreadcrumbs([]);
    }
  }, [objectAuditDetailRPM, user]);

  useEffect(() => {
    if (rekomendasiList?.data?.rekomendasi?.rekomendasi?.length) {
      const mapping = rekomendasiList?.data?.rekomendasi?.rekomendasi?.map(
        (rekomendasi) => {
          return {
            ..._.pick(rekomendasi, ["id", "nama"]),
            role: "parent",
            children: rekomendasi?.action_plan?.length
              ? rekomendasi?.action_plan?.map((action_plan) => {
                  return {
                    ..._.pick(action_plan, ["id", "nama"]),
                    pic: action_plan?.maker_evaluator,
                    status:
                      action_plan?.status_action_plan === "On Nego"
                        ? "on nego"
                        : action_plan?.status_action_plan === "On Evaluator"
                        ? "on evaluator"
                        : "",
                    hasil_evaluasi: action_plan?.hasil_evaluasi,
                    role: "child",
                  };
                })
              : [],
          };
        }
      );
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
    setExpansionMap({});
  }, [rekomendasiList]);

  useEffect(() => {
    if (actionPlan?.data) {
      const kkptInfo = actionPlan?.data?.rekomendasi_kkpt;
      dispatch(
        setObjDataActionPlan({
          object: {
            id: kkptInfo?.kkpa?.mapa_project_audit?.project_id,
            name: kkptInfo?.kkpa?.mapa_project_audit?.project_name,
          },
          uker: kkptInfo?.kkpa?.mapa_project_audit?.mapa_uker,
          rekomendasi: {
            ..._.pick(kkptInfo, ["nama", "description"]),
          },
          action_plan: {
            ..._.pick(actionPlan?.data?.action_plan_kkpt, ["name"]),
          },
          deadline: actionPlan?.data?.batas_waktu,
        })
      );
    } else {
      dispatch(resetObjDataActionPlan());
    }
  }, [actionPlan]);

  useEffect(() => {
    if (payload?.metode_nego?.kode) {
      const responseActionPlan = actionPlan?.data;
      const responseKkpt = actionPlan?.data?.rekomendasi_kkpt;
      const mappingPayload = {
        ...payload,
        action_plan: responseActionPlan?.action_plan_kkpt?.name,
        tipe_rekomendasi: { ..._.pick(responseKkpt, ["kode", "nama"]) },
        deskripsi_rekomendasi: responseKkpt?.description,
      };
      let objPayload;
      switch (payload?.metode_nego?.kode) {
        case "1":
          objPayload = {
            ...mappingPayload,
          };
          break;
        case "2":
          objPayload = {
            ..._.omit(mappingPayload, ["action_plan"]),
          };
          break;
        case "3":
          objPayload = {
            ..._.omit(mappingPayload, [
              "action_plan",
              "tipe_rekomendasi",
              "deskripsi_rekomendasi",
            ]),
          };
          break;
      }
      dispatch(setObjPayload(objPayload));
      dispatch(resetValidationErrors());
    } else {
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
    }
  }, [payload?.metode_nego?.kode]);

  // [ START ] handler for table rekomendasi
  const handleClickInisiasiNegosiasi = (id) => {
    setSelectedActionPlanId(id);
    setShowModalInisiasiNegosiasi(true);
  };

  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };
  // [ END ] handler for table rekomendasi

  // [ START ] handler for modal inisiasi negosiasi
  const handleCloseModalInisiasiNegosiasi = async () => {
    const confirm = await confirmationSwal(
      "Apakah anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setCurrentModalStage(1);
    setShowModalInisiasiNegosiasi(false);
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
  };

  const handlePrevStage = async () => {
    setCurrentModalStage(currentModalStage - 1);
  };

  const handleNextStage = async () => {
    setCurrentModalStage(currentModalStage + 1);
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleSubmit = async () => {
    const responseKkptInfo = actionPlan?.data;
    const objData = {
      action_plan_id: selectedActionPlanId,
      alasan: payload?.alasan,
      metode_nego: payload?.metode_nego,
    };
    let objPayload;
    switch (payload?.metode_nego?.kode) {
      case "3":
        objPayload = {
          ...objData,
          rekomendasi_kkpt: {
            kode: payload?.tipe_rekomendasi?.kode,
            nama: payload?.tipe_rekomendasi?.nama,
            description: payload?.deskripsi_rekomendasi,
            kkpa: responseKkptInfo?.rekomendasi_kkpt?.kkpa,
          },
          action_plan_kkpt: {
            name: payload?.action_plan,
            batas_waktu: payload?.deadline,
          },
        };
        break;
      case "2":
        objPayload = {
          ...objData,
          rekomendasi_kkpt: responseKkptInfo?.rekomendasi_kkpt,
          action_plan_kkpt: {
            ..._.pick(responseKkptInfo?.action_plan_kkpt, ["prev_id", "id"]),
            nama: payload?.action_plan,
            batas_waktu: payload?.deadline,
          },
        };
        break;
      case "1":
        objPayload = {
          ...objData,
          rekomendasi_kkpt: responseKkptInfo?.rekomendasi_kkpt,
          action_plan_kkpt: {
            ..._.pick(responseKkptInfo?.action_plan_kkpt, [
              "prev_id",
              "id",
              "name",
              "description",
            ]),
            batas_waktu: payload?.deadline,
          },
        };
        break;
    }

    const schema = {
      1: perpanjanganDeadlineSchema,
      2: penggantianActionPlanSchema,
      3: penggantianRekomendasiSchema,
    };

    const schemaMappings = {
      schema: schema[parseInt(payload?.metode_nego?.kode)],
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };

    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      const confirm = await confirmationSwal(
        "Apakah anda yakin ingin melakukan negosiasi terhadap action plan ini? Karena data negosiasi ini tidak dapat dirubah kembali setelah anda mengajukan negosiasi"
      );
      if (!confirm.value) {
        return;
      }

      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/rekomendasi/nego/inisiasi`,
        objPayload
      );

      rekomendasiListMutate();
      dispatch(resetObjPayload());
      dispatch(resetValidationErrors());
      setShowModalInisiasiNegosiasi(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal inisiasi negosiasi

  // [ START ] handler for modal edit reason
  const handleCloseModalEditReason = () => {
    setShowModalEditReason(false);
  };

  const handleClickEditReason = () => {
    setShowModalEditReason(true);
  };

  const handleSubmitEditReason = (value) => {
    handleChangePayload("alasan", value);
    setShowModalEditReason(false);
  };
  // [ START ] handler for modal edit reason

  return (
    <LandingLayoutRPM
      module_page={"quality-assurance"}
      module_data={"qa"}
      withObjectAuditInfo
      withMenu
    >
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex gap-3 items-center mb-7">
        <ButtonIconBack backUrl={baseUrl} />
        <PageTitle text="Negosiasi Overview" />
      </div>
      <div className="flex flex-col gap-4 w-[68rem]">
        <CardContentRekomendasi data={dataContent} />
        <TableRekomendasi
          data={data}
          isPIC={isPIC}
          expansionMap={expansionMap}
          baseUrl={baseUrl}
          handleToggleExpansion={handleToggleExpansion}
          handleClickInisiasiNegosiasi={handleClickInisiasiNegosiasi}
        />
      </div>
      <ModalInisiasiNegosiasi
        showModal={showModalInisiasiNegosiasi}
        data={dataActionPlan}
        payload={payload}
        currentModalStage={currentModalStage}
        isDisabled={isDisabled}
        maxStage={2}
        validation={validation}
        handleCloseModal={handleCloseModalInisiasiNegosiasi}
        handlePrevStage={handlePrevStage}
        handleNextStage={handleNextStage}
        handleClickEditReason={handleClickEditReason}
        handleChangePayload={handleChangePayload}
        handleSubmitForm={handleSubmit}
      />
      <ModalDescription
        isEdit
        headerText={"Alasan Negosiasi"}
        showModal={showModalEditReason}
        handleCloseModal={handleCloseModalEditReason}
        data={payload?.alasan || ""}
        handleSubmit={handleSubmitEditReason}
      />
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;
