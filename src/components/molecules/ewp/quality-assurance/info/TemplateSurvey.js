import { ButtonField, ButtonIcon, Card } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import {
  CardContent,
  CardContentHeaderFooter,
  CustomSelect,
} from "@/components/molecules/commons";
import { useTemplateSurvey } from "@/data/reference";
import Link from "next/link";
import { useEffect, useState } from "react";

const TemplateSurvey = ({
  data,
  baseUrl,
  handleChange,
  handleReset,
  handleClickSave,
}) => {
  const [optionTemplateSurvey, setOptionTemplateSurvey] = useState([]);

  const { templateSurvey } = useTemplateSurvey("list", "QA");

  useEffect(() => {
    if (templateSurvey?.data?.length) {
      const mapping = templateSurvey?.data?.map((template) => {
        const { id, judul, deskripsi } = template;
        return {
          label: judul,
          value: {
            id,
            judul,
            deskripsi,
          },
        };
      });
      setOptionTemplateSurvey(mapping);
    } else {
      setOptionTemplateSurvey([]);
    }
  }, [templateSurvey]);

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <div className="px-4 py-2 w-full">
          <CardContentHeaderFooter
            header={
              <div className="p-3">
                <p className="font-semibold text-sm">Template Kuestioner</p>
              </div>
            }
          >
            <div className="py-3 px-4 flex flex-col gap-3">
              <p className="text-sm font-semibold">
                Template Kuestioner Survey*
              </p>
              <div className="flex gap-3 items-center">
                <div className="w-64">
                  <CustomSelect
                    optionValue={optionTemplateSurvey}
                    customIcon={
                      <ButtonIcon
                        icon={<IconClose />}
                        handleClick={handleReset}
                      />
                    }
                    selectedValue={
                      data?.id
                        ? {
                            label: data?.judul,
                            value: data,
                          }
                        : null
                    }
                    handleChange={(e) => handleChange(e.value)}
                  />
                </div>
                <Link
                  className={`rounded hover:bg-hover-blue bg-atlasian-blue-light font-medium text-base hover:no-underline no-underline hover:text-white text-white w-36 h-10 flex justify-center items-center ${
                    data?.id
                      ? `cursor-pointer`
                      : `hover:cursor-not-allowed pointer-events-none opacity-20`
                  }`}
                  href={baseUrl}
                  target="_blank"
                >
                  Preview Template
                </Link>
              </div>
              <p className="text-sm font-semibold">Deskripsi</p>
              <CardContent>
                <div className="min-h-[2rem]">{data?.deskripsi || ""}</div>
              </CardContent>
            </div>
          </CardContentHeaderFooter>
        </div>
      </Card>
      <div className="flex justify-end">
        <div
          className={`rounded ${
            !data?.id ? `bg-atlasian-gray-light` : `bg-atlasian-green`
          } w-fit`}
        >
          <ButtonField
            text="Simpan"
            disabled={!data?.id}
            handler={handleClickSave}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateSurvey;
