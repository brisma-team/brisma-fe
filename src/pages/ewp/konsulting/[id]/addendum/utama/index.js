import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { NavigationTab } from "@/components/molecules/commons";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const index = () => {
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [params, setParams] = useState({
    id: 1,
  });
  const [currentContentStage, setCurrentContentStage] = useState(1);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  const { projectDetail } = useProjectDetail({ id: params?.id });

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
  }, [projectDetail]);

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
          width={"w-[30rem]"}
          handleChange={handleChangeTab}
        />
      </div>
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
