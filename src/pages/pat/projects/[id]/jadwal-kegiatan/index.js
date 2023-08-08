import { Breadcrumbs, PageTitle } from "@/components/atoms";
import {
  CardTypeCount,
  PrevNextNavigation,
  SelectSortFilter,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import Button from "@atlaskit/button";
import {
  CardActivitySchedule,
  CardFilterActivitySchedule,
} from "@/components/molecules/pat";
import { useState } from "react";
import { ModalActivitySchedule } from "@/components/molecules/pat/jadwal-kegiatan";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useActivitySchedule, useStatusPat } from "@/data/pat";
import { convertDate } from "@/helpers";

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
  const [content, setContent] = useState(null);
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "PAT", path: "/pat" },
    { name: "Overview", path: "/pat/projects" },
    { name: statusPat?.data?.pat_name, path: `/pat/projects/${id}` },
    { name: "Jadwal Kegiatan", path: `/pat/projects/${id}/jadwal-kegiatan` },
  ];

  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { activitySchedule, activityScheduleMutate } = useActivitySchedule(
    "all",
    {
      id,
    }
  );
  const [data, setData] = useState([]);
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
  }, [activitySchedule, activityScheduleMutate]);

  return (
    <PatLandingLayout data={statusPat} content={content}>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Jadwal Kegiatan"} />
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/jadwal-audit"}
            nextUrl={"/jadwal-lainnya"}
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
              onClick={() => setShowModal(true)}
              shouldFitContainer
            >
              Buat Jadwal Kegiatan
            </Button>
            <ModalActivitySchedule
              showModal={showModal}
              setShowModal={setShowModal}
              typeModal={typeModal}
              mutate={activityScheduleMutate}
              scheduleId={scheduleId}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-[28rem]">
            <CardFilterActivitySchedule showFilter={showFilter} />
          </div>
          <div className="flex justify-end items-end gap-2">
            <CardTypeCount
              title={"KONSULTING"}
              total={2}
              percent={75}
              width={"w-[12.8rem]"}
            />
            <CardTypeCount
              title={"LAIN-LAIN"}
              total={1}
              percent={25}
              width={"w-[12.8rem]"}
            />
            <SelectSortFilter />
          </div>
        </div>
        {/* End of Filter */}

        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -mx-2">
          {data?.length &&
            data.map((v, i) => {
              return (
                <CardActivitySchedule
                  key={i}
                  jadwal_sbp_id={v.id}
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
            })}
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;
