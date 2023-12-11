import { Breadcrumbs, PageTitle } from "@/components/atoms";
import LayoutSurveyReference from "@/layouts/reference/LayoutSurveyReference";
import { useEffect, useState } from "react";
import { NavigationTab } from "@/components/molecules/commons";
import { useRouter } from "next/router";
import {
  TabScore,
  TabRespondenGrade,
  TabSurveyNote,
} from "@/components/molecules/survey/initiator/penilaian";
import { usePenilaian } from "@/data/survey/initiator/penilaian";
import { useDispatch } from "react-redux";
import { setObjData } from "@/slices/survey/initiator/penilaianSurveySlice";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Survei", path: "/survey" },
    { name: "Penilaian", path: `/survey/initiator/overview/${id}` },
  ];
  const navigationTabItems = [
    { idx: 1, title: "Score" },
    { idx: 2, title: "Catatan Survey" },
    { idx: 3, title: "Nilai Responden" },
  ];

  const [currentContentStage, setCurrentContentStage] = useState(1);

  const { penilaian } = usePenilaian({ id });

  useEffect(() => {
    dispatch(setObjData(penilaian?.data));
  }, [penilaian]);

  return (
    <LayoutSurveyReference>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <PageTitle text={"Penilaian"} />
          </div>
          <NavigationTab
            width={"w-80"}
            items={navigationTabItems}
            currentStage={currentContentStage}
            setCurrentStage={setCurrentContentStage}
          />
          {currentContentStage === 1 ? (
            <TabScore />
          ) : currentContentStage === 2 ? (
            <TabSurveyNote />
          ) : (
            <TabRespondenGrade />
          )}
        </div>
      </div>
      {/* End Content */}
    </LayoutSurveyReference>
  );
};

export default index;
