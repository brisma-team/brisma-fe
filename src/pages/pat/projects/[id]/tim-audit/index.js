import React, { useState, useEffect } from "react";
import { Breadcrumbs, PageTitle, Pagination } from "@/components/atoms";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import {
  DataNotFound,
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
import { useStatusPat } from "@/data/pat";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { convertDate } from "@/helpers";
import { resetAuditTeamData } from "@/slices/pat/auditTeamSlice";

const routes = [
  {
    name: "Latar Belakang dan Tujuan",
    slug: "latar-belakang-dan-tujuan",
  },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const index = () => {
  const { id } = useRouter().query;
  const dispatch = useDispatch();
  const baseUrl = `/pat/projects/${id}`;
  const { statusPat } = useStatusPat(id);
  const [content, setContent] = useState(null);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    { name: "Tim Audit", path: `/pat/projects/${id}/tim-audit` },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("ASC");
  const [filter, setFilter] = useState({
    tim_name: "",
    nama_ma: "",
    nama_kta: "",
    nama_ata: "",
    sortBy: "ASC",
  });
  const [params, setParams] = useState({
    tim_name: "",
    nama_ma: "",
    nama_kta: "",
    nama_ata: "",
    sortBy: "ASC",
  });

  const { auditTeam, auditTeamMutate, auditTeamError } = useAuditTeam("all", {
    ...params,
    id,
    pages: currentPage,
    limit: 6,
    sortBy,
  });

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    const mappedData = auditTeam?.data?.map((v) => {
      return {
        id: v.id,
        header_title: v.name,
        maker: v.pic_maker_tim_audit.nama,
        created_at: convertDate(v.createdAt, "-", "d"),
        manajer_audit: v.ref_tim_audit_mas,
        ketua_tim_audit: v.ref_tim_audit_kta,
        anggota_tim_audit: v.ref_tim_audit_ata,
      };
    });

    setData(mappedData);
    setTotalPages(auditTeam?.detailPage?.totalPage);
  }, [auditTeam]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
      auditTeamMutate;
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const handleChangeSortBy = (e) => {
    setSortBy(e.value);
  };

  const handleCreateButton = () => {
    dispatch(resetAuditTeamData());
    setShowModal(true);
  };

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
      <div className="pr-44">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Tim Audit"} />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/sumber-informasi"}
            nextUrl={"/jadwal-audit"}
          />
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
              onClick={handleCreateButton}
              shouldFitContainer
            >
              Buat Tim Audit
            </Button>
            <ModalAuditTeam
              showModal={showModal}
              setShowModal={setShowModal}
              typeModal={typeModal}
              isMutate={auditTeamMutate}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-[27rem]">
            <CardFilterTimAudit
              showFilter={showFilter}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <div className="flex justify-end items-end rounded-full">
            <SelectSortFilter change={handleChangeSortBy} />
          </div>
        </div>
        {/* End Filter */}
        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2 p-2 gap-3">
          {auditTeamError ? (
            <DataNotFound />
          ) : (
            data?.length &&
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
                />
              );
            })
          )}
        </div>
        <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;
