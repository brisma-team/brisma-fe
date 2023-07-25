import { Breadcrumbs, PageTitle } from "@/components/atoms";
import {
  CardTypeCount,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import CardAuditSchedule from "@/components/molecules/pat/CardAuditSchedule";
import { useState } from "react";
import { ModalBuatJadwalAudit } from "@/components/molecules/pat/jadwal-audit";
import { CardFilterActivitySchedule } from "@/components/molecules/pat";
import { useRouter } from "next/router";

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
  { name: "Jadwal Audit", path: "/pat/projects/123/jadwal-audit" },
];

const id = "1";
const data = [
  {
    type: "individual",
    title: "Percobaan Jadwal Audit 2023 BRISMA 2.0 Reguler",
    maker: "Annisa Damayana",
    audit_team: "Tim Audit Percobaan Baru BRISMA",
    budget: "Rp 300.000.000,-",
    audit_type: "Reguler",
    category: "Tahunan",
    desc: "Jadwal audit ini dibuat dalam rangka mencoba memfasilitasi kebutuhan pelaku audit dalam merencanakan kegiatan audit.",
    href: `/pat/projects/${id}`,
  },
  {
    type: "tematik",
    title: "Percobaan Jadwal Audit 2023 BRISMA 2.0 Reguler",
    maker: "Annisa Damayana",
    audit_team: "Tim Audit Percobaan Baru BRISMA",
    budget: "Rp 300.000.000,-",
    audit_type: "Reguler",
    category: "Tahunan",
    desc: "Jadwal audit ini dibuat dalam rangka mencoba memfasilitasi kebutuhan pelaku audit dalam merencanakan kegiatan audit.",
    href: `/pat/projects/${id}`,
  },
  {
    type: "individual",
    title: "Percobaan Jadwal Audit 2023 BRISMA 2.0 Reguler",
    maker: "Annisa Damayana",
    audit_team: "Tim Audit Percobaan Baru BRISMA",
    budget: "Rp 300.000.000,-",
    audit_type: "Reguler",
    category: "Tahunan",
    desc: "Jadwal audit ini dibuat dalam rangka mencoba memfasilitasi kebutuhan pelaku audit dalam merencanakan kegiatan audit.",
    href: `/pat/projects/${id}`,
  },
];

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/pat/projects/${id}`;
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <PatLandingLayout>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Jadwal Audit"} />
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
              Buat Jadwal Audit
            </Button>
            <ModalBuatJadwalAudit
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-[27rem] flex justify-center">
            <CardFilterActivitySchedule showFilter={showFilter} />
          </div>
          <div className="flex justify-end items-end gap-2">
            <CardTypeCount
              title={"INDIVIDUAL"}
              total={2}
              percent={75}
              width={"w-[12.8rem]"}
            />
            <CardTypeCount
              title={"TEMATIK"}
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
                <CardAuditSchedule
                  key={i}
                  type={v.type}
                  title={v.title}
                  maker={v.maker}
                  audit_team={v.audit_team}
                  budget={v.budget}
                  audit_type={v.audit_type}
                  category={v.category}
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
