import React, { useState, useEffect } from "react";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { PatLandingLayout } from "@/layouts/pat";
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

  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [filter, setFilter] = useState({
    tim_name: "",
    nama_ma: "",
    nama_kta: "",
    nama_ata: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    tim_name: "",
    nama_ma: "",
    nama_kta: "",
    nama_ata: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  const { auditTeam, auditTeamMutate, auditTeamError } = useAuditTeam("all", {
    ...params,
    id,
  });

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    if (auditTeam?.data?.length) {
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
      setTotalData(auditTeam?.d?.totalPage);
    } else {
      setData([]);
      setTotalData(0);
    }
  }, [auditTeam, auditTeamMutate]);

  useEffect(() => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
      };
    });
  }, [filter.limit]);

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

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleCreateButton = () => {
    dispatch(resetAuditTeamData());
    setTypeModal("create");
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
      <div className="flex justify-between items-center gap-3 mb-6 w-fit">
        <div className="w-40 rounded bg-atlasian-blue-light">
          <ButtonField
            handler={() => setShowFilter(!showFilter)}
            text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
          />
        </div>
        <div className="w-40 rounded bg-atlasian-purple">
          <ButtonField handler={handleCreateButton} text={"Buat Tim Audit"} />
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
          <SelectSortFilter change={handleChangeFilter} />
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
      <CustomPagination
        perPage={filter.limit}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        defaultCurrentPage={filter.page}
        totalData={totalData}
      />
      <ModalAuditTeam
        showModal={showModal}
        setShowModal={setShowModal}
        typeModal={typeModal}
        mutate={auditTeamMutate}
        selectedTeamId={selectedTeamId}
      />
      {/* End Content */}
    </PatLandingLayout>
  );
};

export default index;
