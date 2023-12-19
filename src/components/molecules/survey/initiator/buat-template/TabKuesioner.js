import CardCategoryQuestion from "./CardCategoryQuestion";

const TabKuesioner = ({
  data,
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
  return (
    <div className="flex flex-col" id="content-doc">
      {data?.length ? (
        data.map((category_quesioner, i) => {
          return (
            <CardCategoryQuestion
              key={i}
              indexCategory={i}
              data={category_quesioner}
              isPreviewPage={isPreviewPage}
              isDisabled={!data.length}
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
