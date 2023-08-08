import { Breadcrumbs, PageTitle } from "@/components/atoms";
import {
  CardTypeCount,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import CardAuditSchedule from "@/components/molecules/pat/CardAuditSchedule";
import { useEffect, useState } from "react";
import { ModalBuatJadwalAudit } from "@/components/molecules/pat/jadwal-audit";
import { CardFilterActivitySchedule } from "@/components/molecules/pat";
import { useRouter } from "next/router";
import useAuditSchedule from "@/data/pat/useAuditSchedule";
import { useStatusPat } from "@/data/pat";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { resetAuditScheduleData } from "@/slices/pat/auditScheduleSlice";

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

  const [content, setContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [params, setParams] = useState({
    project_name: "",
    metode: "",
    tipe: "",
    start: "",
    end: "",
    sort_by: "ASC",
  });
  const [filter, setFilter] = useState({
    project_name: "",
    metode: "",
    tipe: "",
    start: "",
    end: "",
    sort_by: "ASC",
  });

  const { auditSchedule, auditScheduleMutate } = useAuditSchedule("all", {
    id,
    ...params,
  });
  const [data, setData] = useState([]);
  const [countType, setCountType] = useState({});
  const [typeModal, setTypeModal] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);

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
    const debouncedSearch = _.debounce(handleSearch, 2000);
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

  return (
    <PatLandingLayout content={content} data={statusPat?.data}>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Jadwal Audit"} />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/tim-audit"}
            nextUrl={"/jadwal-kegiatan"}
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
              Buat Jadwal Audit
            </Button>
            <ModalBuatJadwalAudit
              showModal={showModal}
              setShowModal={setShowModal}
              typeModal={typeModal}
              mutate={auditScheduleMutate}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-[27rem] flex justify-center">
            <CardFilterActivitySchedule
              showFilter={showFilter}
              params={filter}
              setParams={setFilter}
            />
          </div>
          <div className="flex justify-end items-end gap-2">
            {countType?.length && (
              <div className="mb-1">
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
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2">
          {data?.length &&
            data.map((v, i) => {
              return (
                <CardAuditSchedule
                  key={i}
                  pat_id={id}
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
                  setShowModal={setShowModal}
                  setTypeModal={setTypeModal}
                  showModalDetail={showModalDetail}
                  setShowModalDetail={setShowModalDetail}
                  scheduleId={scheduleId}
                  setScheduleId={setScheduleId}
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
