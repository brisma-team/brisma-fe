import { Card, InformationDetail } from "@/components/atoms";
import CardCategoryQuestion from "./CardCategoryQuestion";

const TabKuesioner = ({
  isPreviewPage,
  isDisabledForm,
  isDownload,
  dataKuesioner,
  dataInformasi,
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
                title={"Template ID"}
                description={dataInformasi?.project_template_id}
                widthTitle={"w-40"}
              />
              <InformationDetail
                title={"Nama Template"}
                description={dataInformasi?.judul}
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
              data={category_quesioner}
              isPreviewPage={isPreviewPage}
              isDisabled={!dataKuesioner.length}
              isDisabledForm={isDisabledForm}
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
        <CardCategoryQuestion data={[]} isDisabled={true} />
      )}
    </div>
  );
};

export default TabKuesioner;
