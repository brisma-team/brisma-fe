import { CardContentHeaderFooter } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageStar } from "@/helpers/imagesUrl";
import { useSelector } from "react-redux";

const TabScore = () => {
  const data = useSelector((state) => state.penilaianSurvey.objData);
  return (
    <CardContentHeaderFooter
      header={
        <div className="py-2 px-4 text-base font-semibold w-full">
          Score Survei
        </div>
      }
      footer={<div className="min-h-[2rem] w-full" />}
    >
      <div className="w-full flex min-h-[13rem]">
        <div className="w-52 flex flex-col items-center justify-center border-r-2 border-neutral-200">
          <Image src={ImageStar} alt="" width={96} height={96} />
          <p className="text-3xl font-semibold">9.8</p>
        </div>
        <div className="px-5 py-8 w-full">
          <div className="w-full flex justify-between items-end">
            <div className="leading-3">
              <div className="text-sm font-medium">Hasil Survei</div>
              <div className="text-lg font-bold">AL-2023-002</div>
            </div>
            <div className="text-xs font-normal">Total: 1.000 responden</div>
          </div>
          <p className="text-xs text-justify">
            Survei Audit Lingkungan untuk melihat tingkat kepuasan dari Auditee
            atas kinerja dari Auditor yang melakukan audit pada wilayahnya
          </p>
        </div>
      </div>
    </CardContentHeaderFooter>
  );
};

export default TabScore;
