import { CardContentHeaderFooter } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageStar } from "@/helpers/imagesUrl";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import _ from "lodash";

const TabScore = () => {
  const data = useSelector((state) => state.penilaianSurvey.objData);
  const [formula, setFormula] = useState("");
  useEffect(() => {
    const latestData = data?.score && data?.score[0];
    const getFormula = _.omit(latestData, ["id", "createdAt"]);
    const result = Object.entries(getFormula).map(([title, value]) => ({
      title,
      value,
    }));
    setFormula(result);
  }, [data]);
  return (
    <CardContentHeaderFooter
      header={
        <div className="py-2 px-4 text-base font-semibold w-full min-h-[2rem]"></div>
      }
      footer={<div className="min-h-[2rem] w-full" />}
    >
      <div className="w-full flex min-h-[13rem]">
        <div className="w-52 flex flex-col items-center justify-center border-r-2 border-neutral-200">
          <Image src={ImageStar} alt="" width={96} height={96} />
          <p className="text-3xl font-semibold">Score</p>
        </div>
        <div className="px-5 py-8 w-full">
          <div className="w-full flex justify-between items-end">
            <div className="leading-3">
              <div className="text-sm font-medium">Hasil Survei</div>
              <div className="text-lg font-bold">
                {data?.info?.project_survey_id?.toUpperCase()}
              </div>
            </div>
            <div className="text-xs font-normal">
              Total: {data?.nilai_responden?.length || "0"} responden
            </div>
          </div>
          <div className="flex flex-col mt-2">
            {formula?.length
              ? formula.map((v, i) => {
                  return (
                    <div key={i} className="text-base text-justify">
                      {v.title} : {v.value}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </CardContentHeaderFooter>
  );
};

export default TabScore;
