import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { NavigationTab } from "@/components/molecules/commons";
import {
  ProgramKerja,
  TableRingkasan,
  TimTimeplan,
} from "@/components/molecules/ewp/konsulting/addendum/utama";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useUser from "@/data/useUser";
import LandingLayoutEWPSBPAddendum from "@/layouts/ewp/LandingLayoutEWPSBPAddendum";
import { fetchApi, loadingSwal } from "@/helpers";

const index = () => {
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [params, setParams] = useState({
    id: 1,
    stage: 1,
  });
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [isInitiator, setIsInitiator] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [oldTimData, setOldTimData] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const { id, stage } = router.query;
    setParams({
      id,
      stage: stage ? parseInt(stage) : 1,
    });
  }, [router.isReady]);

  useEffect(() => {
    setCurrentContentStage(params.stage);
  }, [params.stage]);

  const { projectDetail } = useProjectDetail({ id: params?.id });
  const { user } = useUser();
  const pathName = `/ewp/konsulting/${params?.id}/addendum/utama`;

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/konsulting/${params?.id}/info`,
      },
      {
        name: "Addendum Perencanaan Kegiatan",
        path: `/ewp/konsulting/${params?.id}/addendum`,
      },
      {
        name: "Utama",
        path: `/ewp/konsulting/${params?.id}/addendum/utama`,
      },
    ]);
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
      )
    );
    setIsOnProgress(
      Boolean(
        projectDetail?.data?.project_info?.status_persetujuan_name ==
          "On Progress"
      )
    );
  }, [projectDetail, user]);

  const navigationTabItems = [
    { idx: 1, title: "Team & Timeplan" },
    { idx: 2, title: "Program Kerja" },
    { idx: 3, title: "Ringkasan" },
  ];

  const handleChangeTab = (index) => {
    setCurrentContentStage(index);
    router.push({
      pathname: pathName,
      query: { stage: index },
    });
  };

  const handleLoadFromMapa = async (type) => {
    loadingSwal();
    const tim = await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/load_from_mapa/${params?.id}?part=${type}`,
      {}
    );
    if (type == "tim") {
      setOldTimData(tim?.data?.tim_audit);
    }
    loadingSwal("close");
  };

  return (
    <LandingLayoutEWPSBPAddendum>
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
          width={"w-[22rem]"}
          handleChange={handleChangeTab}
        />
      </div>
      {currentContentStage === 1 ? (
        <TimTimeplan
          id={params?.id}
          isInitiator={isInitiator}
          isCloseSubmodule={!isOnProgress}
          dataProjectDetail={projectDetail?.data}
          handleLoadFromMapa={handleLoadFromMapa}
          oldDataTimTimeplan={oldTimData}
        />
      ) : currentContentStage === 2 ? (
        <ProgramKerja
          id={params?.id}
          isInitiator={isInitiator}
          isCloseSubmodule={!isOnProgress}
          dataUser={user?.data}
          handleLoadFromMapa={handleLoadFromMapa}
        />
      ) : currentContentStage === 3 ? (
        <TableRingkasan id={params?.id} />
      ) : (
        ""
      )}
      {/* End Content */}
    </LandingLayoutEWPSBPAddendum>
  );
};

export default index;
