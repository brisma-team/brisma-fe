import { useSelector } from "react-redux";
import CardCategoryQuestion from "./CardCategoryQuestion";

const TabKuesioner = ({
  isPreviewPage,
  isDisabledForm,
  handleChangeQuestion,
  handleDeleteQuestion,
  handleChangeAnswer,
  handleAddAnswer,
  handleDeleteAnswer,
  handleClickOpenModalAddQuestion,
  handleClickOpenModalGuidelines,
}) => {
  const dataKuesioner = useSelector(
    (state) => state.penilaianSurvey.payloadKuesioner
  );

  return (
    <div className="flex flex-col gap-4" id="content-doc">
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
