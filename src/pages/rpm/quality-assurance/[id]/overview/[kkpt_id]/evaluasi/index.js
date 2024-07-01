import React, { useEffect, useState } from "react";
import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useObjectAuditDetailRPM } from "@/data/rpm/common";
import { useRekomendasiList } from "@/data/rpm/common/evaluasi";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjDataTeam,
  setObjDataContent,
  setObjPayload,
  resetObjData,
  resetObjDataTeam,
  resetObjDataContent,
  resetObjPayload,
} from "@/slices/rpm/quality-assurance/evaluasiRPMQualityAssuranceSlice";
import _ from "lodash";
import { TableRekomendasi } from "@/components/molecules/rpm/common/evaluasi";
import { fetchApi, infoSwal, loadingSwal, successSwal } from "@/helpers";
import useUser from "@/data/useUser";
import { CardContentRekomendasi } from "@/components/molecules/rpm/common";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
  });
  const baseUrl = `/rpm/quality-assurance/${params?.id}/overview/${params?.kkpt_id}`;

  const [isPIC, setIsPIC] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [expansionMap, setExpansionMap] = useState({});
  const [currentContentStage, setCurrentContentStage] = useState(0);

  const data = useSelector(
    (state) => state.evaluasiRPMQualityAssurance.objData
  );
  const dataTeam = useSelector(
    (state) => state.evaluasiRPMQualityAssurance.objDataTeam
  );
  const dataContent = useSelector(
    (state) => state.evaluasiRPMQualityAssurance.objDataContent
  );
  const payload = useSelector(
    (state) => state.evaluasiRPMQualityAssurance.objPayload
  );

  const { user } = useUser();
  const { objectAuditDetailRPM } = useObjectAuditDetailRPM({
    id: params?.id,
    kkpt_id: params?.kkpt_id,
    module: "qa",
  });
  const { rekomendasiList, rekomendasiListMutate } = useRekomendasiList({
    id: params?.id,
    module: "qa",
    kkpt_id: params?.kkpt_id,
    status_action_plan: "On Evaluator",
    status_persetujuan:
      currentContentStage === 1
        ? "On Progress"
        : currentContentStage === 2
        ? "On Approver"
        : "",
  });

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

      const mappingEvaluatorTeam = projectInfo?.tim_audit?.length
        ? projectInfo?.tim_audit
            ?.filter((value) => value?.title === "evaluator")
            ?.map((evaluator) => {
              const { pn, nama } = evaluator;
              return { label: `${pn} - ${nama}`, value: { pn, name: nama } };
            })
        : [];
      const isPICEvaluator = projectInfo?.pic_auditor?.pn === user?.data?.pn;

      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "RPM", path: "/rpm" },
        { name: "Overview", path: "/rpm/quality-assurance" },
        {
          name: projectInfo?.project_id?.toUpperCase(),
          path: `/rpm/quality-assurance/${params?.id}/overview`,
        },
        {
          name: kkptInfo?.kkpt_ewp?.kkpt?.kkpa?.mapa_project_audit?.project_id?.toUpperCase(),
          path: baseUrl,
        },
      ]);

      setIsPIC(isPICEvaluator);
      dispatch(setObjDataContent(mappingContent));
      dispatch(setObjDataTeam(mappingEvaluatorTeam));
    } else {
      setIsPIC(false);
      dispatch(resetObjDataContent());
      dispatch(resetObjDataTeam());
      setBreadcrumbs([]);
    }
  }, [objectAuditDetailRPM, user]);

  useEffect(() => {
    if (rekomendasiList?.data?.rekomendasi?.rekomendasi?.length) {
      const mapping = rekomendasiList?.data?.rekomendasi?.rekomendasi?.map(
        (rekomendasi) => {
          return {
            ..._.pick(rekomendasi, ["id", "nama", "description"]),
            role: "parent",
            children: rekomendasi?.action_plan?.length
              ? rekomendasi?.action_plan?.map((action_plan) => {
                  return {
                    ..._.pick(action_plan, ["id", "nama"]),
                    pic: action_plan?.maker_evaluator,
                    status:
                      action_plan?.maker_evaluator?.pn &&
                      action_plan?.status_persetujuan_evaluasi === "Final"
                        ? "final"
                        : action_plan?.maker_evaluator?.pn &&
                          action_plan?.status_persetujuan_evaluasi ===
                            "On Approver"
                        ? "on review"
                        : action_plan?.status_persetujuan_evaluasi ===
                          "On Progress"
                        ? "on evaluation"
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

  // [ START ] handler for table rekomendasi
  const handleClickPenugasan = () => {
    setCurrentContentStage(1);
    dispatch(resetObjPayload());
  };

  const handleClickReview = () => {
    setCurrentContentStage(2);
    dispatch(resetObjPayload());
  };

  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleClickCheckbox = (isChecked, action_plan_id) => {
    const newData = [...(payload?.action_plan || [])];
    if (isChecked) {
      const findId = newData.some((value) => value === action_plan_id);

      if (!findId) {
        newData.push(action_plan_id);
      }
    } else {
      const filter = newData.filter((value) => value !== action_plan_id);
      dispatch(setObjPayload({ ...payload, action_plan: filter }));
      return;
    }

    dispatch(setObjPayload({ ...payload, action_plan: newData }));
  };

  const handleClickCancel = () => {
    setCurrentContentStage(0);
    dispatch(resetObjPayload());
  };

  const handleSubmitPenugasan = async () => {
    if (!payload?.action_plan?.length) {
      await infoSwal("Silahkan pilih data action plan terlebih dahulu!");
      return;
    }
    if (!payload?.pic?.pn) {
      await infoSwal("P.I.C penugasan belum terpilih!");
      return;
    }
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/rekomendasi/action_plan/penugasan/evaluasi`,
      {
        action_plan_id: payload?.action_plan,
        maker_evaluator: {
          pn: payload?.pic?.pn,
          nama: payload?.pic?.name,
        },
      }
    );
    setCurrentContentStage(0);
    dispatch(resetObjPayload());
    rekomendasiListMutate();
    loadingSwal("close");
  };

  const handleSubmitApprove = async () => {
    if (!payload?.action_plan?.length) {
      await infoSwal("Silahkan pilih data action plan terlebih dahulu!");
      return;
    }

    loadingSwal();
    await Promise.all(
      payload?.action_plan?.map((action_plan_id) => {
        const data = {
          sub_modul: "action_plan_evaluasi",
          sub_modul_id: action_plan_id,
          url_path: `${baseUrl}/tindak-lanjut/${action_plan_id}`,
        };
        fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/approve`,
          data,
          true
        );
      })
    );
    await successSwal("Berhasil approve workflow");
    rekomendasiListMutate();
    dispatch(resetObjPayload());
    loadingSwal("close");
  };

  const handleSubmitReject = async () => {
    if (!payload?.action_plan?.length) {
      await infoSwal("Silahkan pilih data action plan terlebih dahulu!");
      return;
    }
    if (!payload?.note) {
      await infoSwal("Silahkan berikan alasan!");
      return;
    }
    loadingSwal();
    await Promise.all(
      payload?.action_plan?.map((action_plan_id) => {
        const data = {
          sub_modul: "action_plan_evaluasi",
          sub_modul_id: action_plan_id,
          url_path: `${baseUrl}/tindak-lanjut/${action_plan_id}`,
          note: payload?.note,
        };
        fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow/reject`,
          data,
          true
        );
      })
    );
    await successSwal("Berhasil reject workflow");
    rekomendasiListMutate();
    dispatch(resetObjPayload());
    loadingSwal("close");
  };
  // [ END ] handler for table rekomendasi

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
        <PageTitle text="Evaluasi Overview" />
      </div>
      <div className="flex flex-col gap-4 w-[68rem]">
        <CardContentRekomendasi data={dataContent} />
        <TableRekomendasi
          data={data}
          dataActionPlan={payload?.action_plan}
          dataTeam={dataTeam}
          payload={payload}
          isPIC={isPIC}
          expansionMap={expansionMap}
          baseUrl={baseUrl}
          currentContentStage={currentContentStage}
          handleToggleExpansion={handleToggleExpansion}
          handleSubmitPenugasan={handleSubmitPenugasan}
          handleCancel={handleClickCancel}
          handleChangePayload={handleChangePayload}
          handleClickCheckbox={handleClickCheckbox}
          handleClickPenugasan={handleClickPenugasan}
          handleClickReview={handleClickReview}
          handleSubmitApprove={handleSubmitApprove}
          handleSubmitReject={handleSubmitReject}
        />
      </div>
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;
