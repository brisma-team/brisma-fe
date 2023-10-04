import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  PageTitle,
  Pagination,
} from "@/components/atoms";
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
import { convertDate, deleteSwal } from "@/helpers";
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
  const [selectedTeamId, setSelectedTeamId] = useState(0);
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
        tipe_tim: v.ref_tipe_tim.nama,
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

  const handleUpdate = (e, teamId) => {
    e.stopPropagation();
    setSelectedTeamId(teamId);
    setShowModal(true);
    setTypeModal("update");
  };

  const handleDelete = async (e, teamId) => {
    e.stopPropagation();
    await deleteSwal(
      "Apakah anda yakin ingin menghapus data ini?",
      "Data ini dihapus seacara permanen",
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/tim_audit?tim_id=${teamId}&pat_id=${id}`
    );
    auditTeamMutate();
  };

  return (
    <PatLandingLayout data={statusPat?.data} content={content}>
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
          marginLeft={"-90px"}
          widthDropdown={"w-56"}
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
        <div className="w-40 rounded bg-atlasian-purple">
          <ButtonField handler={handleCreateButton} text={"Buat Tim Audit"} />
        </div>
        <ModalAuditTeam
          showModal={showModal}
          setShowModal={setShowModal}
          typeModal={typeModal}
          mutate={auditTeamMutate}
          selectedTeamId={selectedTeamId}
        />
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
      {auditTeamError ? (
        <DataNotFound />
      ) : (
        data?.length && (
          <div className="grid grid-cols-3 my-4 -ml-2 p-2 gap-3">
            {data?.map((v, i) => {
              return (
                <CardAuditTeam
                  key={i}
                  header_title={v.header_title}
                  maker={v.maker}
                  created_at={v.created_at}
                  manajer_audit={v.manajer_audit}
                  ketua_tim_audit={v.ketua_tim_audit}
                  anggota_tim_audit={v.anggota_tim_audit}
                  tipe_tim={v.tipe_tim}
                  button={true}
                  handleUpdate={(e) => handleUpdate(e, v.id)}
                  handleDelete={(e) => handleDelete(e, v.id)}
                />
              );
            })}
          </div>
        )
      )}
      <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
      {/* End Content */}
    </PatLandingLayout>
  );
};

export default index;
