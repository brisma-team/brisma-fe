import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import {
  DataNotFound,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import Button from "@atlaskit/button";
import { PatLandingLayout } from "@/layouts/pat";
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
import { IconFile } from "@/components/icons";

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

  const [totalData, setTotalData] = useState(1);
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
    page: 1,
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
    page: 1,
  });

  const { activitySchedule, activityScheduleMutate, activityScheduleError } =
    useActivitySchedule("all", {
      ...params,
      id,
    });

  useEffect(() => {
    setContent([
      {
        title: "Initiator",
        value: statusPat?.data?.create_by?.nama,
      },
      {
        title: "Created Date",
        value: convertDate(statusPat?.data?.createdAt, "-", "d", true),
      },
      { title: "Document Status", value: statusPat?.data?.status_pat },
      { title: "Document Status", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    if (activitySchedule?.data?.length) {
      const mappedData = activitySchedule?.data?.map((v) => {
        const mappingPIC = v?.ref_penanggung_jawabs?.map((x) => {
          return `${x?.pn} - ${x?.nama}`;
        });
        return {
          id: v?.id,
          type: v?.ref_tipe.nama,
          title: v?.nama,
          jenis: v?.ref_jenis?.nama,
          tema: v?.ref_tema?.nama,
          createdDate: v?.createdAt,
          maker: v?.pic_maker_jadwal_sbp.nama,
          budget: v?.total_anggaran,
          start_date: v?.pelaksanaan_start,
          end_date: v?.pelaksanaan_end,
          pic: mappingPIC,
          desc: v?.deskripsi,
        };
      });
      setData(mappedData);
      setTotalData(activitySchedule?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(0);
    }
  }, [activitySchedule]);

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
    <PatLandingLayout data={statusPat?.data} content={content}>
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

      <div className="flex justify-between">
        {/* Start Filter */}
        <div
          className="flex justify-between items-center mb-3 gap-3"
          style={{ maxWidth: "21rem" }}
        >
          <div className="w-40 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-44 rounded bg-atlasian-purple">
            <ButtonField
              handler={handleCreateButton}
              text={"Buat Jadwal Kegiatan"}
            />
          </div>
        </div>
        <div className="w-24">
          <Button
            appearance="primary"
            onClick={() => setShowModal(true)}
            shouldFitContainer
            iconBefore={<IconFile />}
          >
            Arsip
          </Button>
        </div>
      </div>
      <div className="w-fit">
        <CardFilterActivitySchedule
          showFilter={showFilter}
          params={filter}
          setParams={setFilter}
        />
      </div>
      <div className="flex justify-end items-end w-full gap-2 mt-3">
        <SelectSortFilter change={handleChangeFilter} />
      </div>
      {/* End of Filter */}

      {/* Start Content */}
      {activityScheduleError ? (
        <DataNotFound />
      ) : (
        data?.length && (
          <div className="grid grid-cols-3 gap-4 px-0.5 py-2">
            {data.map((v, i) => {
              return (
                <CardActivitySchedule
                  key={i}
                  jadwal_sbp_id={v.id}
                  type={v.type}
                  title={v.title}
                  jenis={v.jenis}
                  tema={v.tema}
                  createdDate={v.createdDate}
                  maker={v.maker}
                  start_date={v.start_date}
                  end_date={v.end_date}
                  budget={v.budget}
                  pic={v.pic}
                  desc={v.desc}
                  progress={v.progress}
                  percent={v.percent}
                  handleClickInfo={handleClickInfo}
                  handleClickUpdate={handleClickUpdate}
                  handleClickDelete={handleClickDelete}
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
      {/* End Content */}
    </PatLandingLayout>
  );
};

export default index;
