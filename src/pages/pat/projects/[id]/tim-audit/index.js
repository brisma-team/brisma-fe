import React, { useState } from "react";
import { Breadcrumbs, PageTitle } from "@/components/atoms";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import {
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import {
  CardFilterTimAudit,
  ModalAuditTeam,
} from "@/components/molecules/pat/tim-audit";
import { CardAuditTeam } from "@/components/molecules/pat";
import useAuditTeam from "@/data/pat/useAuditTeam";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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

const index = () => {
  const { id } = useRouter().query;
  const baseUrl = `/pat/projects/${id}`;

  const statusPatState = useSelector((state) => state.statusPat.searchParam);
  console.log("SET PARAMS ", setParams);
  const [params, setParams] = useState({
    id,
    tim_id: null,
    pages: 1,
    limit: 8,
  });
  const [auditTeamData, setAuditTeamData] = useState({
    pat_id: id,
    name: "",
    ref_tim_audit_ma: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_kta: [{ pn: "", nama: "", jabatan: "" }],
    ref_tim_audit_ata: [
      {
        pn: "",
        nama: "",
        jabatan: "",
        uker_binaans: [
          {
            orgeh_kode: "",
            orgeh_name: "",
            branch_name: "",
            branch_kode: "",
          },
        ],
      },
    ],
  });

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { auditTeam, auditTeamMutate } = useAuditTeam("list", params);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPatState?.pat_name, path: `/pat/projects/${id}` },
    { name: "Tim Audit", path: `/pat/projects/${id}/tim-audit` },
  ];

  useEffect(() => {
    console.log("auditTeamData => ", auditTeamData);
  }, [auditTeamData]);

  useEffect(() => {
    const mappedData = auditTeam?.data?.map((v) => {
      return {
        id: v.id,
        header_title: v.name,
        maker: v.pic_maker_tim_audit.nama,
        created_at: "23-06-2023",
        manajer_audit: v.ref_tim_audit_mas,
        ketua_tim_audit: v.ref_tim_audit_kta,
        anggota_tim_audit: v.ref_tim_audit_ata,
      };
    });

    setData(mappedData);
  }, [auditTeam]);

  return (
    <PatLandingLayout>
      <div className="pr-44">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Tim Audit"} />
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
              Buat Tim Audit
            </Button>
            <ModalAuditTeam
              showModal={showModal}
              setShowModal={setShowModal}
              typeModal={typeModal}
              data={auditTeamData}
              setData={setAuditTeamData}
              isMutate={auditTeamMutate}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-[27rem]">
            <CardFilterTimAudit showFilter={showFilter} />
          </div>
          <div className="flex justify-end items-end rounded-full">
            <SelectSortFilter
              optionValue={[
                { label: "Awal", value: "awal" },
                { label: "Akhir", value: "akhir" },
              ]}
            />
          </div>
        </div>
        {/* End Filter */}
        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2 p-2 gap-3">
          {data?.length &&
            data?.map((v, i) => {
              return (
                <CardAuditTeam
                  key={i}
                  tim_id={v.id}
                  pat_id={id}
                  header_title={v.header_title}
                  maker={v.maker}
                  created_at={v.created_at}
                  manajer_audit={v.manajer_audit}
                  ketua_tim_audit={v.ketua_tim_audit}
                  anggota_tim_audit={v.anggota_tim_audit}
                  button={true}
                  setShowModal={setShowModal}
                  isMutate={auditTeamMutate}
                  setTypeModal={setTypeModal}
                  setData={setAuditTeamData}
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
