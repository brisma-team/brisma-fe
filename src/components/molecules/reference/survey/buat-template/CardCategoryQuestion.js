import { DivButton } from "@/components/atoms";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import CardQuestion from "./CardQuestion";

const CardCategoryQuestion = ({
  indexCategory,
  data,
  isDisabled,
  handleChangeQuestion,
  handleDeleteQuestion,
  handleClickOpenModalAddQuestion,
  handleChangeAnswer,
  handleAddAnswer,
  handleDeleteAnswer,
  handleClickOpenModalGuidelines,
}) => {
  return (
    <div
      className="w-full rounded flex flex-col items-center h-full"
      style={{
        color: token("color.text", N800),
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
      }}
    >
      <div className="w-full h-full flex justify-between border-b-2 border-neutral-200 min-h-[2.8rem]">
        <div className="py-2 px-4 text-base font-semibold w-full flex items-center">
          {data?.name || "Judul Kategori"}
        </div>
        <div>
          <DivButton
            className={`w-44 h-full text-base rounded-tr-lg flex justify-center items-center font-semibold ${
              isDisabled
                ? `text-gray-400 bg-atlasian-gray-light`
                : `text-white bg-atlasian-blue-light`
            }`}
            isDisabled={isDisabled}
            handleClick={() => handleClickOpenModalAddQuestion(indexCategory)}
          >
            Tambah Pertanyaan
          </DivButton>
        </div>
      </div>
      <div className="px-4 py-4 flex flex-col gap-4 w-full">
        {data?.pertanyaan?.length
          ? data.pertanyaan.map((kuesioner, idx) => {
              return (
                <CardQuestion
                  key={idx}
                  indexCategory={indexCategory}
                  indexQuestion={idx}
                  data={kuesioner}
                  handleChangeQuestion={handleChangeQuestion}
                  handleDeleteQuestion={handleDeleteQuestion}
                  handleChangeAnswer={handleChangeAnswer}
                  handleAddAnswer={handleAddAnswer}
                  handleDeleteAnswer={handleDeleteAnswer}
                  handleClickOpenModalGuidelines={
                    handleClickOpenModalGuidelines
                  }
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default CardCategoryQuestion;
