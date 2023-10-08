import { Card, DivButton } from "@/components/atoms";
import ContentUploadSampleCSV from "./ContentUploadSampleCSV";
import ContentPickSampleCSV from "./ContentPickSampleCSV";
import ContentExistingSampleCSV from "./ContentExistingSampleCSV";
import ContentHistorySampleCSV from "./ContentHistorySampleCSV";

const SubModalPickDataCSV = ({
  currentSubModalStage,
  currentModalStage,
  setCurrentSubModalStage,
  isSelectedSamplePool,
  setIsSelectedSamplePool,
  samplePoolData,
  handleClickDeleteSamplePool,
  extendRows,
  handleRowClick,
}) => {
  const classNavbar = `font-semibold text-base z-10 flex justify-center pb-1`;
  const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;

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
            <ContentPickSampleCSV
              extendRows={extendRows}
              handleRowClick={handleRowClick}
            />
          ) : (
            <ContentHistorySampleCSV />
          )
        ) : currentSubModalStage === 1 ? (
          <ContentUploadSampleCSV
            currentModalStage={currentModalStage}
            isSelectedSamplePool={isSelectedSamplePool}
            extendRows={extendRows}
            handleRowClick={handleRowClick}
          />
        ) : (
          <ContentExistingSampleCSV
            data={samplePoolData}
            setCurrentSubModalStage={setCurrentSubModalStage}
            setIsSelectedSamplePool={setIsSelectedSamplePool}
            handleClickDeleteSamplePool={handleClickDeleteSamplePool}
          />
        )}
      </div>
    </Card>
  );
};

export default SubModalPickDataCSV;
