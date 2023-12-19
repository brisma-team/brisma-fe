import { useSelector } from "react-redux";
import CardCategoryQuestion from "./CardCategoryQuestion";

const TabKuesioner = ({
  isPreviewPage,
  isDisabledForm,
  handleChangeAnswer,
  handleClickOpenModalGuidelines,
  handleSaveAnswerPerCategory,
}) => {
  const dataKuesioner = useSelector(
    (state) => state.respondenAnswer.payloadKuesioner
  );

  return (
    <div className="flex flex-col gap-4" id="content-doc">
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
