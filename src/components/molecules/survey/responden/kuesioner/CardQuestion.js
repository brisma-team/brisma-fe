import {
  CheckboxField,
  DivButton,
  RadioField,
  TextAreaField,
  TextInputDecimal,
} from "@/components/atoms";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import { capitalizeEveryWord, generateAlphabet } from "@/helpers";

const CardQuestion = ({
  indexCategory,
  indexQuestion,
  isDisabled,
  data,
  totalQuestionPerCategory,
  handleChangeAnswer,
  handleClickOpenModalGuidelines,
}) => {
  return (
    <div
      className="rounded flex flex-col items-center"
      style={{
        color: token("color.text", N800),
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0.25, 0.25, 0.25, 0.25)",
      }}
    >
      <div className="w-full h-full flex justify-between items-center border-neutral-200 border-b-2 rounded-se-lg">
        <div className="py-2 px-4 w-full h-full flex items-center">
          <p className="text-base font-semibold">
            Pertanyaan : {indexQuestion + 1}/{totalQuestionPerCategory}
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-28 border-r-2 border-neutral-200 flex justify-center py-2">
          <div className="bg-atlasian-blue-light rounded-full h-10 w-10 flex justify-center items-center">
            <p className="text-white text-xl font-bold mb-1">
              {indexQuestion + 1}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 py-3 justify-center border-r-2 w-full">
          <p className="text-xl font-bold">
            {capitalizeEveryWord(data.tipe_pertanyaan_name)}
          </p>
          <div className="border-2 border-neutral-200 p-2 rounded-lg flex items-center">
            <p className="text-xs text-justify">{data.uraian}</p>
          </div>
          <div className="flex flex-col gap-4">
            {data.jawaban?.length
              ? data.jawaban.map((answer, indexAnswer) => {
                  return (
                    <div
                      key={indexAnswer}
                      className={`flex ${
                        (data.tipe_pertanyaan_kode == "1" ||
                          data.tipe_pertanyaan_kode == "4") &&
                        `gap-1.5`
                      }`}
                    >
                      {
                        // Jika tipe pertannyaan kode === 2 yang berarti tipe pertanyaannya adalah OPTIONAL
                        data.tipe_pertanyaan_kode == "2" ||
                        data.tipe_pertanyaan_kode == "3" ? (
                          <div className="w-10 h-10">
                            <div className="rounded-ss rounded-es bg-atlasian-blue-light h-full flex flex-col justify-center items-center font-bold text-white">
                              {generateAlphabet(indexAnswer).toUpperCase()}
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      }
                      {data.tipe_pertanyaan_kode == "2" ? (
                        <div className="border-y-2 border-l-2 w-10 border-neutral-200 flex justify-center items-center">
                          <RadioField
                            isDisabled={isDisabled}
                            isChecked={
                              !!data?.jawaban_user?.find(
                                (value) =>
                                  value?.jawaban_id === answer?.jawaban_id
                              )
                            }
                            value={answer.jawaban_id}
                            handleChange={(e) =>
                              handleChangeAnswer(
                                data.tipe_pertanyaan_kode,
                                e.target.value,
                                indexCategory,
                                indexQuestion,
                                indexAnswer
                              )
                            }
                          />
                        </div>
                      ) : data.tipe_pertanyaan_kode == "3" ? (
                        <div className="border-y-2 border-l-2 w-10 border-neutral-200  flex justify-center items-center">
                          <CheckboxField
                            isDisabled={isDisabled}
                            isChecked={
                              !!data?.jawaban_user?.find(
                                (value) =>
                                  value?.jawaban_id === answer?.jawaban_id
                              )
                            }
                            handleChange={(e) =>
                              handleChangeAnswer(
                                data.tipe_pertanyaan_kode,
                                e.target.checked,
                                indexCategory,
                                indexQuestion,
                                indexAnswer
                              )
                            }
                          />
                        </div>
                      ) : data.tipe_pertanyaan_kode == "4" ? (
                        <div className="w-10">
                          <TextInputDecimal
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                              borderRadius: 4,
                            }}
                            maxLength={2}
                            value={data?.jawaban_user?.[0]?.text ?? null}
                            isDisabled={isDisabled}
                            onChange={(value) =>
                              handleChangeAnswer(
                                data.tipe_pertanyaan_kode,
                                value,
                                indexCategory,
                                indexQuestion,
                                indexAnswer
                              )
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {data.tipe_pertanyaan_kode == "1" ? (
                        <TextAreaField
                          isDisabled={isDisabled}
                          className={"h-2"}
                          placeholder={"Jawaban..."}
                          handleChange={(e) =>
                            handleChangeAnswer(
                              data.tipe_pertanyaan_kode,
                              e.target.value,
                              indexCategory,
                              indexQuestion,
                              indexAnswer
                            )
                          }
                          value={data?.jawaban_user[0]?.text || ""}
                        />
                      ) : data.tipe_pertanyaan_kode == "2" ||
                        data.tipe_pertanyaan_kode == "3" ? (
                        <div className="w-full h-10 flex items-center px-2 border-2 border-neutral-200">
                          <p>{answer.text}</p>
                        </div>
                      ) : data.tipe_pertanyaan_kode == "4" &&
                        data.is_need_deskripsi ? (
                        <TextAreaField
                          value={data?.deskripsi_jawaban || ""}
                          isDisabled={isDisabled}
                          placeholder={"Deskripsi Jawaban (wajib diisi!)"}
                          handleChange={(e) =>
                            handleChangeAnswer(
                              "deskripsi jawaban",
                              e.target.value,
                              indexCategory,
                              indexQuestion,
                              indexAnswer
                            )
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })
              : ""}
          </div>
          {data.tipe_pertanyaan_kode == "4" ? (
            ""
          ) : data.is_need_deskripsi ? (
            <TextAreaField
              value={data?.deskripsi_jawaban || ""}
              isDisabled={isDisabled}
              placeholder={"Deskripsi Jawaban"}
              handleChange={(e) =>
                handleChangeAnswer(
                  "deskripsi jawaban",
                  e.target.value,
                  indexCategory,
                  indexQuestion
                )
              }
            />
          ) : (
            ""
          )}
        </div>
        <DivButton
          className={"flex w-48 flex-col p-3"}
          handleClick={() =>
            handleClickOpenModalGuidelines(indexCategory, indexQuestion)
          }
        >
          <p className="text-sm font-semibold">Guidelines</p>
          <div
            dangerouslySetInnerHTML={{
              __html: data.guideline,
            }}
          />
        </DivButton>
      </div>
    </div>
  );
};

export default CardQuestion;
