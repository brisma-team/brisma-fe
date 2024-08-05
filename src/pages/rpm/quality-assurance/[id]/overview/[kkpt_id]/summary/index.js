import React, { useEffect, useState } from "react";
import { Breadcrumbs, ButtonIconBack, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useObjectAuditDetailRPM } from "@/data/rpm/common";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjDataActionPlan,
  resetObjData,
  resetObjDataActionPlan,
} from "@/slices/rpm/quality-assurance/summaryRPMQualityAssuranceSlice";
import _ from "lodash";
import {
  TableRekomendasi,
  ModalSummaryDetail,
} from "@/components/molecules/rpm/common/summary";
import useUser from "@/data/useUser";
import { useSummary } from "@/data/rpm/common/summary";
import { useActionPlan } from "@/data/rpm/common/negosiasi";
import { confirmationSwal } from "@/helpers";

const getStatusName = (
  status_action_plan,
  status_tindak_lanjut,
  status_evaluasi,
  hasil_evaluasi
) => {
  if (status_action_plan == "On Submitter") {
    if (status_tindak_lanjut == "On Progress") {
      return "On Submitter";
    } else if (status_tindak_lanjut == "On Approver") {
      return "On Review Tindak Lanjut";
    }
  } else if (status_action_plan == "On Evaluator") {
    if (status_evaluasi == "On Progress") {
      return "On Evaluator";
    } else if (status_evaluasi == "On Approver") {
      return "On Review Evaluasi";
    } else if (status_evaluasi == "Final" && hasil_evaluasi == "Memadai") {
      return "Final Evaluasi";
    } else if (status_evaluasi == "Final" && hasil_evaluasi != "Memadai") {
      return "Init Nego";
    }
  } else if (status_action_plan == "On Nego") {
    return "On Nego";
  }
};

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
    kkpt_id: 0,
  });
  const baseUrl = `/rpm/quality-assurance/${params?.id}/overview/${params?.kkpt_id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [expansionMap, setExpansionMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedActionPlanId, setSelectedActionPlanId] = useState(0);

  const data = useSelector((state) => state.summaryRPMQualityAssurance.objData);
  const dataActionPlan = useSelector(
    (state) => state.summaryRPMQualityAssurance.objDataActionPlan
  );

  const { user } = useUser();
  const { objectAuditDetailRPM } = useObjectAuditDetailRPM({
    id: params?.id,
    kkpt_id: params?.kkpt_id,
    module: "qa",
  });
  const { summary } = useSummary({
    id: params?.id,
    module: "qa",
    kkpt_id: params?.kkpt_id,
  });
  const { actionPlan } = useActionPlan({
    id: selectedActionPlanId,
    module: "qa",
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
        {
          name: "Summary",
          path: baseUrl,
        },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [objectAuditDetailRPM, user]);

  useEffect(() => {
    if (summary?.data?.rekomendasi?.rekomendasi?.length) {
      const mapping = summary?.data?.rekomendasi?.rekomendasi?.map(
        (rekomendasi) => {
          return {
            ..._.pick(rekomendasi, ["id", "nama", "description"]),
            role: "parent",
            children: rekomendasi?.action_plan?.length
              ? rekomendasi?.action_plan?.map((action_plan) => {
                  return {
                    ..._.pick(action_plan, ["id", "nama"]),
                    pic: action_plan?.maker_evaluator,
                    status: getStatusName(
                      action_plan?.status_action_plan,
                      action_plan?.status_persetujuan_tindak_lanjut,
                      action_plan?.status_persetujuan_evaluasi,
                      action_plan?.hasil_evaluasi
                    ),
                    // status:
                    //   action_plan?.maker_evaluator?.pn &&
                    //   action_plan?.status_persetujuan_evaluasi === "Final"
                    //     ? "final"
                    //     : action_plan?.maker_evaluator?.pn &&
                    //       action_plan?.status_persetujuan_evaluasi ===
                    //         "On Approver"
                    //     ? "on review"
                    //     : action_plan?.status_persetujuan_evaluasi ===
                    //       "On Progress"
                    //     ? "on evaluation"
                    //     : "",

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
  }, [summary]);

  useEffect(() => {
    if (actionPlan?.data?.catatan_negosiasi?.length) {
      const mappingCatatanNegosiasi = actionPlan?.data?.catatan_negosiasi
        ?.length
        ? actionPlan?.data?.catatan_negosiasi?.map((catatan_nego) => {
            const responseActionPlanSebelum =
              catatan_nego?.rpm_action_plan_sebelum;
            return {
              tanggal_kejadian: catatan_nego?.createdAt,
              action_plan: responseActionPlanSebelum?.action_plan_kkpt?.name,
              deadline: responseActionPlanSebelum?.batas_waktu,
              evaluasi: responseActionPlanSebelum?.hasil_evaluasi,
              negosiasi: catatan_nego?.metode_nego?.nama,
            };
          })
        : [];
      dispatch(setObjDataActionPlan(mappingCatatanNegosiasi));
    } else {
      dispatch(resetObjDataActionPlan());
    }
  }, [actionPlan, showModal]);

  // [ START ] handler for table rekomendasi
  const handleToggleExpansion = (kode, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${kode}-${role}`]: !prevState[`${kode}-${role}`],
    }));
  };

  const handleClickActionPlan = (id) => {
    setSelectedActionPlanId(id);
    setShowModal(true);
  };
  // [ END ] handler for table rekomendasi

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    dispatch(resetObjDataActionPlan());
  };

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
        <PageTitle text="Summary" />
      </div>
      <div className="flex flex-col gap-4 w-[68rem]">
        <TableRekomendasi
          data={data}
          expansionMap={expansionMap}
          baseUrl={baseUrl}
          handleToggleExpansion={handleToggleExpansion}
          handleClickActionPlan={handleClickActionPlan}
        />
      </div>
      <ModalSummaryDetail
        data={dataActionPlan}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;
