import {
  ButtonIcon,
  DivButton,
  RadioField,
  TextAreaField,
  TextInput,
  TextInputDecimal,
} from "@/components/atoms";
import { N800 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import Image from "next/image";
import { ImageGroup, ImageTrash } from "@/helpers/imagesUrl";
import { IconClose } from "@/components/icons";
import { capitalizeEveryWord, generateAlphabet } from "@/helpers";
import { DropdownCard } from "@/components/molecules/commons";

const CardQuestion = ({
  indexCategory,
  indexQuestion,
  data,
  handleChangeQuestion,
  handleDeleteQuestion,
  handleChangeAnswer,
  handleAddAnswer,
  handleDeleteAnswer,
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
            Pertanyaan : {indexQuestion + 1}/4
          </p>
        </div>
        <div className="h-full flex items-center gap-3 px-4">
          <DropdownCard
            actions={[
              {
                label: "Ubah Guideline",
                action: () =>
                  handleClickOpenModalGuidelines(
                    indexCategory,
                    indexQuestion,
                    true
                  ),
              },
            ]}
          />
          {(data.tipe_pertanyaan_kode === "2" ||
            data.tipe_pertanyaan_kode === "3") && (
            <ButtonIcon
              icon={<Image src={ImageGroup} width={20} height={20} alt="" />}
              handleClick={() => handleAddAnswer(indexCategory, indexQuestion)}
            />
          )}
          <ButtonIcon
            icon={<Image src={ImageTrash} width={20} height={20} alt="" />}
            handleClick={() =>
              handleDeleteQuestion(indexCategory, indexQuestion)
            }
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-28 border-r-2 border-neutral-200 gap-4 flex flex-col items-center py-2">
          <div className="bg-atlasian-blue-light rounded-full h-10 w-10 flex justify-center items-center">
            <p className="text-white text-xl font-bold mb-1">
              {indexQuestion + 1}
            </p>
          </div>
          <div className="w-10">
            <TextInputDecimal
              onChange={(value) =>
                handleChangeQuestion(
                  indexCategory,
                  indexQuestion,
                  "bobot",
                  value
                )
              }
              style={{
                fontWeight: "bold",
                textAlign: "center",
                borderRadius: 4,
              }}
              maxLength={2}
              value={data.bobot}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 px-4 py-3 justify-center border-r-2 w-full">
          <p className="text-xl font-bold">
            {capitalizeEveryWord(data.tipe_pertanyaan_name)}
          </p>
          {/* <div className="border border-neutral-200 p-2 rounded-lg">
            <p className="text-xs text-justify">
              Apakah pekerja di Unit Kerja Anda menunjukan perilaku sesuai nilai
              etika dalam perusahaan dan budaya korporasi (corporate value) yang
              tercermin dalam BRI One Culture (Core Values, BRILiaN Belief,
              BRILiaN Ways) serta Kode Etik perusahaan terkini? (seperti menjaga
              integritas, profersional, kolaborasi yang produktif, empati,
              jujur, tulus dan patuh terhadap peraturan yang perusahaan, dll).
            </p>
          </div> */}
          <div>
            <TextAreaField
              value={data.uraian}
              handleChange={(e) =>
                handleChangeQuestion(
                  indexCategory,
                  indexQuestion,
                  "uraian",
                  e.target.value
                )
              }
            />
          </div>
          {data.tipe_pertanyaan_kode !== "4" ? (
            <div className="border border-neutral-200 p-3 rounded-lg flex justify-between items-center w-full">
              <p className="font-semibold text-xs">
                Apakah responden wajib memberikan deskripsi dari jawaban?
              </p>
              <div className="flex gap-2">
                <RadioField
                  label={"Ya"}
                  isChecked={data.is_need_deskripsi}
                  value={true}
                  handleChange={(e) =>
                    handleChangeQuestion(
                      indexCategory,
                      indexQuestion,
                      "is_need_deskripsi",
                      JSON.parse(e.target.value)
                    )
                  }
                />
                <RadioField
                  label={"Tidak"}
                  isChecked={!data.is_need_deskripsi}
                  value={false}
                  handleChange={(e) =>
                    handleChangeQuestion(
                      indexCategory,
                      indexQuestion,
                      "is_need_deskripsi",
                      JSON.parse(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-4">
            {data.jawaban?.length
              ? data.jawaban.map((answer, indexAnswer) => {
                  return (
                    <div
                      key={indexAnswer}
                      className={`flex ${
                        data.tipe_pertanyaan_kode === "1" && `gap-1.5`
                      }`}
                    >
                      {
                        // Jika tipe pertannyaan kode === 2 yang berarti tipe pertanyaannya adalah OPTIONAL
                        data.tipe_pertanyaan_kode === "2" ||
                        data.tipe_pertanyaan_kode === "3" ? (
                          <div className="w-10 h-10">
                            <div className="rounded bg-atlasian-blue-light h-full flex flex-col justify-center items-center font-bold text-white">
                              {generateAlphabet(indexAnswer).toUpperCase()}
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      }
                      <div className="w-10">
                        <TextInputDecimal
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            borderRadius: 4,
                          }}
                          maxLength={2}
                          value={answer.bobot}
                          onChange={(value) =>
                            handleChangeAnswer(
                              indexCategory,
                              indexQuestion,
                              indexAnswer,
                              "bobot",
                              value
                            )
                          }
                        />
                      </div>
                      {data.tipe_pertanyaan_kode === "1" ? (
                        <TextAreaField className={"h-2"} isDisabled={true} />
                      ) : data.tipe_pertanyaan_kode === "2" ||
                        data.tipe_pertanyaan_kode === "3" ? (
                        <TextInput
                          value={answer.text}
                          onChange={(e) =>
                            handleChangeAnswer(
                              indexCategory,
                              indexQuestion,
                              indexAnswer,
                              "text",
                              e.target.value
                            )
                          }
                          icon={
                            <ButtonIcon
                              handleClick={() =>
                                handleDeleteAnswer(
                                  indexCategory,
                                  indexQuestion,
                                  indexAnswer
                                )
                              }
                              icon={<IconClose size="medium" />}
                            />
                          }
                        />
                      ) : (
                        <div className="border-2 border-neutral-200 px-3 rounded-se-lg rounded-ee-lg flex justify-between items-center w-full">
                          <p className="font-semibold text-xs">
                            Apakah responden wajib memberikan deskripsi dari
                            jawaban?
                          </p>
                          <div className="flex gap-2">
                            <RadioField
                              label={"Ya"}
                              isChecked={data.is_need_deskripsi}
                              value={true}
                              handleChange={(e) =>
                                handleChangeQuestion(
                                  indexCategory,
                                  indexQuestion,
                                  "is_need_deskripsi",
                                  JSON.parse(e.target.value)
                                )
                              }
                            />
                            <RadioField
                              label={"Tidak"}
                              isChecked={!data.is_need_deskripsi}
                              value={false}
                              handleChange={(e) =>
                                handleChangeQuestion(
                                  indexCategory,
                                  indexQuestion,
                                  "is_need_deskripsi",
                                  JSON.parse(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              : ""}
          </div>
          {data.is_need_deskripsi ? (
            <TextAreaField
              placeholder={"Deskripsi Jawaban"}
              isDisabled={true}
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
          <p className="text-xs text-justify">{data.guideline}</p>
        </DivButton>
      </div>
    </div>
  );
};

export default CardQuestion;
