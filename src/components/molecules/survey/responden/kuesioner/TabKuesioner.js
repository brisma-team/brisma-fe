import { useSelector } from "react-redux";
import CardCategoryQuestion from "./CardCategoryQuestion";

const TabKuesioner = ({
  handleChangeAnswer,
  handleClickOpenModalGuidelines,
  handleSaveAnswerPerCategory,
  isDisabledForm,
}) => {
  // const dataCategory = useSelector(
  //   (state) => state.respondenAnswer.dataCategory
  // );
  const dataKuesioner = useSelector(
    (state) => state.respondenAnswer.payloadKuesioner
  );

  // const isCompleted = (categoryId) => {
  //   if (!dataKuesioner?.length) return false;
  //   const find = dataCategory?.find((category) => category.id === categoryId);
  //   return find?.is_completed;
  // };

  return (
    <div className="flex flex-col gap-4" id="content-doc">
      {dataKuesioner?.length ? (
        dataKuesioner.map((category_quesioner, i) => {
          return (
            <CardCategoryQuestion
              key={i}
              indexCategory={i}
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
