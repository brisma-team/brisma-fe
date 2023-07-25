import { Breadcrumbs, PageTitle } from "@/components/atoms";
import {
  CardTypeCount,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import {
  CardFilterActivitySchedule,
  CardOtherSchedule,
} from "@/components/molecules/pat";
import { useState } from "react";
import { ModalAddOtherSchedule } from "@/components/molecules/pat/jadwal-lainnya";
import { convertToRupiah } from "@/helpers";

const baseUrl = "/pat/projects/123";
const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  { name: "Tujuan", slug: "tujuan" },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
  { name: "PAT AIW BANTEN", path: "/pat/projects/123" },
  { name: "Jadwal Kegiatan", path: "/pat/projects/123/jadwal-kegiatan" },
];

const id = "1";
const data = [
  {
    type: "konsulting - formal",
    title: "Percobaan Jadwal Konsulting 2023 BRISMA 2.0 Konsulting",
    maker: "Annisa Damayana",
    audit_period: "24-06-2023 s/d 31-07-2023",
    member: [
      "123123123 - M. Firly Ismail - Ketua Tim Audit",
      "123123123 - Budiman - Anggota Tim Audit",
    ],
    budget_detail: [
      {
        title: "Biaya Perjalanan Dinas",
        value: `Rp. ${convertToRupiah("350000000")}`,
      },
      {
        title: "Biaya Selama Kegiatan",
        value: `Rp. ${convertToRupiah("150000000")}`,
      },
    ],
    total_budget_planning: `Rp. ${convertToRupiah("500000000")}`,
    desc: "Jadwal audit ini dibuat dalam rangka mencoba memfasilitasi kebutuhan pelaku audit dalam merencanakan kegiatan audit.",
    href: `/pat/projects/${id}`,
  },
];

const index = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <PatLandingLayout>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Jadwal Lainnya"} />
          <PrevNextNavigation baseUrl={baseUrl} routes={routes} />
        </div>

        {/* Start Filter */}
        <div
          className="flex justify-between items-center mb-6"
          style={{ maxWidth: "21rem" }}
        >
          <div className="w-40">
            <Button
              appearance="primary"
              onClick={() => setShowFilter(!showFilter)}
              shouldFitContainer
            >
              Tampilkan Filter
            </Button>
          </div>
          <div className="w-40">
            <Button
              appearance="danger"
              onClick={() => setShowModal(true)}
              shouldFitContainer
            >
              Buat Jadwal Lain
            </Button>
            <ModalAddOtherSchedule
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-[28rem]">
            <CardFilterActivitySchedule showFilter={showFilter} />
          </div>
          <div className="flex justify-end items-end gap-2">
            <CardTypeCount
              title={"AUDIT"}
              total={2}
              percent={75}
              width={"w-[12.8rem]"}
            />
            <CardTypeCount
              title={"KONSULTING"}
              total={1}
              percent={25}
              width={"w-[12.8rem]"}
            />
            <CardTypeCount
              title={"LAIN-LAIN"}
              total={1}
              percent={25}
              width={"w-[12.8rem]"}
            />
            <SelectSortFilter
              optionValue={[
                { label: "Awal", value: "awal" },
                { label: "Akhir", value: "akhir" },
              ]}
            />
          </div>
        </div>
        {/* End of Filter */}

        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2">
          {data?.length &&
            data.map((v, i) => {
              return (
                <CardOtherSchedule
                  key={i}
                  type={v.type}
                  title={v.title}
                  maker={v.maker}
                  audit_period={v.audit_period}
                  member={v.member}
                  budget_detail={v.budget_detail}
                  total_budget_planning={v.total_budget_planning}
                  desc={v.desc}
                  href={v.href}
                />
              );
            })}
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;
