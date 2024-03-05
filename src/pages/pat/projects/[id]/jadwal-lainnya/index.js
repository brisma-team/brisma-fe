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
import { PatLandingLayout } from "@/layouts/pat";
import {
  CardFilterOtherSchedule,
  CardOtherSchedule,
} from "@/components/molecules/pat";
import { useState, useEffect } from "react";
import {
  ModalOtherSchedule,
  ModalOtherScheduleDetail,
} from "@/components/molecules/pat/jadwal-lainnya";
import Button from "@atlaskit/button";
import { convertDate, deleteSwal } from "@/helpers";
import { useRouter } from "next/router";
import { useActivityScheduleOther, useStatusPat } from "@/data/pat";
import { resetOtherScheduleData } from "@/slices/pat/activityScheduleOtherSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";
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
    { name: "Jadwal Lainnya", path: `/pat/projects/${id}/jadwal-lainnya` },
  ];

  const [totalData, setTotalData] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [data, setData] = useState([]);
  const [typeModal, setTypeModal] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
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
    limit: 3,
    page: 1,
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
    limit: 3,
    page: 1,
  });

  const {
    activityScheduleOther,
    activityScheduleOtherMutate,
    activityScheduleOtherError,
  } = useActivityScheduleOther("all", {
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
				value: convertDate(
          statusPat?.data?.createdAt,
          "-",
          "d",
          true
        ),
			},
			{ title: "Document Status", value: statusPat?.data?.status_pat },
			{ title: "Document Status", value: statusPat?.data?.status_pat },
    ]);
  }, [statusPat]);

  useEffect(() => {
    if (activityScheduleOther?.data?.length) {
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
      setTotalData(activityScheduleOther?.pagination?.totalData);
    } else {
      setData([]);
      setTotalData(0);
    }
  }, [activityScheduleOther, activityScheduleOtherMutate]);

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
    dispatch(resetOtherScheduleData());
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
    activityScheduleOtherMutate();
  };

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  console.log(data)

  return (
		<PatLandingLayout data={statusPat?.data} content={content}>
			<Breadcrumbs data={breadcrumbs} />
			<div className="flex justify-between items-center mb-6">
				<PageTitle text={"Jadwal Lainnya"} />
				<PrevNextNavigation
					baseUrl={baseUrl}
					routes={routes}
					prevUrl={"/jadwal-kegiatan"}
					nextUrl={"/ringkasan-objek-audit"}
					widthDropdown={"w-56"}
				/>
			</div>

			<div className="flex justify-between">
				{/* Start Filter */}
				<div
					className="flex justify-between items-center mb-4 gap-3"
					style={{ maxWidth: "21rem" }}
				>
					<div className="w-40 rounded bg-atlasian-blue-light">
						<ButtonField
							handler={() => setShowFilter(!showFilter)}
							text={
								showFilter ? `Tutup Filter` : `Tampilkan Filter`
							}
						/>
					</div>
					<div className="w-44 rounded bg-atlasian-purple">
						<ButtonField
							handler={handleCreateButton}
							text={"Buat Jadwal Lain"}
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
				<CardFilterOtherSchedule
					showFilter={showFilter}
					params={filter}
					setParams={setFilter}
				/>
			</div>
			<div className="flex justify-end items-end relative mb-4 gap-2 mt-3">
				<SelectSortFilter change={handleChangeFilter} />
			</div>
			{/* End of Filter */}

			{/* Start Content */}
			{activityScheduleOtherError ? (
				<DataNotFound />
			) : data?.length ? (
				<div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-0.5 py-2">
					{data.map((v, i) => {
						return (
							<CardOtherSchedule
								key={i}
								kegiatan_lain_id={v.id}
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
			) : (
				""
			)}
			<CustomPagination
				perPage={filter.limit}
				handleSetPagination={(start, end, pageNow) =>
					handleChangeFilter("page", pageNow)
				}
				defaultCurrentPage={filter.page}
				totalData={totalData}
			/>
			<ModalOtherSchedule
				showModal={showModal}
				setShowModal={setShowModal}
				typeModal={typeModal}
				mutate={activityScheduleOtherMutate}
				selectedScheduleId={selectedScheduleId}
			/>
			<ModalOtherScheduleDetail
				scheduleId={selectedScheduleId}
				showModal={showModalDetail}
				setShowModal={setShowModalDetail}
			/>
			{/* End Content */}
		</PatLandingLayout>
  );
};

export default index;
