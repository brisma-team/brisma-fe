import {
  Breadcrumbs,
  DivButton,
  LinkIcon,
  PageTitle,
} from "@/components/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IconArrowLeft } from "@/components/icons";
import { LayoutSurveyReference } from "@/layouts/reference";
import { CardContentHeaderFooter } from "@/components/molecules/commons";
import { useSimulasi } from "@/data/reference/admin-survey/simulasi";
import _ from "lodash";

const index = () => {
  const router = useRouter();
  const { id } = useRouter().query;

  const [totalDetail, setTotalDetail] = useState({
    total_sample: 0,
    total_responden: 0,
  });

  const [dataSimulasi, setDataSimulasi] = useState([]);
  const [dataFormula, setDataFormula] = useState([]);
  const [dataScore, setDataScore] = useState({});
  const [dataScoreKeys, setDataScoreKeys] = useState([]);

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Reference", path: "/reference" },
    { name: "Form Survei", path: "/reference/survey/overview" },
    {
      name: "Simulasi",
      path: `/reference/survey/overview/${id}/simulasi`,
    },
  ];

  const { simulasi } = useSimulasi({ id });

  useEffect(() => {
    if (simulasi?.data?.simulasi?.length) {
      const mappingSimulasi = simulasi?.data?.simulasi?.map((v) => {
        const { id, jumlah_responden, simulasi_jawaban } = v;
        return {
          id,
          jumlah_responden,
          simulasi_jawaban,
        };
      });
      setDataSimulasi(mappingSimulasi);
    } else {
      setDataSimulasi([]);
    }

    if (simulasi?.data?.formula?.length) {
      const mappingFormula = simulasi?.data?.formula?.map((v) => {
        const { judul, formula } = v;
        return {
          judul,
          formula,
        };
      });
      setDataFormula(mappingFormula);
    } else {
      setDataFormula([]);
    }

    if (simulasi?.data?.score?.length) {
      const objData = Object.keys(
        _.omit(simulasi?.data?.score[0], ["id", "createdAt"])
      );
      setDataScoreKeys(objData);
      setDataScore(simulasi?.data?.score[0]);
    } else {
      setDataScoreKeys([]);
      setDataScore({});
    }
  }, [simulasi]);

  useEffect(() => {
    if (dataSimulasi?.length) {
      const result = dataSimulasi.reduce(
        (accumulator, current) => {
          if (current.simulasi_jawaban.length > 0) {
            accumulator.total_sample += 1;
          }
          accumulator.total_responden += current.jumlah_responden;
          return accumulator;
        },
        { total_sample: 0, total_responden: 0 }
      );
      setTotalDetail(result);
    }
  }, [dataSimulasi]);

  const handleSelectedKuestioner = (simulasi_id) => {
    router.push(`/reference/survey/overview/${id}/simulasi/${simulasi_id}`);
  };

  return (
    <LayoutSurveyReference withoutRightSidebar>
      <div className="w-[71rem] max-h-screen overflow-y-scroll pb-16">
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-3 items-center">
              <LinkIcon
                href={`/reference/survey/overview/${id}/rumus`}
                icon={
                  <div className="rounded-full border-2 border-atlasian-blue-light text-atlasian-blue-light w-6 h-6 flex items-center justify-center">
                    <IconArrowLeft size="medium" />
                  </div>
                }
              />
              <PageTitle text={"Simulasi Penilaian"} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <CardContentHeaderFooter
              header={
                <div className="px-3 py-2">
                  <p className="text-base font-semibold">Pengaturan Simulasi</p>
                </div>
              }
              className={"mb-2"}
            >
              <div className="flex flex-col gap-3 p-4">
                <CardContentHeaderFooter>
                  <div className="px-3 py-2 min-h-[8rem] max-h-[8rem] overflow-y-scroll w-full">
                    {dataFormula.length
                      ? dataFormula?.map((v, i) => {
                          return (
                            <p className="text-base" key={i}>
                              {v.judul}: {v.formula}
                            </p>
                          );
                        })
                      : ""}
                  </div>
                </CardContentHeaderFooter>
                <CardContentHeaderFooter>
                  <div className="flex">
                    <div className="border-r-2 pb-4 pt-2 px-4 w-2/5">
                      <p className="text-base font-semibold">Hasil Simulasi</p>
                      <div className="mt-2 border-2">
                        <div className="flex border-b-2">
                          <div className="w-4/5 border-r-2 font-semibold p-2">
                            Total Sample Kuestioner
                          </div>
                          <div className="w-1/5 text-center py-2">
                            {totalDetail.total_sample}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-4/5 border-r-2 font-semibold p-2">
                            Total Responden
                          </div>
                          <div className="w-1/5 text-center py-2">
                            {totalDetail.total_responden}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 w-3/5 min-h-[9.875rem] max-h-[9.875rem] overflow-y-scroll">
                      {dataScoreKeys.length
                        ? dataScoreKeys?.map((v, i) => {
                            return (
                              <p className="font-medium text-base" key={i}>
                                {v}: {dataScore[v]}
                              </p>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                </CardContentHeaderFooter>
              </div>
            </CardContentHeaderFooter>
            <CardContentHeaderFooter
              header={
                <div className="p-3 py-2">
                  <p className="font-semibold text-base">Sample Kuestioner</p>
                </div>
              }
            >
              <div className="p-4 grid grid-cols-5 gap-3">
                {dataSimulasi?.length
                  ? dataSimulasi?.map((v, i) => {
                      return (
                        <DivButton
                          key={i}
                          handleClick={() => handleSelectedKuestioner(v.id)}
                        >
                          <CardContentHeaderFooter
                            footer={
                              <div
                                className={`py-2 rounded-b-lg ${
                                  v.simulasi_jawaban.length
                                    ? `bg-green-200`
                                    : `bg-red-200`
                                }`}
                              >
                                <p className="text-xs font-semibold text-center">
                                  {v.simulasi_jawaban.length
                                    ? `SUDAH`
                                    : `BELUM`}{" "}
                                  TERISI
                                </p>
                              </div>
                            }
                          >
                            <div className="p-3">
                              <p className="text-base font-bold">
                                Kuestioner {i + 1}
                              </p>
                              <p className="text-sm">
                                Simulasi Responden: {v.jumlah_responden}
                              </p>
                            </div>
                          </CardContentHeaderFooter>
                        </DivButton>
                      );
                    })
                  : ""}
              </div>
            </CardContentHeaderFooter>
          </div>
        </div>
      </div>
    </LayoutSurveyReference>
  );
};

export default index;
