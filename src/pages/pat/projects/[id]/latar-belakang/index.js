import React, { useState } from "react";
import { Breadcrumbs, Card } from "@/components/atoms";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import Image from "next/image";
import { IconInfo, IconPlus } from "@/components/icons";
import dynamic from "next/dynamic";
import BRISMA from "../../../../../../public/images/BRISMA-horizontal.png";
import { PrevNextNavigation } from "@/components/molecules/commons";

const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const baseUrl = "/pat/projects/123";
const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  { name: "Tujuan", slug: "tujuan" },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "target-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const index = () => {
  const [data, setData] = useState("");

  const pictures = [
    {
      alt: "brisma",
      url: BRISMA,
    },
  ];

  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: "PAT AIW BANTEN", path: "/pat/projects/123" },
    { name: "Latar Belakang", path: "/pat/projects/123/latar-belakang" },
  ];

  console.log("Data => ", data);

  return (
    <PatLandingLayout>
      <div className="pr-16">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <p className="text-3xl font-bold">Latar Belakang</p>
          <PrevNextNavigation baseUrl={baseUrl} routes={routes} />
        </div>
        {/* Start Content */}
        <div className="my-4 flex">
          <div className="w-64 mr-6">
            <div>
              <Card>
                <div className="w-full px-4 -ml-1">
                  <div className="flex justify-between">
                    <p className="text-xl font-semibold">Kliping Gambar</p>
                    <div className="text-atlasian-yellow  items-center flex">
                      <IconInfo />
                    </div>
                  </div>
                  {/* Start Kliping Gambar */}
                  <div
                    className="grid grid-cols-2 -mx-1 mt-2 overflow-scroll overflow-x-hidden"
                    style={{ maxHeight: "37rem" }}
                  >
                    {pictures.map((v, i) => {
                      return (
                        <div
                          key={i}
                          className="m-1"
                          style={{ width: "6.25rem", height: "6.25rem" }}
                        >
                          <Image src={v.url} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="py-2 bg-none w-40">
                    <Button
                      iconAfter={<IconPlus size="medium" />}
                      shouldFitContainer
                      style={{ color: "yellow" }}
                    >
                      Tambah Kliping
                    </Button>
                  </div>
                  {/* End Kliping Gambar */}
                </div>
              </Card>
            </div>
          </div>
          <Editor
            contentData={""}
            disabled={false}
            ready={true}
            onChange={(value) => setData(value)}
          />
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;
