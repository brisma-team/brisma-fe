import {
  Breadcrumbs,
  ButtonField,
  PageTitle,
  Pagination,
} from "@/components/atoms";
import {
  CardTypeCount,
  DataNotFound,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import CardAuditSchedule from "@/components/molecules/pat/CardAuditSchedule";
import { useEffect, useState } from "react";
import {
  ModalAuditScheduleDetail,
  ModalBuatJadwalAudit,
} from "@/components/molecules/pat/jadwal-audit";
import { CardFilterAuditSchedule } from "@/components/molecules/pat";
import { useRouter } from "next/router";
import { useStatusPat, useAuditSchedule } from "@/data/pat";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { resetAuditScheduleData } from "@/slices/pat/auditScheduleSlice";
import { deleteSwal } from "@/helpers";

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
  const baseUrl = `/pat/projects/${id}`;
  const { statusPat } = useStatusPat(id);
  const dispatch = useDispatch();
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    { name: "Jadwal Audit", path: `/pat/projects/${id}/jadwal-audit` },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [content, setContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [params, setParams] = useState({
    project_name: "",
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    timAudit: "",
    maker: "",
    start: "",
    end: "",
    sort_by: "ASC",
    limit: 3,
  });
  const [filter, setFilter] = useState({
    project_name: "",
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    timAudit: "",
    maker: "",
    start: "",
    end: "",
    sort_by: "ASC",
    limit: 3,
  });

  const { auditSchedule, auditScheduleMutate, auditScheduleError } =
    useAuditSchedule("all", {
      ...params,
      id,
      pages: currentPage,
    });

  const [data, setData] = useState([]);
  const [countType, setCountType] = useState({});
  const [typeModal, setTypeModal] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    const mappedData = auditSchedule?.result.map((v) => {
      return {
        id: v?.id,
        type: v?.ref_tipe?.nama,
        title: v?.name_kegiatan_audit,
        maker: v?.pic_jadwal_audit?.nama,
        audit_team: v?.tim_audit?.name,
        start_date: v?.pelaksanaan_start,
        end_date: v?.pelaksanaan_end,
        budget: v?.total_anggaran,
        audit_type: v?.ref_tipe?.nama,
        tema: v?.ref_tema?.nama,
        desc: v?.deskripsi,
      };
    });

    setData(mappedData);
    setTotalPages(auditSchedule?.detailPage?.totalPage);

    const totalCount = auditSchedule?.result?.length;
    if (totalCount) {
      const typeCounts = auditSchedule?.result.reduce((acc, item) => {
        const type = item?.ref_tipe?.nama;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const result = Object.entries(typeCounts).map(([type, count]) => ({
        type,
        count,
        percent: ((count / totalCount) * 100).toFixed(0),
      }));

      setCountType(result);
    }
  }, [auditSchedule, auditScheduleMutate]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const handleCreateButton = () => {
    setShowModal(true);
    setTypeModal("create");
    dispatch(resetAuditScheduleData());
  };

  const handleClickInfo = (scheduleId) => {
    setShowModalDetail(true);
    setSelectedScheduleId(scheduleId);
  };

  const handleClickUpdate = (e, scheduleId) => {
    e.stopPropagation();
    setSelectedScheduleId(scheduleId);
    setShowModal(true);
    setTypeModal("update");
  };

  const handleClickDelete = async (e, scheduleId) => {
    e.stopPropagation();
    await deleteSwal(
      "Apakah anda yakin ingin menghapus data ini?",
      "Data ini dihapus seacara permanen",
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/audit?jadwal_id=${scheduleId}&pat_id=${id}`
    );
    auditScheduleMutate();
  };

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  return (
    <PatLandingLayout content={content} data={statusPat?.data}>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Jadwal Audit"} />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/tim-audit"}
          nextUrl={"/jadwal-kegiatan"}
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
          <ButtonField
            handler={handleCreateButton}
            text={"Buat Jadwal Audit"}
          />
        </div>
        <ModalBuatJadwalAudit
          showModal={showModal}
          setShowModal={setShowModal}
          typeModal={typeModal}
          mutate={auditScheduleMutate}
          selectedScheduleId={selectedScheduleId}
        />
        <ModalAuditScheduleDetail
          scheduleId={selectedScheduleId}
          showModal={showModalDetail}
          setShowModal={setShowModalDetail}
        />
      </div>
      <div className="flex justify-between items-end relative mb-4">
        <div className="flex justify-center absolute z-10 bg-white top-0">
          <CardFilterAuditSchedule
            showFilter={showFilter}
            params={filter}
            setParams={setFilter}
          />
        </div>
        <div
          className={`w-full flex justify-end items-end gap-2 ${
            showFilter && `pt-[92px]`
          }`}
        >
          {countType?.length && (
            <div className="mb-1 flex gap-2">
              {countType.map((v, i) => {
                return (
                  <CardTypeCount
                    key={i}
                    title={v.type}
                    total={v.count}
                    percent={v.percent}
                    width={"w-[12.8rem]"}
                  />
                );
              })}
            </div>
          )}
          <SelectSortFilter change={handleChangeFilter} />
        </div>
      </div>
      {/* End of Filter */}

      {/* Start Content */}
      {auditScheduleError ? (
        <DataNotFound />
      ) : (
        data?.length && (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-0.5 py-2">
            {data.map((v, i) => {
              return (
                <CardAuditSchedule
                  key={i}
                  jadwal_id={v.id}
                  type={v.type}
                  title={v.title}
                  maker={v.maker}
                  audit_team={v.audit_team}
                  start_date={v.start_date}
                  end_date={v.end_date}
                  budget={v.budget}
                  audit_type={v.audit_type}
                  tema={v.tema}
                  desc={v.desc}
                  handleClickInfo={handleClickInfo}
                  handleClickUpdate={handleClickUpdate}
                  handleClickDelete={handleClickDelete}
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
