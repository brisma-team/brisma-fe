import { Breadcrumbs, PageTitle } from "@/components/atoms";
import {
  CardTypeCount,
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
    { name: "Jadwal Lainnya", path: `/pat/projects/${id}/jadwal-lainnya` },
  ];

  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { activityScheduleOther, activityScheduleOtherMutate } =
    useActivityScheduleOther("all", {
      id,
    });
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
  }, [activityScheduleOther, activityScheduleOtherMutate]);

  return (
    <PatLandingLayout data={statusPat} content={content}>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Jadwal Lainnya"} />
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
              Buat Jadwal Lain
            </Button>
            <ModalOtherSchedule
              showModal={showModal}
              setShowModal={setShowModal}
              typeModal={typeModal}
              mutate={activityScheduleOtherMutate}
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
              title={"AUDIT"}
              total={2}
              percent={75}
              width={"w-[12.8rem]"}
            />
            <CardTypeCount
              title={"KONSULTING"}
              total={1}
              percent={25}
              width={"w-[12.8rem]"}
            />
            <CardTypeCount
              title={"LAIN-LAIN"}
              total={1}
              percent={25}
              width={"w-[12.8rem]"}
            />
            <SelectSortFilter
              optionValue={[
                { label: "Awal", value: "awal" },
                { label: "Akhir", value: "akhir" },
              ]}
            />
          </div>
        </div>
        {/* End of Filter */}

        {/* Start Content */}
        <div className="flex flex-wrap my-4 overflow-hidden -ml-2">
          {data?.length &&
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
            })}
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;
