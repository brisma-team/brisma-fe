import React, { useEffect, useState } from "react";
import { OverviewLayoutEWP } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import {
  confirmationSwal,
  convertDate,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import {
  CardOverview,
  CardFilterOverview,
} from "@/components/molecules/ewp/quality-assurance/overview";
import { useApprovalEWP } from "@/data/ewp";
import useUser from "@/data/useUser";
import { useOverview } from "@/data/ewp/quality-assurance/overview";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjPayload,
  setValidationErrorsSchedulePAT,
  setValidationErrorsSummaryPAT,
  setValidationErrorsScheduleNonPAT,
  resetObjData,
  resetObjPayload,
  resetValidationErrorsSchedulePAT,
  resetValidationErrorsSummaryPAT,
  resetValidationErrorsScheduleNonPAT,
} from "@/slices/ewp/quality-assurance/overview/overviewEWPQualityAssuranceSlice";
import {
  schedulePATSchema,
  summaryPATSchema,
  scheduleNonPATSchema,
} from "@/helpers/schemas/ewp/common/overviewEWPSchema";
import { ModalAddProjectEWP } from "@/components/molecules/ewp/common/overview";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Quality Assurance / Overview", path: "/ewp/quality-assurance" },
];

const convertProgressAndPercent = (status) => {
  let progress, percent;
  switch (status) {
    case "init project":
      progress = 0;
      percent = "0%";
      break;
    case "mapa":
      progress = 0.2;
      percent = "20%";
      break;
    case "pelaksanaan":
      progress = 0.4;
      percent = "40%";
      break;
    case "monitoring":
      progress = 0.6;
      percent = "60%";
      break;
    case "wrapup":
      progress = 0.8;
      percent = "80%";
      break;
    case "final":
      progress = 1;
      percent = "100%";
      break;
  }
  return { progress, percent };
};

