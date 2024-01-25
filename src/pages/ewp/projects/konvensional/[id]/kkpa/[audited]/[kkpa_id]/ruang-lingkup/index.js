import { LandingLayoutEWP } from "@/layouts/ewp";
import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useRouter } from "next/router";
import {
  CardContentHeaderFooter,
  ContentLabelValue,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { convertDate } from "@/helpers";
import { useState, useEffect } from "react";
import { useRuangLingkupKKPA } from "@/data/ewp/konvensional/kkpa/ruang-lingkup";
import {
  TableSampleCSV,
  TableSampleFile,
} from "@/components/molecules/ewp/konvensional/kkpa/ruang-lingkup";

const buttonClass =
  "hover:bg-blue-200 hover:text-atlasian-blue-dark h-12 font-semibold text-base flex items-center px-2.5";
const isActiveClass = "bg-blue-200 text-atlasian-blue-dark";

const routes = [
  {
    name: "Program Audit",
    slug: "program-audit",
  },
  {
    name: "Kriteria",
    slug: "kriteria",
  },
  { name: "Ruang Lingkup", slug: "ruang-lingkup" },
  { name: "Pengujian Sample", slug: "pengujian-sample" },
  { name: "Pengujian Kontrol", slug: "pengujian-kontrol" },
  { name: "Kesimpulan", slug: "kesimpulan" },
  { name: "Dokumen K.K.P.A", slug: "dokumen" },
];

const index = () => {
  const { id, kkpa_id } = useRouter().query;
  const pathName = `/ewp/projects/konvensional/${id}/kkpa/audited/${kkpa_id}`;
  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / KKPA`,
      path: pathName,
    },
    {
      name: "Ruang Lingkup",
      path: `${pathName}/ruang-lingkup`,
    },
  ];
  const [data, setData] = useState({});
  const [selectedSample, setSelectedSample] = useState(1);

  const { ruangLingkupKKPA } = useRuangLingkupKKPA({ kkpa_id });

  useEffect(() => {
    setData(ruangLingkupKKPA?.data);
  }, [ruangLingkupKKPA]);

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Ruang Lingkup" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/kriteria-audit"}
          nextUrl={"/pengujian-sample"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="w-10/12 flex flex-col gap-4">
        <Card>
          <div className="px-6 py-4 flex gap-3 w-full">
            <CardContentHeaderFooter className={"w-1/2"}>
              <div className="flex justify-between p-3">
                <ContentLabelValue
                  label={"Sumber Informasi"}
                  value={data?.sumber_informasi}
                />
                <ContentLabelValue
                  label={"Periode"}
                  value={
                    convertDate(data?.periode_start, "/", "d") +
                    " - " +
                    convertDate(data?.periode_end, "/", "d")
                  }
                />
                <ContentLabelValue
                  label={"Jumlah Sample"}
                  value={data?.jumlah_sample}
                />
              </div>
            </CardContentHeaderFooter>
            <CardContentHeaderFooter className={"w-1/2"}>
              <div className="flex justify-between p-3">
                <ContentLabelValue
                  label={"Tehnik Sampling"}
                  value={data?.teknik_sampling_desc}
                />
                <ContentLabelValue
                  label={"Jumlah Populasi"}
                  value={data?.jumlah_populasi}
                />
                <ContentLabelValue
                  label={"Uraian Sample"}
                  value={data?.uraian_sample}
                />
              </div>
            </CardContentHeaderFooter>
          </div>
        </Card>
        <Card>
          <div className="px-6 py-4 flex gap-3 w-full">
            <CardContentHeaderFooter
              width={"w-44"}
              header={
                <div className="h-12 flex items-center font-semibold text-xl px-2.5">
                  Daftar Sample
                </div>
              }
              footer={<div className="min-h-[1.5rem]" />}
            >
              <DivButton
                className={`${buttonClass} ${
                  selectedSample === 1 && isActiveClass
                } border-b-2`}
                handleClick={() => setSelectedSample(1)}
              >
                Sample CSV
              </DivButton>
              <DivButton
                className={`${buttonClass} ${
                  selectedSample === 2 && isActiveClass
                } border-b-2`}
                handleClick={() => setSelectedSample(2)}
              >
                Sample File
              </DivButton>
              <DivButton
                className={`${buttonClass} ${
                  selectedSample === 3 && isActiveClass
                } border-b-2`}
                handleClick={() => setSelectedSample(3)}
              >
                Sample FRD
              </DivButton>
              <DivButton
                className={`${buttonClass} ${
                  selectedSample === 4 && isActiveClass
                }`}
                handleClick={() => setSelectedSample(4)}
              >
                Sample Monber
              </DivButton>
            </CardContentHeaderFooter>
            <div className="flex flex-col gap-3">
              {selectedSample === 1 ? (
                data?.content?.csv?.length ? (
                  data?.content?.csv?.map((value, index) => {
                    const { title, directory } = value;
                    return (
                      <TableSampleCSV
                        title={title}
                        sourceUrl={directory}
                        selectedValue={value.data}
                        key={index}
                      />
                    );
                  })
                ) : (
                  ""
                )
              ) : selectedSample === 2 ? (
                data?.content?.file?.length ? (
                  <TableSampleFile data={data?.content?.file} key={index} />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </Card>
      </div>
      {/* End Content */}
    </LandingLayoutEWP>
  );
};

export default index;
