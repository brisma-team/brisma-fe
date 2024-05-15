import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuditInfo } from "@/data/ewp/common/info";
import { usePelaksanaan } from "@/data/ewp/quality-assurance/pelaksanaan";
import { TablePelaksanaan } from "@/components/molecules/ewp/quality-assurance/pelaksanaan";
import _ from "lodash";
import {
  setObjData,
  resetObjData,
} from "@/slices/ewp/quality-assurance/pelaksanaan/pelaksanaanEWPQualityAssuranceSlice";
import { useDispatch, useSelector } from "react-redux";
import { CardContentHeaderFooter } from "@/components/molecules/commons";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;
  const pathName = `${baseUrl}/pelaksanaan`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // const [isCloseSubmodule, setIsCloseSubmodule] = useState(false);
  // const [isOnProgress, setIsOnProgress] = useState(true);
  // const [isInitiator, setIsInitiator] = useState(true);

  const data = useSelector(
    (state) => state.pelaksanaanEWPQualityAssurance.objData
  );

  const { auditInfo } = useAuditInfo({ module: "qa", id: params?.id });
  const { pelaksanaan } = usePelaksanaan({
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
        name: `Pelaksanaan`,
        path: pathName,
      },
      {
        name: `Jadwal Survei`,
        path: pathName,
      },
    ]);
  }, [auditInfo]);

  useEffect(() => {
    if (pelaksanaan?.data?.length) {
      const mapping = pelaksanaan?.data?.map((project) => {
        return {
          id: project?.id,
          ewp_id: project?.mapa_project_audit?.ewp_id,
          tahun: project?.mapa_project_audit?.tahun,
          project_id: project?.mapa_project_audit?.project_id,
          judul: project?.mapa_project_audit?.project_name,
          project_survei_id: project?.project_survey?.project_survey_id,
          petugas: project?.mapa_project_audit?.mapa_project_petugas?.length
            ? project?.mapa_project_audit?.mapa_project_petugas?.map(
                (petugas) => {
                  return _.pick(petugas, ["pn", "nama"]);
                }
              )
            : [],
          status_survei: project?.project_survey?.status_name,
          mtd_tipe: project?.mapa_project_audit?.mtd_tipe,
          mtd_jenis: project?.mapa_project_audit?.mtd_jenis,
          analisa: project?.mapa_project_audit?.analisa,
        };
      });
      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [pelaksanaan]);

  return (
    <LandingLayoutEWPQualityAssurance>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-7">
        <PageTitle text="Pelaksanaan" />
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
          <TablePelaksanaan
            data={data}
            pathName={`/ewp/quality-assurance/${params?.id}`}
          />
        </div>
      </CardContentHeaderFooter>
      {/* End Content */}
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
