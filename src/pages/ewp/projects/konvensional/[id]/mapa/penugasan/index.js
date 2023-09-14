import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  ButtonIcon,
  Card,
  PageTitle,
} from "@/components/atoms";
import { PrevNextNavigation } from "@/components/molecules/commons";
import { useRouter } from "next/router";
import { LandingLayoutEWP } from "@/layouts/ewp";
import { useAuditorEWP } from "@/data/ewp/konvensional";
import { useMapaEWP } from "@/data/ewp/konvensional/mapa";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { IconEdit } from "@/components/icons";

const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  {
    name: "Tujuan",
    slug: "tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "UKER Assessment", slug: "uker-assessment" },
  { name: "Analisis", slug: "analisis" },
  { name: "Penugasan", slug: "penugasan" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Anggaran", slug: "anggaran" },
  { name: "Dokumen", slug: "dokument" },
];

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/ewp/projects/konvensional/${id}/mapa`;

  const { auditorEWP } = useAuditorEWP({ id });

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / MAPA`,
      path: `${baseUrl}`,
    },
    {
      name: "Tujuan",
      path: `${baseUrl}/tujuan`,
    },
  ];

  const { mapaEWP, mapaEWPMutate, mapaEWPError } = useMapaEWP("penugasan", {
    id,
  });

  //   useEffect(() => {
  //     if (!mapaEWPError) {
  //     }
  //   });

  return (
    <LandingLayoutEWP>
      <div className="pr-16">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        {/* Start Content */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text="Penugasan" />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/analisis-perencanaan"}
            nextUrl={"/jadwal-audit"}
          />
        </div>
        <div className="w-32 bg-atlasian-blue-light rounded">
          <ButtonField text="Tampilkan Filter" />
        </div>
        <div className="mb-4" />
        <Card>
          <div className="w-full px-6 py-4 overflow-y-scroll max-h-[40rem]">
            <TableTree>
              <Headers>
                <Header className="!hidden" />
                <Header width="5%" className="border-t border-x rounded-ss-xl">
                  Aksi
                </Header>
                <Header width="10%" className="border-t border-r">
                  Auditor
                </Header>
                <Header
                  width="10%"
                  className="border-t border-r flex justify-center"
                >
                  UKER
                </Header>
                <Header
                  width="10%"
                  className="border-t border-r flex justify-center"
                >
                  AKTIFITAS
                </Header>
                <Header
                  width="10%"
                  className="border-t border-r flex justify-center"
                >
                  SUB-AKTIFITAS
                </Header>
                <Header
                  width="10%"
                  className="border-t border-r flex justify-center"
                >
                  SUB-MAJOR
                </Header>
                <Header
                  width="10%"
                  className="border-t border-r flex justify-center"
                >
                  RISK ISSUE
                </Header>
                <Header
                  width="10%"
                  className="border-t border-r flex justify-center"
                >
                  SAMPLE
                </Header>
                <Header width="10%" className="border-t border-r rounded-se-xl">
                  PERSENTASE
                </Header>
              </Headers>
              <Rows
                items={[{ id: 1 }]}
                render={({ id, children = [] }) => (
                  <Row>
                    <Cell className="!hidden" />
                    <Cell width="5%" className="border-x">
                      <ButtonIcon icon={<IconEdit />} color={"yellow"} />
                    </Cell>
                    <Cell width="8%" className="border-r">
                      <div></div>
                    </Cell>
                  </Row>
                )}
              />
            </TableTree>
          </div>
        </Card>
        {/* End Content */}
      </div>
    </LandingLayoutEWP>
  );
};

export default index;
