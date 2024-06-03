import { Card, DivButton } from "@/components/atoms";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageReview } from "@/helpers/imagesUrl";

const CardContentActionPlan = ({
  dataContent,
  handleClickOpenModalTanggapan,
  children,
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-4 w-full py-2 px-4">
        <CardContentHeaderFooter>
          <div className="flex">
            <div className="max-h-[12rem] overflow-y-scroll w-full p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <div className="text-sm text-brisma font-bold">
                  REKOMENDASI :
                </div>
                <div className="text-sm text-atlasian-red">
                  {dataContent?.rekomendasi?.nama ? (
                    <span className="font-semibold">
                      {dataContent?.rekomendasi?.nama} -{" "}
                      {dataContent?.rekomendasi?.description}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-sm text-brisma">
                  <span className="font-bold">ACTION PLAN</span> :{" "}
                  {dataContent?.action_plan}
                </div>
              </div>
            </div>
            <DivButton
              className="w-36 border-l-2 border-neutral-200 flex items-center justify-center hover:bg-gray-100"
              handleClick={handleClickOpenModalTanggapan}
            >
              <Image alt="" src={ImageReview} height={30} width={30} />
              <div className="text-sm font-bold">Tanggapan</div>
            </DivButton>
          </div>
        </CardContentHeaderFooter>
        {children}
      </div>
    </Card>
  );
};

export default CardContentActionPlan;
