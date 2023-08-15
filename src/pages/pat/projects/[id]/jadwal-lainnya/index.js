import { Breadcrumbs, PageTitle, Pagination } from "@/components/atoms";
import {
  CardTypeCount,
  DataNotFound,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import {
  CardFilterActivitySchedule,
  CardOtherSchedule,
} from "@/components/molecules/pat";
import { useState, useEffect } from "react";
import { ModalOtherSchedule } from "@/components/molecules/pat/jadwal-lainnya";
import { convertDate } from "@/helpers";
import { useRouter } from "next/router";
import { useActivityScheduleOther, useStatusPat } from "@/data/pat";
import { resetOtherScheduleData } from "@/slices/pat/activityScheduleOtherSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";

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
    { name: "Jadwal Lainnya", path: `/pat/projects/${id}/jadwal-lainnya` },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countType, setCountType] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([]);
  const [typeModal, setTypeModal] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [params, setParams] = useState({
    nama: "",
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    pic: "",
    start: "",
    end: "",
    sort_by: "ASC",
  });
  const [filter, setFilter] = useState({
    nama: "",
    metode: "",
    tipe: "",
    jenis: "",
    tema: "",
    pic: "",
    start: "",
    end: "",
    sort_by: "ASC",
  });

  const {
    activityScheduleOther,
    activityScheduleOtherMutate,
    activityScheduleOtherError,
  } = useActivityScheduleOther("all", {
    ...params,
    id,
    pages: currentPage,
    limit: 6,
  });

  useEffect(() => {
    setContent([
      { title: "Riwayat Addendum", value: statusPat?.data?.riwayat_adendum },
      { title: "Status Approver", value: statusPat?.data?.status_approver },
      { title: "Status PAT", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    const mappedData = activityScheduleOther?.data?.map((v) => {
      const mappingPIC = v?.ref_penanggung_jawab_kegiatan_lains?.map((x) => {
        return `${x?.pn} - ${x?.nama}`;
      });
      return {
        id: v?.id,
        type: v?.ref_tipe.nama,
        title: v?.nama,
        maker: v?.pic_maker_kegiatan_lain.nama,
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
    setTotalPages(activityScheduleOther?.detailPage?.totalPage);

    const totalCount = activityScheduleOther?.data?.length;
    if (totalCount) {
      const typeCounts = activityScheduleOther?.data.reduce((acc, item) => {
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
  }, [activityScheduleOther, activityScheduleOtherMutate]);

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 2000);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  const handleCreateButton = () => {
    setShowModal(true);
    setTypeModal("create");
    dispatch(resetOtherScheduleData());
  };

  return (
    <PatLandingLayout data={statusPat} content={content}>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Jadwal Lainnya"} />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/jadwal-kegiatan"}
            nextUrl={"/ringkasan-objek-audit"}
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
              Buat Jadwal Lain
            </Button>
            <ModalOtherSchedule
              showModal={showModal}
              setShowModal={setShowModal}
              typeModal={typeModal}
            />
          </div>
        </div>
        <div className="flex justify-between items-end relative">
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
            <SelectSortFilter
              change={(e) => setParams({ ...params, sort_by: e.value })}
            />
          </div>
        </div>
        {/* End of Filter */}

        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -mx-2">
          {activityScheduleOtherError ? (
            <DataNotFound />
          ) : (
            data?.length &&
            data.map((v, i) => {
              return (
                <CardOtherSchedule
                  key={i}
                  kegiatan_lain_id={v.id}
                  pat_id={id}
                  type={v.type}
                  title={v.title}
                  maker={v.maker}
                  audit_period={v.audit_period}
                  budget={v.budget}
                  pic={v.pic}
                  desc={v.desc}
                  setShowModal={setShowModal}
                  setTypeModal={setTypeModal}
                  showModalDetail={showModalDetail}
                  setShowModalDetail={setShowModalDetail}
                  scheduleId={scheduleId}
                  setScheduleId={setScheduleId}
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
