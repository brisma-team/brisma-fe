import { LandingLayoutEWP } from "@/layouts/ewp";
import { Breadcrumbs, Card, DivButton, PageTitle } from "@/components/atoms";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useRouter } from "next/router";
import {
  CardContentHeaderFooter,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useState, useEffect } from "react";
import { usePengujianSampleKKPA } from "@/data/ewp/konvensional/kkpa/pengujian-sample";
import {
  TableSampleCSV,
  TableSampleFile,
} from "@/components/molecules/ewp/konvensional/kkpa/pengujian-sample";

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
  const { id, kkpa_id, audited } = useRouter().query;
  const pathName = `/ewp/projects/konvensional/${id}/kkpa/${audited}/${kkpa_id}`;
  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / KKPA`,
      path: pathName,
    },
    {
      name: "Pengujian Sample",
      path: `${pathName}/pengujian-sample`,
    },
  ];
  const [data, setData] = useState({});
  const [selectedSample, setSelectedSample] = useState(1);

  const { pengujianSampleKKPA } = usePengujianSampleKKPA({ kkpa_id });

  useEffect(() => {
    setData(pengujianSampleKKPA?.data);
  }, [pengujianSampleKKPA]);

  useEffect(() => {
    console.log("data => ", data);
  }, [data]);

  return (
    <LandingLayoutEWP>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-3">
        <PageTitle text="Ruang Sample" />
        <PrevNextNavigation
          baseUrl={pathName}
          routes={routes}
          prevUrl={"/kriteria-audit"}
          nextUrl={"/pengujian-sample"}
          marginLeft={"-60px"}
        />
      </div>
      {/* Start Content */}
      <div className="w-10/12 flex gap-4">
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
                data?.sample?.csv?.length ? (
                  data?.sample?.csv?.map((value, index) => {
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
                data?.sample?.file?.length ? (
                  <TableSampleFile data={data?.sample?.file} key={index} />
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
