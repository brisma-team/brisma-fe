import { Card, DivButton } from "@/components/atoms";
import ContentUploadSampleCSV from "./ContentUploadSampleCSV";
import ContentPickSampleCSV from "./ContentPickSampleCSV";
import ContentExistingSampleCSV from "./ContentExistingSampleCSV";
import ContentHistorySampleCSV from "./ContentHistorySampleCSV";
import { useSamplePoolMapaEWP } from "@/data/ewp/konvensional/mapa/analisis-perencanaan";
import { useRouter } from "next/router";
const SubModalPickDataCSV = ({
  currentSubModalStage,
  setCurrentSubModalStage,
  isSelectedSamplePool,
  setIsSelectedSamplePool,
  selectedRiskIssue,
}) => {
  const { id } = useRouter().query;
  const classNavbar = `font-semibold text-base z-10 flex justify-center pb-1`;
  const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;

  const { samplePoolMapaEWP, samplePoolMapaEWPMutate } = useSamplePoolMapaEWP(
    "sample_csv",
    {
      id,
      mapa_uker_mcr_id: selectedRiskIssue,
    }
  );

  return (
    <Card>
      <div className="w-full">
        {isSelectedSamplePool ? (
          <div className="gap-4 flex mt-2 px-4">
            <DivButton
              className={`${classNavbar} ${
                currentSubModalStage === 1 && classNavbarActive
              }`}
              handleClick={() => setCurrentSubModalStage(1)}
            >
              Pick Sample
            </DivButton>
            <DivButton
              className={`${classNavbar} ${
                currentSubModalStage === 2 && classNavbarActive
              }`}
              handleClick={() => setCurrentSubModalStage(2)}
            >
              History Sample
            </DivButton>
          </div>
        ) : (
          <div className="gap-4 flex mt-2 px-4">
            <DivButton
              className={`${classNavbar} ${
                currentSubModalStage === 1 && classNavbarActive
              }`}
              handleClick={() => setCurrentSubModalStage(1)}
            >
              Upload Sample Baru
            </DivButton>
            <DivButton
              className={`${classNavbar} ${
                currentSubModalStage === 2 && classNavbarActive
              }`}
              handleClick={() => setCurrentSubModalStage(2)}
            >
              Pilih Sample Pool
            </DivButton>
          </div>
        )}
        <div className="border-t border-[#00000040] w-full" />
        {/* Content Modal */}
        {isSelectedSamplePool ? (
          currentSubModalStage === 1 ? (
            <ContentPickSampleCSV />
          ) : (
            <ContentHistorySampleCSV />
          )
        ) : currentSubModalStage === 1 ? (
          <ContentUploadSampleCSV isSelectedSamplePool={isSelectedSamplePool} />
        ) : (
          <ContentExistingSampleCSV
            data={samplePoolMapaEWP?.data}
            setCurrentSubModalStage={setCurrentSubModalStage}
            setIsSelectedSamplePool={setIsSelectedSamplePool}
          />
        )}
      </div>
    </Card>
  );
};

export default SubModalPickDataCSV;
