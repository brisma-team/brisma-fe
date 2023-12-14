import { Breadcrumbs, LinkIcon, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TabRespondenGrade } from "@/components/molecules/survey/responden/kuesioner";
import { usePenilaian } from "@/data/survey/responden/penilaian";
import { useDispatch } from "react-redux";
import { setObjData } from "@/slices/survey/responden/penilaianRespondenSurvey";
import { IconArrowLeft } from "@/components/icons";
import { useSelector } from "react-redux";
import { RespondenLayoutSurvey } from "@/layouts/survey";
import { convertDate } from "@/helpers";
import { useKuesioner } from "@/data/survey/initiator/informasi";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Survei", path: "/survey" },
    { name: "Overview", path: "/survey/responden/overview" },
    {
      name: `Kuesioner`,
      path: `/survey/responden/overview/${id}/penilaian`,
    },
  ];

  const [sidebarContent, setSidebarContent] = useState([]);

  const objDataPenilaian = useSelector(
    (state) => state.penilaianRespondenSurvey.objData
  );

  const { penilaian } = usePenilaian({ id });
  const { kuesioner } = useKuesioner({ id });

  useEffect(() => {
    dispatch(setObjData(penilaian?.data));
  }, [penilaian]);

  useEffect(() => {
    const infoSurvey = kuesioner?.data?.infoSurvey;
    if (infoSurvey) {
      setSidebarContent([
        { title: "Jenis Survei", desc: infoSurvey?.jenis_survey_name },
        { title: "Status Survei", desc: infoSurvey?.status_name },
        {
          title: "Survei Dimulai",
          desc: convertDate(infoSurvey?.pelaksanaan_start, "-", "d"),
        },
        {
          title: "Survei Selesai",
          desc: convertDate(infoSurvey?.pelaksanaan_end, "-", "d"),
        },
      ]);
    }
  }, [kuesioner]);

  return (
    <RespondenLayoutSurvey
      data={kuesioner?.data?.infoSurvey}
      content={sidebarContent}
      withoutRightSidebar={true}
    >
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex gap-3 items-center">
            <LinkIcon
              href={`/survey/responden/overview`}
              icon={
                <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-6 h-6 flex items-center justify-center">
                  <IconArrowLeft size="medium" />
                </div>
              }
            />
            <PageTitle text={"Penilaian"} />
          </div>
          <div className="mt-4" />
          <TabRespondenGrade data={objDataPenilaian} />
        </div>
      </div>
      {/* End Content */}
    </RespondenLayoutSurvey>
  );
};

export default index;
