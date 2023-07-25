import { Breadcrumbs, PageTitle } from "@/components/atoms";
import {
  CardTypeCount,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import {
  CardActivitySchedule,
  CardFilterActivitySchedule,
} from "@/components/molecules/pat";
import { useState } from "react";
import { ModalAddActivitySchedule } from "@/components/molecules/pat/jadwal-kegiatan";

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
    audit_team: "Tim Audit Percobaan Baru BRISMA",
    speaker: "12312312 - M. Firly Ismail",
    audit_period: "24-06-2023 s/d 31-07-2023",
    budget: "Rp 300.000.000,-",
    pic: ["123123 - Annisa Dian", "234234 - Dandy", "345345 - Iqbal"],
    desc: "Jadwal audit ini dibuat dalam rangka mencoba memfasilitasi kebutuhan pelaku audit dalam merencanakan kegiatan audit.",
    href: `/pat/projects/${id}`,
  },
  {
    type: "lain-lain",
    title: "Percobaan Jadwal Konsulting 2023 BRISMA 2.0 Konsulting",
    maker: "Annisa Damayana",
    audit_team: "Tim Audit Percobaan Baru BRISMA",
    speaker: "12312312 - M. Firly Ismail",
    audit_period: "24-06-2023 s/d 31-07-2023",
    budget: "Rp 300.000.000,-",
    pic: ["123123 - Annisa Dian", "234234 - Dandy", "345345 - Iqbal"],
    desc: "Jadwal audit ini dibuat dalam rangka mencoba memfasilitasi kebutuhan pelaku audit dalam merencanakan kegiatan audit.",
    href: `/pat/projects/${id}`,
  },
  {
    type: "konsulting",
    title: "Percobaan Jadwal Konsulting 2023 BRISMA 2.0 Konsulting",
    maker: "Annisa Damayana",
    audit_team: "Tim Audit Percobaan Baru BRISMA",
    speaker: "12312312 - M. Firly Ismail",
    audit_period: "24-06-2023 s/d 31-07-2023",
    budget: "Rp 300.000.000,-",
    pic: ["123123 - Annisa Dian", "234234 - Dandy", "345345 - Iqbal"],
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
          <PageTitle text={"Jadwal Kegiatan"} />
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
              Buat Jadwal Kegiatan
            </Button>
            <ModalAddActivitySchedule
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
              title={"KONSULTING"}
              total={2}
              percent={75}
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
        <div className="flex flex-wrap my-4 overflow-hidden -mx-2">
          {data?.length &&
            data.map((v, i) => {
              return (
                <CardActivitySchedule
                  key={i}
                  type={v.type}
                  title={v.title}
                  maker={v.maker}
                  audit_team={v.audit_team}
                  speaker={v.speaker}
                  audit_period={v.audit_period}
                  budget={v.budget}
                  pic={v.pic}
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
