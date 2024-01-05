import CardCategoryQuestion from "./CardCategoryQuestion";
import { Card, InformationDetail } from "@/components/atoms";

const TabKuesioner = ({
  isPreviewPage,
  isDisabledForm,
  isDownload,
  dataKuesioner,
  dataInformasi,
  handleChangeAnswer,
  handleClickOpenModalGuidelines,
  handleSaveAnswerPerCategory,
}) => {
  return (
    <div className="flex flex-col" id="content-doc">
      {isDownload ? (
        <div className="px-1 mb-1 h-28">
          <Card>
            <div className="w-full h-fit px-3 flex flex-col gap-2.5 ml-2 mb-2.5">
              <InformationDetail
                title={"Survei ID"}
                description={dataInformasi?.project_survey_id?.toUpperCase()}
                widthTitle={"w-40"}
              />
              <InformationDetail
                title={"Nama Survei"}
                description={dataInformasi?.nama_survey}
                widthTitle={"w-40"}
              />
              <InformationDetail
                title={"Jenis Survei"}
                description={dataInformasi?.jenis_survey_name}
                widthTitle={"w-40"}
              />
            </div>
          </Card>
        </div>
      ) : (
        ""
      )}
      {dataKuesioner?.length ? (
        dataKuesioner.map((category_quesioner, i) => {
          return (
            <CardCategoryQuestion
              key={i}
              indexCategory={i}
              isPreviewPage={isPreviewPage}
              isDisabled={isDisabledForm}
              data={category_quesioner}
              handleChangeAnswer={handleChangeAnswer}
              handleSaveAnswerPerCategory={handleSaveAnswerPerCategory}
              handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
            />
          );
        })
      ) : (
        <CardCategoryQuestion data={[]} isDisabled={true} />
      )}
    </div>
  );
};

export default TabKuesioner;
