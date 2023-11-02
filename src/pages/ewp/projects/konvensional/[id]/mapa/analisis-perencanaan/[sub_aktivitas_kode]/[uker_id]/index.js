import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useState, useEffect } from "react";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { usePlanningAnalysisEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import {
  ModalAddRiskIssue,
  TableRiskIssue,
} from "@/components/molecules/ewp/konvensional/analisis-perencanaan/risk-issue";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setRiskIssueData,
  setRiskIssueInfo,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";

const index = () => {
  const dispatch = useDispatch();
  const { id, uker_id, sub_aktivitas_kode } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;
  const [showModalCreateRiskIssue, setShowModalCreateRiskIssue] =
    useState(false);
  const [selectedRiskIssue, setSelectedRiskIssue] = useState(null);
  const [headerTextRiskIssue, setHeaderTextRiskIssue] = useState("");
  const [typeModal, setTypeModal] = useState("");

  const riskIssueInfo = useSelector(
    (state) => state.planningAnalysisMapaEWP.riskIssueInfo
  );

  const { auditorEWP } = useAuditorEWP({ id });
  const { planningAnalysisEWP, planningAnalysisEWPMutate } =
    usePlanningAnalysisEWP("risk_issue_list", {
      id,
      uker_id,
      sub_aktivitas_kode,
    });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Analisis Perencanaan`,
      path: `/ewp/projects/konvensional/${id}/analisis-perencanaan`,
    },
    {
      name: `Set Risk Issue`,
      path: `/ewp/projects/konvensional/${id}/analisis-perencanaan/${sub_aktivitas_kode}/${uker_id}`,
    },
  ];

  useEffect(() => {
    const response = planningAnalysisEWP?.data || {};
    const header = response.header || {};
    const aktivitas = header.mapa_uker_aktivitas?.[0] || {};
    const subAktivitas =
      header.mapa_uker_aktivitas?.[0]?.mapa_uker_pic_subaktivitas?.[0] || {};

    const mappingRiskIssue = (response.data || []).map((item) => ({
      kode: item.ref_sub_major_kode,
      name: item.ref_sub_major_name,
      role: "parent",
      children: item.risk_issue.map((risk) => ({
        id: risk.id,
        uker_id: risk.mapa_uker_id,
        kode: risk.ref_risk_issue_kode,
        name: risk.ref_risk_issue_name,
        sub_aktivitas_name:
          header.mapa_uker_aktivitas?.[0]?.mapa_uker_pic_subaktivitas?.[0]
            ?.sub_name,
        sub_major_kode: item.ref_sub_major_kode,
        program_audit: Boolean(risk.program_audit),
        kriteria: Boolean(risk.kriteria),
        sample: Boolean(risk.sample),
        total_mapa_sample: risk.sample_jumlah_sample
          ? risk.sample_jumlah_sample.toString()
          : "0",
        role: "child",
      })),
    }));

    dispatch(setRiskIssueData(mappingRiskIssue));
    dispatch(
      setRiskIssueInfo({
        mapa_uker_id: header.id,
        ref_auditee_branch_kode: header.ref_auditee_branch_kode,
        ref_auditee_branch_name: header.ref_auditee_branch_name,
        ref_aktivitas_kode: aktivitas.mtd_aktivitas_kode,
        ref_aktivitas_name: aktivitas.mtd_aktivitas_name,
        ref_sub_aktivitas_kode: subAktivitas.sub_kode,
        ref_sub_aktivitas_name: subAktivitas.sub_name,
      })
    );
  }, [planningAnalysisEWP]);

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center">
        <PageTitle text="Set Risk Issue" />
        <PrevNextNavigation
          baseUrl={baseUrl}
          prevUrl={"/analisis-perencanaan"}
        />
      </div>
      <div className="mb-6 text-base">{`${riskIssueInfo?.ref_auditee_branch_name} / ${riskIssueInfo?.ref_aktivitas_name} / ${riskIssueInfo?.ref_sub_aktivitas_name}`}</div>
      <div className="w-36 rounded bg-atlasian-purple">
        <ButtonField
          handler={() => setShowModalCreateRiskIssue(true)}
          text={"Tambah Risk Issue"}
        />
        <ModalAddRiskIssue
          showModal={showModalCreateRiskIssue}
          setShowModal={setShowModalCreateRiskIssue}
          typeModal={typeModal}
          setTypeModal={setTypeModal}
          selectedRiskIssue={selectedRiskIssue}
          mutate={planningAnalysisEWPMutate}
        />
      </div>
      <div className="my-3" />
      <TableRiskIssue
        headerTextRiskIssue={headerTextRiskIssue}
        setHeaderTextRiskIssue={setHeaderTextRiskIssue}
        selectedRiskIssue={selectedRiskIssue}
        setSelectedRiskIssue={setSelectedRiskIssue}
        setTypeModal={setTypeModal}
        setShowModalCreateRiskIssue={setShowModalCreateRiskIssue}
        mutate={planningAnalysisEWPMutate}
      />
    </LandingLayoutEWP>
  );
};

export default index;
