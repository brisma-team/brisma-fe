import {
  Breadcrumbs,
  ButtonField,
  PageTitle,
  CustomPagination,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import {
  CardFilterOverview,
  CardOverview,
  ModalDetailSurvey,
  ModalRequestExtensionAndTermination,
  ModalRequestManageResponden,
} from "@/components/molecules/survey/initiator/overview";
import { LandingLayoutSurvey } from "@/layouts/survey";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useOverview } from "@/data/survey/initiator/overview";
import { useRouter } from "next/router";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
import { useInformation } from "@/data/survey/initiator/informasi";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "Survei", path: "/survey" },
  { name: "Form Survei", path: "/survey/initiator/overview" },
];

const index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showModalSurveyDetail, setShowModalSurveyDetail] = useState(false);
  const [showModalExtensionRequest, setShowModalExtensionRequest] =
    useState(false);
  const [showModalTerminateRequest, setShowModalTerminateRequest] =
    useState(false);
  const [showModalManageRespondenRequest, setShowModalManageRespondenRequest] =
    useState(false);

  const [totalData, setTotalData] = useState(0);
  const [selectedSurveyId, setSelectedSurveyId] = useState(0);
  const [noteExtension, setNoteExtension] = useState("");
  const [noteTerminate, setNoteTerminate] = useState("");
  const [noteManageResponden, setNoteManageResponden] = useState("");

  const [filter, setFilter] = useState({
    nama_pembuat: "",
    pn_responden: "",
    project_code: "",
    status_approver: "",
    status_survey: "",
    jenis_survey: "",
    tanggal_dimulai: "",
    tanggal_selesai: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });
  const [params, setParams] = useState({
    nama_pembuat: "",
    pn_responden: "",
    project_code: "",
    status_approver: "",
    status_survey: "",
    jenis_survey: "",
    tanggal_dimulai: "",
    tanggal_selesai: "",
    sort_by: "ASC",
    limit: 3,
    page: 1,
  });

  const { overview, overviewMutate } = useOverview("all", params);
  const { information } = useInformation({ id: selectedSurveyId });

  useEffect(() => {
    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
      };
    });
  }, [filter.limit]);

  useEffect(() => {
    setTotalData(overview?.pagination?.totalData);
    if (overview?.data?.length) {
      const mapping = overview?.data?.map((v) => {
        return {
          id: v.id,
          jenis_kode: v.jenis_survey_kode,
          jenis_nama: v.jenis_survey_name,
          nama_survey: v.nama_survey,
          kode: v.project_survey_id,
          desc: v.deskripsi,
          tanggal_pelaksanaan: `${v.pelaksanaan_start} s/d ${v.pelaksanaan_end}`,
          createdBy: v.create_by,
          createdAt: v.createdAt,
          status_kode: v.status_kode,
          status_name: v.status_name,
          status_persetujuan: v.status_persetujuan,
          catatan_perpanjangan: v.catatan_perpanjangan,
          catatan_pemberhentian: v.catatan_pemberhentian,
        };
      });

      setData(mapping);
    } else {
      setData([]);
    }
  }, [overview]);

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

  const handleShowFilter = () => {
    setShowFilter((prev) => {
      return !prev;
    });
  };

  const handleChangeFilter = (props, value) => {
    setFilter((prev) => {
      return {
        ...prev,
        [props]: value,
      };
    });
  };

  const handleClickApproval = (id) => {
    router.push(`overview/${id}?is_approval=true`);
  };

  const handleClickDetail = (id) => {
    setShowModalSurveyDetail(true);
    setSelectedSurveyId(id);
  };

  const handleClickDownload = (id) => {
    router.push(`overview/${id}/preview?is_print=true`);
  };

  const handleClickShowScoreSurvey = (id) => {
    router.push(`overview/${id}/penilaian`);
  };

  const handleTerminateRequestSurvey = (id, survey_id, status_kode) => {
    if (status_kode == 4) {
      setSelectedSurveyId(survey_id);
      setShowModalTerminateRequest(true);
    } else {
      router.push(`overview/${survey_id}?is_approval=true&terminate=${id}`);
    }
  };

  const handleExtensionRequestSurvey = (id, survey_id, status_kode) => {
    if (status_kode == 5) {
      setSelectedSurveyId(survey_id);
      setShowModalExtensionRequest(true);
    } else {
      router.push(`overview/${survey_id}?is_approval=true&extension=${id}`);
    }
  };

  const handleManageRespondenRequest = async (id, survey_id, status_kode) => {
    if (status_kode != 8) {
      setSelectedSurveyId(survey_id);
      setShowModalManageRespondenRequest(true);
    } else {
      router.push(
        `overview/${survey_id}/responden?is_request_manage_responden=true`
      );
    }
  };

  const handleDeleteSurvey = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus survey ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/delete/${id}`
    );
    overviewMutate();
    loadingSwal("close");
  };

  const handleCloseModalSurveyDetail = () => {
    setShowModalSurveyDetail(false);
  };

  // [ START ] Handler for modal extension request
  const handleCloseModalExtensionRequest = () => {
    setNoteExtension("");
    setShowModalExtensionRequest(false);
  };

  const handleChangeNoteExtension = (e) => {
    setNoteExtension(e.target.value);
  };

  const handleSubmitExtensionRequest = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/catatan_perpanjangan/create`,
      { survey_id: selectedSurveyId, note: noteExtension }
    );

    overviewMutate();
    handleCloseModalExtensionRequest();
    loadingSwal("close");
  };
  // [ END ] Handler for modal extension request

  // [ START ] Handler for modal terminate request
  const handleCloseModalTerminateRequest = () => {
    setNoteTerminate("");
    setShowModalTerminateRequest(false);
  };

  const handleChangeNoteTerminate = (e) => {
    setNoteTerminate(e.target.value);
  };

  const handleSubmitTerminateRequest = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/catatan_pemberhentian/create`,
      { survey_id: selectedSurveyId, note: noteTerminate }
    );

    overviewMutate();
    handleCloseModalTerminateRequest();
    loadingSwal("close");
  };
  // [ END ] Handler for modal terminate request

  // [ START ] Handler for modal manage responden request
  const handleCloseModalManageRespondenRequest = () => {
    setNoteManageResponden("");
    setShowModalManageRespondenRequest(false);
  };

  const handleChangeNoteManageResponden = (e) => {
    setNoteManageResponden(e.target.value);
  };

  const handleSubmitManageRespondenRequest = async () => {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/catatan_manage_responden/create`,
      { survey_id: selectedSurveyId, note: noteManageResponden },
      true
    );
    router.push(
      `overview/${selectedSurveyId}/responden?is_request_manage_responden=true`
    );

    overviewMutate();
    handleCloseModalManageRespondenRequest();
    loadingSwal("close");
  };
  // [ END ] Handler for modal manage responden request

  return (
    <LandingLayoutSurvey overflowY={true}>
      <div className="w-full h-full pr-16 pb-20">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Survei Overview"} />
        </div>
        <div className="flex items-end gap-4">
          {/* Start Filter */}
          <div className="flex justify-between items-center gap-2">
            <div className="w-36 rounded bg-atlasian-blue-light">
              <ButtonField
                handler={handleShowFilter}
                text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
              />
            </div>
            <div className="w-36 rounded bg-atlasian-purple">
              <ButtonField
                handler={() => router.push(`overview/new`)}
                text={"Buat Form"}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <CardFilterOverview
            showFilter={showFilter}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
        <div className="w-full flex items-end justify-end">
          <SelectSortFilter change={handleChangeFilter} />
        </div>
        {/* Start Content */}
        {!data?.length ? (
          <DataNotFound />
        ) : (
          data?.length && (
            <div className="grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 px-0.5 py-4">
              {data.map((item, idx) => {
                return (
                  <CardOverview
                    key={idx}
                    data={item}
                    handleTerminateRequestSurvey={handleTerminateRequestSurvey}
                    handleDetailSurvey={handleClickDetail}
                    handleDownloadSurvey={handleClickDownload}
                    handleApprovalSurvey={handleClickApproval}
                    handleChangeRespondenSurvey={handleManageRespondenRequest}
                    handleExtensionRequestSurvey={handleExtensionRequestSurvey}
                    handleShowScoreSurvey={handleClickShowScoreSurvey}
                    handleDeleteSurvey={handleDeleteSurvey}
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
        {/* End Content */}
      </div>
      <ModalDetailSurvey
        showModal={showModalSurveyDetail}
        handleCloseModal={handleCloseModalSurveyDetail}
        data={information?.data}
      />
      <ModalRequestExtensionAndTermination
        isExtensionRequest
        showModal={showModalExtensionRequest}
        handleChangeNote={handleChangeNoteExtension}
        handleCloseModal={handleCloseModalExtensionRequest}
        handleSubmit={handleSubmitExtensionRequest}
      />
      <ModalRequestExtensionAndTermination
        showModal={showModalTerminateRequest}
        handleChangeNote={handleChangeNoteTerminate}
        handleCloseModal={handleCloseModalTerminateRequest}
        handleSubmit={handleSubmitTerminateRequest}
      />
      <ModalRequestManageResponden
        showModal={showModalManageRespondenRequest}
        handleChangeNote={handleChangeNoteManageResponden}
        handleCloseModal={handleCloseModalManageRespondenRequest}
        handleSubmit={handleSubmitManageRespondenRequest}
      />
    </LandingLayoutSurvey>
  );
};

export default index;
