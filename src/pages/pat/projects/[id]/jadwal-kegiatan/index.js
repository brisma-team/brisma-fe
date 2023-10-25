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
import {
  CardActivitySchedule,
  CardFilterActivitySchedule,
} from "@/components/molecules/pat";
import { useEffect, useState } from "react";
import {
  ModalActivitySchedule,
  ModalActivityScheduleDetail,
} from "@/components/molecules/pat/jadwal-kegiatan";
import { useRouter } from "next/router";
import { useActivitySchedule, useStatusPat } from "@/data/pat";
import _ from "lodash";
import { convertDate, deleteSwal } from "@/helpers";
import { useDispatch } from "react-redux";
import { resetActivityScheduleData } from "@/slices/pat/activityScheduleSlice";

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
    { name: "Jadwal Kegiatan", path: `/pat/projects/${id}/jadwal-kegiatan` },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countType, setCountType] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([]);
  const [typeModal, setTypeModal] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [params, setParams] = useState({
    nama_sbp: "",
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    pic: "",
    start: "",
    end: "",
    sort_by: "ASC",
    limit: 3,
  });
  const [filter, setFilter] = useState({
    nama_sbp: "",
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    pic: "",
    start: "",
    end: "",
    sort_by: "ASC",
    limit: 3,
  });

  const { activitySchedule, activityScheduleMutate, activityScheduleError } =
    useActivitySchedule("all", {
      ...params,
      id,
      pages: currentPage,
    });

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    const mappedData = activitySchedule?.data?.map((v) => {
      const mappingPIC = v?.ref_penanggung_jawabs?.map((x) => {
        return `${x?.pn} - ${x?.nama}`;
      });
      return {
        id: v?.id,
        type: v?.ref_tipe.nama,
        title: v?.nama,
        maker: v?.pic_maker_jadwal_sbp.nama,
        budget: v?.total_anggaran,
        audit_period: `${convertDate(
          v?.pelaksanaan_start,
          "-"
        )} s/d ${convertDate(v?.pelaksanaan_end, "-")}`,
        pic: mappingPIC,
        desc: v?.deskripsi,
      };
    });

    setData(mappedData);
    setTotalPages(1);

    const totalCount = activitySchedule?.data?.length;
    if (totalCount) {
      const typeCounts = activitySchedule?.data.reduce((acc, item) => {
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
  }, [activitySchedule, activityScheduleMutate]);

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
    dispatch(resetActivityScheduleData());
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
      `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp?jadwal_sbp_id=${scheduleId}&pat_id=${id}`
    );
    activityScheduleMutate();
  };

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  return (
    <PatLandingLayout data={statusPat} content={content}>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text={"Jadwal Kegiatan"} />
        <PrevNextNavigation
          baseUrl={baseUrl}
          routes={routes}
          prevUrl={"/jadwal-audit"}
          nextUrl={"/jadwal-lainnya"}
          widthDropdown={"w-56"}
        />
      </div>

      {/* Start Filter */}
      <div
        className="flex justify-between items-center mb-6 gap-3"
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
        <div className="w-44 rounded bg-atlasian-purple">
          <ButtonField
            handler={handleCreateButton}
            text={"Buat Jadwal Kegiatan"}
          />
        </div>
        <ModalActivitySchedule
          showModal={showModal}
          setShowModal={setShowModal}
          typeModal={typeModal}
          mutate={activityScheduleMutate}
          selectedScheduleId={selectedScheduleId}
        />
        <ModalActivityScheduleDetail
          scheduleId={selectedScheduleId}
          showModal={showModalDetail}
          setShowModal={setShowModalDetail}
        />
      </div>
      <div className="flex justify-between items-end relative mb-4">
        <div className="flex justify-center absolute z-10 bg-white top-0">
          <CardFilterActivitySchedule
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
      {activityScheduleError ? (
        <DataNotFound />
      ) : (
        data?.length && (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-0.5 py-2">
            {data.map((v, i) => {
              return (
                <CardActivitySchedule
                  key={i}
                  jadwal_sbp_id={v.id}
                  type={v.type}
                  title={v.title}
                  maker={v.maker}
                  audit_period={v.audit_period}
                  budget={v.budget}
                  pic={v.pic}
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