const index = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [totalData, setTotalData] = useState(1);

  // [ START ] state for modal add project
  const [showModal, setShowModal] = useState(false);
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [isPat, setIsPat] = useState(false);
  const [maxStage, setMaxStage] = useState(null);
  const [differentPIC, setDifferentPIC] = useState(true);
  // [ END ] state for modal add project

  const data = useSelector(
    (state) => state.overviewEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.overviewEWPQualityAssurance.objPayload
  );
  const validationErrorsSchedulePAT = useSelector(
    (state) => state.overviewEWPQualityAssurance.validationErrorsSchedulePAT
  );
  const validationErrorsSummaryPAT = useSelector(
    (state) => state.overviewEWPQualityAssurance.validationErrorsSummaryPAT
  );
  const validationErrorsScheduleNonPAT = useSelector(
    (state) => state.overviewEWPQualityAssurance.validationErrorsScheduleNonPAT
  );

  const [filter, setFilter] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    status_document: "",
    anggota_tim_audit: "",
    start_date: "",
    end_date: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  const schemaMappings = {
    true: {
      2: {
        schema: schedulePATSchema,
        resetErrors: resetValidationErrorsSchedulePAT,
        setErrors: setValidationErrorsSchedulePAT,
      },
      3: {
        schema: summaryPATSchema,
        resetErrors: resetValidationErrorsSummaryPAT,
        setErrors: setValidationErrorsSummaryPAT,
      },
    },
    false: {
      2: {
        schema: scheduleNonPATSchema,
        resetErrors: resetValidationErrorsScheduleNonPAT,
        setErrors: setValidationErrorsScheduleNonPAT,
      },
    },
  };

  const { overview, overviewMutate } = useOverview(params);
  const { approvalEWP } = useApprovalEWP("ewp");
  const { user } = useUser();

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

  useEffect(() => {
    if (overview?.data?.length) {
      const mapping = overview.data.map((v) => {
        const {
          createdAt,
          need_approved,
          number_adendum,
          status_name,
          status_persetujuan_name,
          project_id,
          project_name,
          initiator,
        } = v;
        return {
          id: v?.id,
          tipe: v?.ref_tipe?.nama,
          jenis: v?.ref_jenis?.nama,
          project_code: project_id,
          project_name: project_name,
          period: `${convertDate(
            v?.info_periode_pelaksanaan_start,
            "-",
            "d"
          )} s/d ${convertDate(v?.info_periode_pelaksanaan_end, "-", "d")}`,
          progress: convertProgressAndPercent(v?.status_name).progress,
          percent: convertProgressAndPercent(v?.status_name).percent,
          auditor: v?.info_team_audit?.auditor || [],
          auditee: v?.info_team_audit?.auditee || [],
          ata: v?.info_team_audit?.ata || [],
          document_status: status_name,
          approval_status: status_persetujuan_name,
          addendum: number_adendum,
          need_approval: need_approved,
          href: `/ewp/projects/konsulting/${v?.id}/info`,
          created_at: createdAt,
          maker: `${initiator?.pn} - ${initiator?.nama}`,
        };
      });
      dispatch(setObjData(mapping));
      setTotalData(overview?.pagination?.totalData);
    } else {
      dispatch(resetObjData());
      setTotalData(1);
    }
  }, [overview]);

  // [ START ] hook for modal add project
  useEffect(() => {
    if (isPat) {
      setMaxStage(3);
    } else {
      setMaxStage(4);
    }
  }, [isPat]);
  // [ END ] hook for modal add project

  // [ START ] handler for modal add project
  const handleChangePayload = (props, value) => {
    dispatch(
      setObjPayload({
        ...payload,
        [props]: value,
      })
    );
  };

  const handleChangePICPayload = (e) => {
    dispatch(
      setObjPayload({
        ...payload,
        pn_approver: e.value.pn,
        nama_approver: e.value.name,
      })
    );
  };

  const handleIsPAT = (value) => {
    setIsPat(value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const validate = setErrorValidation(
      payload,
      dispatch,
      schemaMappings[isPat][currentModalStage]
    );

    if (validate) {
      const buttonName = e.target.offsetParent.name;
      const data = {
        ...payload,
        is_pat: isPat,
        audit_year: !isPat
          ? parseInt(new Date().getFullYear())
          : payload.audit_year,
        project_terkait:
          _.map(payload?.project_terkait, ({ project_id, project_name }) => ({
            project_id,
            project_name,
          })) || [],
      };

      if (buttonName === "saveButton" || buttonName === "sendApprovalButton") {
        if (
          isPat &&
          currentModalStage === maxStage &&
          differentPIC &&
          !payload?.pn_approver
        ) {
          dispatch(
            setValidationErrorsSummaryPAT({ pn_approver: "Wajib diisi" })
          );
          return;
        }

        loadingSwal();
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/auditor/create`,
          data
        );
        setShowModal(false);
        setCurrentModalStage(1);
        setIsPat(true);
        dispatch(resetObjPayload());
        overviewMutate();
        loadingSwal("close");
      }
    }
  };

  const handlePrevStage = async () => {
    setCurrentModalStage(currentModalStage - 1);
  };

  const handleNextStage = async () => {
    const data = {
      ...payload,
      is_pat: isPat,
    };

    const validate = setErrorValidation(
      data,
      dispatch,
      schemaMappings[isPat][currentModalStage]
    );

    if (validate) {
      setCurrentModalStage(currentModalStage + 1);
    }
  };

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setCurrentModalStage(1);
    setIsPat(true);
    dispatch(resetObjPayload());
  };

  // [ START ] Handler for change data on sub modal ModalBodySchedule PAT
  const handleClickRowTableSchedulePAT = (value) => {
    const {
      id,
      name_kegiatan_audit,
      ref_penanggung_jawabs,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      audited,
      createdAt,
      create_by,
      deskripsi,
    } = value;

    const updatedData = {
      ...payload,
      project_name: name_kegiatan_audit,
      pat_jadwal_kegiatan_id: id,
      ref_metode,
      ref_jenis,
      ref_tipe,
      ref_tema,
      audited,
      deskripsi,
      ref_penanggung_jawabs,
      createdAt,
      create_by,
    };
    dispatch(setObjPayload(updatedData));

    const result = ref_penanggung_jawabs?.find((v) => v?.pn == user?.data?.pn);
    setDifferentPIC(!result);
  };
  // [ END ] Handler for change data on sub modal ModalBodySchedule PAT

  // [ START ] Handler for change data on sub modal ModalBodyDocument Non-PAT
  const handleUploadSurat = ({ url, fileName }) => {
    dispatch(
      setObjPayload({
        ...payload,
        url_file_surat: url,
        nama_file_surat: fileName,
      })
    );
  };
  // [ END ] Handler for change data on sub modal ModalBodyDocument Non-PAT

  // [ END ] handler for modal add project

  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };
  return (
    <OverviewLayoutEWP data={approvalEWP?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex items-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField
              handler={() => setShowModal(true)}
              text={"Buat Project"}
            />
          </div>
        </div>
      </div>
      <div className="">
        <CardFilterOverview
          showFilter={showFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilter}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {data?.length ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
          {data.map((v, i) => {
            return <CardOverview key={i} data={v} />;
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
      <CustomPagination
        perPage={filter.limit}
        defaultCurrentPage={1}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        totalData={totalData}
      />
      <ModalAddProjectEWP
        module={"qa"}
        showModal={showModal}
        payload={payload}
        user={user?.data}
        currentModalStage={currentModalStage}
        setCurrentModalStage={setCurrentModalStage}
        isPat={isPat}
        maxStage={maxStage}
        differentPIC={differentPIC}
        validationErrorsSchedulePAT={validationErrorsSchedulePAT}
        validationErrorsSummaryPAT={validationErrorsSummaryPAT}
        validationErrorsScheduleNonPAT={validationErrorsScheduleNonPAT}
        handleChangePayload={handleChangePayload}
        handleChangePICPayload={handleChangePICPayload}
        handleIsPAT={handleIsPAT}
        handleSubmitForm={handleSubmitForm}
        handlePrevStage={handlePrevStage}
        handleNextStage={handleNextStage}
        handleCloseModal={handleCloseModal}
        handleClickRowTableSchedulePAT={handleClickRowTableSchedulePAT}
        handleUploadSurat={handleUploadSurat}
      />
      {/* End Content */}
    </OverviewLayoutEWP>
  );
};

export default index;
