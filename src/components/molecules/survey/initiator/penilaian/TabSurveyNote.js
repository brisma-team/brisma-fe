import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { useSelector } from "react-redux";

const TabSurveyNote = () => {
  const data = useSelector((state) => state.penilaianSurvey.objData);

  return (
    <CardContentHeaderFooter
      header={
        <div className="py-2 px-4 text-base font-semibold w-full">
          Catatan Survei
        </div>
      }
      footer={<div className="min-h-[2rem] w-full" />}
    >
      <div className="w-full p-4 flex min-h-[13rem]">
        <p className="text-xs text-justify">{data?.catatan_penilaian}</p>
      </div>
    </CardContentHeaderFooter>
  );
};

export default TabSurveyNote;
