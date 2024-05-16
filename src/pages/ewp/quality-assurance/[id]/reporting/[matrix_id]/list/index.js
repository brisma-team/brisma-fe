import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { useAuditInfo } from "@/data/ewp/common/info";
import { useListSurvey } from "@/data/ewp/quality-assurance/reporting";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/quality-assurance/reporting/listSurveyEWPQualityAssuranceSlice";
import { TableListSurvey } from "@/components/molecules/ewp/quality-assurance/reporting/list";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { listSurvey } = useListSurvey({ id: params?.id });

  const data = useSelector(
    (state) => state.listSurveyEWPQualityAssurance.objData
  );

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    { name: "Overview", path: "/ewp/quality-assurance" },
    {
      name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
      path: baseUrl + "/info",
    },
    { name: "Reporting", path: `${baseUrl}/reporting` },
    { name: "List", path: `${baseUrl}/reporting/list` },
  ];

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (listSurvey?.data?.length) {
      const mapping = listSurvey?.data?.map((project) => {
        return {
          id: project?.id,
          ewp_id: project?.kkpa?.mapa_project_audit?.ewp_id,
          tahun: project?.kkpa?.mapa_project_audit?.tahun,
          project_id: project?.kkpa?.mapa_project_audit?.project_id,
          judul: project?.kkpa?.mapa_project_audit?.project_name,
          project_survei_id: project?.kkpa?.project_survey?.project_survey_id,
          petugas: project?.kkpa?.mapa_project_audit?.mapa_project_petugas
            ?.length
            ? project?.kkpa?.mapa_project_audit?.mapa_project_petugas?.map(
                (petugas) => {
                  return _.pick(petugas, ["pn", "nama"]);
                }
              )
            : [],
          status_survei: project?.kkpa?.project_survey?.status_name,
          mtd_tipe: project?.kkpa?.mapa_project_audit?.mtd_tipe,
          jumlah_rekomendasi: project?.jumlah_rekomendasi,
          jumlah_action_plan: project?.jumlah_action_plan,
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [listSurvey]);

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Reporting Landing" />
      </div>
      {/* Start Content */}
      <CardContentHeaderFooter
        header={
          <div className="px-3 py-4">
            <p className="text-base font-semibold">Project Audit Terpilih</p>
          </div>
        }
        footer={<div className="min-h-[3rem]" />}
      >
        <div className="p-4">
          <TableListSurvey data={data} />
        </div>
      </CardContentHeaderFooter>
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
