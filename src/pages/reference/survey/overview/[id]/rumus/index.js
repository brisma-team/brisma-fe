import {
  Breadcrumbs,
  ButtonField,
  Card,
  LinkIcon,
  PageTitle,
} from "@/components/atoms";
import LayoutSurveyReference from "@/layouts/reference/LayoutSurveyReference";
import { useRouter } from "next/router";
import { IconArrowLeft } from "@/components/icons";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import MonacoEditor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { errorSwal, fetchApi } from "@/helpers";
import {
  useInformation,
  useFormula,
} from "@/data/reference/admin-survey/informasi";

const index = () => {
  const { id } = useRouter().query;
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Reference", path: "/reference" },
    { name: "Form Survei", path: "/reference/survey/overview" },
    {
      name: "Rumus Nilai",
      path: `/reference/survey/overview/${id}/rumus`,
    },
  ];

  const editorRef = useRef(null);
  const [formula, setFormula] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const { information, informationError } = useInformation({ id });
  const { formulaTemplate } = useFormula({ id });

  useEffect(() => {
    if (!informationError) {
      setIsDisabled(information?.data?.status_persetujuan !== "On Progress");
    }
  }, [information]);

  useEffect(() => {
    if (formulaTemplate?.data?.length) {
      let hasil = "";
      formulaTemplate?.data?.forEach((item, index) => {
        hasil += `${item.judul}: ${item.formula}`;
        if (index < formulaTemplate.data.length - 1) {
          hasil += "\n~\n";
        }
      });

      setFormula(hasil);
    } else {
      setFormula("");
    }
  }, [formulaTemplate]);

  // [ START ] Handler for form formula
  const handleClickAggregateFunction = (value) => {
    const editor = editorRef.current;

    if (editor) {
      const currentPosition = editor.getPosition();
      const currentModel = editor.getModel();

      // Mendapatkan posisi kursor
      const lineContent = currentModel.getLineContent(
        currentPosition.lineNumber
      );
      const column = currentPosition.column;

      // Menambahkan SUM() di posisi kursor tanpa mengganti kata sebelumnya
      const newText =
        lineContent.slice(0, column - 1) +
        `${value}()` +
        lineContent.slice(column - 1);

      // Memperbarui teks di model editor
      const newLines = currentModel.getLinesContent();
      newLines[currentPosition.lineNumber - 1] = newText;
      const newContent = newLines.join("\n");
      currentModel.setValue(newContent);

      // Memindahkan kursor ke posisi yang sesuai setelah SUM()
      editor.setPosition({
        lineNumber: currentPosition.lineNumber,
        column: column + value.length + 2,
      });
    }
  };

  const handleChangeFormula = (value) => {
    setFormula(value);
  };

  const handleSaveFormula = async (isTestFormula) => {
    const lines = formula.split("~").map((line) => line.trim());
    try {
      let path = "";
      let errorIndex;

      if (lines?.length && !lines[0]) {
        await errorSwal(`Silahkan masukkan formula!`);
        return;
      }

      const payload = {
        template_id: id,
        data: await Promise.all(
          lines.map(async (line, index) => {
            if ((line.match(/:/g) || []).length !== 1) {
              await errorSwal(`Format pada formula ${index + 1} tidak sesuai.`);
              return;
            }

            const [judul, formula] = line.split(":").map((item) => item.trim());
            if (!judul || !formula) {
              errorIndex = index + 1;
              return;
            }
            const lowercaseFormula = formula.toLocaleLowerCase();
            const formattedFormula = lowercaseFormula
              .replace(/arraySum/gi, "arraySum")
              .replace(/arrayAvg/gi, "arrayAvg");

            return {
              judul,
              formula: formattedFormula,
            };
          })
        ),
      };

      const isDataValid = payload.data.every(
        (item) =>
          item &&
          typeof item === "object" &&
          "judul" in item &&
          "formula" in item
      );

      if (errorIndex) {
        await errorSwal(`Format pada formula ${errorIndex} tidak sesuai.`);
        return;
      }
      if (!isDataValid) {
        await errorSwal(
          `Silahkan masukkan formula yang benar sesuai dengan aturan yang telah dibuat.`
        );
        return;
      }

      if (isTestFormula) path = `/test`;

      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/formula${path}`,
        payload
      );
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleEditorDidMount = (editor) => {
    // Menyimpan instance editor untuk digunakan nanti
    editorRef.current = editor;
  };
  // [ END ] Handler for form formula

  return (
    <LayoutSurveyReference overflowY={true} withoutRightSidebar={true}>
      <div className="w-[71rem] pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <LinkIcon
                href={`/reference/survey/overview/${id}`}
                icon={
                  <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-6 h-6 flex items-center justify-center">
                    <IconArrowLeft size="medium" />
                  </div>
                }
              />
              <PageTitle text={"Rumus Nilai Template"} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-[50rem]">
              <Card>
                <div className="px-4 py-2 flex justify-between w-full">
                  <div className="leading-3">
                    <p className="font-semibold">Jenis Template</p>
                    <p>{information?.data?.jenis_survey_name || "-"}</p>
                  </div>
                  <div className="leading-3">
                    <p className="font-semibold">Total Kategori</p>
                    <p>{information?.data?.total_kategori || "0"}</p>
                  </div>
                  <div className="leading-3">
                    <p className="font-semibold">Total Soal</p>
                    <p>{information?.data?.total_pertanyaan || "0"}</p>
                  </div>
                  <div className="leading-3">
                    <p className="font-semibold">Total Bobot Soal</p>
                    <p>{information?.data?.total_bobot_pertanyaan || "0"}</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex gap-3 h-full">
              <CardContentHeaderFooter
                width={"w-[50rem]"}
                className={"overflow-hidden"}
              >
                <MonacoEditor
                  height="68vh"
                  defaultValue={formula || `// Enter the formula here`}
                  onChange={handleChangeFormula}
                  onMount={handleEditorDidMount}
                />
              </CardContentHeaderFooter>
              <div className="w-56 flex flex-col gap-2.5">
                <div className="h-fit">
                  <CardContentHeaderFooter
                    header={
                      <div className="px-4 py-2 flex items-center">
                        <p className="font-semibold text-base">Fungsi</p>
                      </div>
                    }
                  >
                    <div className="p-2.5 flex flex-wrap gap-2.5">
                      <div className="rounded w-24 bg-atlasian-blue-light">
                        <ButtonField
                          text="Avg"
                          handler={() => handleClickAggregateFunction("AVG")}
                        />
                      </div>
                      <div className="rounded w-24 bg-atlasian-blue-light">
                        <ButtonField
                          text="Sum"
                          handler={() => handleClickAggregateFunction("SUM")}
                        />
                      </div>
                      <div className="rounded w-24 bg-atlasian-blue-light">
                        <ButtonField
                          text="Count"
                          handler={() => handleClickAggregateFunction("COUNT")}
                        />
                      </div>
                      <div className="rounded w-24 bg-atlasian-blue-light">
                        <ButtonField
                          text="ArrayAvg"
                          handler={() =>
                            handleClickAggregateFunction("arrayAvg")
                          }
                        />
                      </div>
                      <div className="rounded w-24 bg-atlasian-blue-light">
                        <ButtonField
                          text="ArraySum"
                          handler={() =>
                            handleClickAggregateFunction("arraySum")
                          }
                        />
                      </div>
                    </div>
                  </CardContentHeaderFooter>
                </div>
                <div className="h-fit">
                  <CardContentHeaderFooter
                    header={
                      <div className="px-4 py-2 flex items-center">
                        <p className="font-semibold text-base">Aksi</p>
                      </div>
                    }
                  >
                    <div className="p-2.5 flex flex-col gap-2.5 items-center">
                      {/* <div className="rounded w-28 bg-atlasian-purple">
                        <ButtonField
                          text="Simulasi"
                          handler={() => console.log("download")}
                        />
                      </div> */}
                      <div
                        className={`rounded w-28 ${
                          isDisabled
                            ? `bg-atlasian-gray-light`
                            : `bg-atlasian-green`
                        }`}
                      >
                        <ButtonField
                          disabled={isDisabled}
                          text="Simpan"
                          handler={async () => await handleSaveFormula(false)}
                        />
                      </div>
                      <div className="rounded w-28 bg-atlasian-yellow">
                        <ButtonField
                          text="Test"
                          handler={async () => await handleSaveFormula(true)}
                        />
                      </div>
                    </div>
                  </CardContentHeaderFooter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </LayoutSurveyReference>
  );
};

export default index;
