import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { NavigationTab } from "@/components/molecules/commons";
import {
  ProgramKerja,
  TimTimeplan,
} from "@/components/molecules/ewp/konsulting/addendum/utama";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useUser from "@/data/useUser";

const index = () => {
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [params, setParams] = useState({
    id: 1,
    stage: 1,
  });
  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [isInitiator, setIsInitiator] = useState(false);

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

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()}`,
        path: `/ewp/konsulting/${params?.id}`,
      },
      {
        name: "Addendum Perencanaan Kegiatan",
        path: `/ewp/konsulting/${params?.id}/addendum`,
      },
    ]);
    setIsInitiator(
      Boolean(
        projectDetail?.data?.project_info?.initiator?.pn === user?.data?.pn
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
  };

  return (
    <LandingLayoutEWPConsulting>
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
          isCloseSubmodule={false}
          dataProjectDetail={projectDetail?.data}
        />
      ) : currentContentStage === 2 ? (
        <ProgramKerja
          id={params?.id}
          isInitiator={isInitiator}
          isCloseSubmodule={false}
          dataUser={user?.data}
        />
      ) : (
        ""
      )}
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
