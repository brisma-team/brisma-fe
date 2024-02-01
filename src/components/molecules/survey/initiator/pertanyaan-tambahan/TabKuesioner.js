import { Card, InformationDetail } from "@/components/atoms";
import CardCategoryQuestion from "./CardCategoryQuestion";

const TabKuesioner = ({
  data,
  validation,
  dataInformasi,
  isPreviewPage,
  isDisabledForm,
  isDownload,
  isDisabledBobot,
  isDisabledDescriptionAnswer,
  handleChangeQuestion,
  handleDeleteQuestion,
  handleChangeAnswer,
  handleAddAnswer,
  handleDeleteAnswer,
  handleClickOpenModalAddQuestion,
  handleClickOpenModalGuidelines,
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
      {data?.length ? (
        data.map((category_quesioner, i) => {
          return (
            <CardCategoryQuestion
              key={i}
              indexCategory={i}
              data={category_quesioner}
              validation={validation}
              isPreviewPage={isPreviewPage}
              isDisabled={!data.length}
              isDisabledForm={isDisabledForm}
              isDisabledBobot={isDisabledBobot}
              isDisabledDescriptionAnswer={isDisabledDescriptionAnswer}
              handleChangeQuestion={handleChangeQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
              handleClickOpenModalAddQuestion={handleClickOpenModalAddQuestion}
              handleChangeAnswer={handleChangeAnswer}
              handleAddAnswer={handleAddAnswer}
              handleDeleteAnswer={handleDeleteAnswer}
              handleClickOpenModalGuidelines={handleClickOpenModalGuidelines}
            />
          );
        })
      ) : (
        <CardCategoryQuestion data={[]} isDisabled />
      )}
    </div>
  );
};

export default TabKuesioner;
