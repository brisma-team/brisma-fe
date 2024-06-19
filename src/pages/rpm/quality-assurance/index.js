import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import _ from "lodash";
import {
  CardOverview,
  CardFilterOverview,
} from "@/components/molecules/rpm/quality-assurance/overview";
import { useApprovalRPM } from "@/data/rpm/kegiatan";
import { useOverviewRPM, useProjectEWPList } from "@/data/rpm/common/overview";
import { OverviewLayoutEWP } from "@/layouts/ewp";
import { ModalAddProjectRPM } from "@/components/molecules/rpm/common/overview";
import { confirmationSwal, fetchApi, infoSwal, loadingSwal } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjData,
  setObjDataProjectEWPList,
  setObjPayload,
  // setValidationErrors,
  resetObjData,
  resetObjDataProjectEWPList,
  resetObjPayload,
  // resetValidationErrors,
} from "@/slices/rpm/quality-assurance/overviewRPMQualityAssuranceSlice";
// import overviewRPMSchema from "@/helpers/schemas/rpm/overview/overviewRPMSchema";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "RPM", path: "/rpm" },
  { name: "Quality Assurance", path: "/rpm/quality-assurance" },
];

const index = () => {
  const dispatch = useDispatch();
  const [currentModalStage, setCurrentModalStage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [totalDataOverview, setTotalDataOverview] = useState(1);
  const [totalDataProjectEWPList, setTotalDataProjectEWPList] = useState(1);

  const [filterOverview, setFilterOverview] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    pic_initiator: "",
    pic_submitter: "",
    pic_evaluator: "",
    pic_negotiator: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [paramsOverview, setParamsOverview] = useState({
    project_code: "",
    project_name: "",
    status_approval: "",
    pic_initiator: "",
    pic_submitter: "",
    pic_evaluator: "",
    pic_negotiator: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [filterProjectEWPList, setFilterProjectEWPList] = useState({
    ref_metode: "",
    ref_tipe: "",
    project_id: "",
    limit: 4,
    page: 1,
  });
  const [paramsProjectEWPList, setParamsProjectEWPList] = useState({
    ref_metode: "",
    ref_tipe: "",
    project_id: "",
    limit: 4,
    page: 1,
  });

  const data = useSelector(
    (state) => state.overviewRPMQualityAssurance.objData
  );
  const dataProjectEWPList = useSelector(
    (state) => state.overviewRPMQualityAssurance.objDataProjectEWPList
  );
  const payload = useSelector(
    (state) => state.overviewRPMQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.overviewRPMQualityAssurance.validationErrors
  );

  const { approvalRPM } = useApprovalRPM();

  const { overviewRPM, overviewRPMMutate } = useOverviewRPM({
    ...paramsOverview,
    module: "qa",
  });
  const { projectEWPList, projectEWPListMutate } = useProjectEWPList({
    ...paramsProjectEWPList,
    module: "qa",
  });

  useEffect(() => {
    const handleSearch = () => {
      setParamsOverview(filterOverview);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filterOverview]);

  useEffect(() => {
    const handleSearch = () => {
      setParamsProjectEWPList(filterProjectEWPList);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filterProjectEWPList]);

  useEffect(() => {
    dataProjectEWPList;
  }, [dataProjectEWPList]);

  useEffect(() => {
    if (overviewRPM?.data?.length) {
      const mapping = overviewRPM.data.map((data) => {
        return {
          ..._.pick(data, [
            "id",
            "create_by",
            "createdAt",
            "total_action_plan",
            "action_plan_memadai",
          ]),
          tipe: data?.ref_tipe?.nama,
          project_code: data?.num_project,
          project_name: data?.nama_project,
          pic_submitter: data?.pic_auditee,
          pic_evaluator: data?.pic_auditor,
          pic_negotiator: data?.pic_nego,
          submitter: [],
          evaluator: [],
          status_approval: data?.status_persetujuan,
        };
      });
      dispatch(setObjData(mapping));
      setTotalDataOverview(overviewRPM?.pagination?.totalData);
    } else {
      dispatch(resetObjData());
      setTotalDataOverview(1);
    }
  }, [overviewRPM]);

  useEffect(() => {
    if (projectEWPList?.data?.length) {
      const mapping = projectEWPList?.data?.map((project) => {
        return {
          ..._.pick(project, [
            "ref_metode",
            "ref_tipe",
            "project_id",
            "project_name",
          ]),
          ewp_id: project?.id,
        };
      });
      dispatch(setObjDataProjectEWPList(mapping));
      setTotalDataProjectEWPList(projectEWPList?.pagination?.totalData);
    } else {
      dispatch(resetObjDataProjectEWPList());
      setTotalDataProjectEWPList(0);
    }
  }, [projectEWPList]);

  // [ START ] handler for filter overview
  const handleChangeFilterOverview = (props, value) => {
    setFilterOverview({ ...filterOverview, [props]: value });
  };
  // [ END ] handler for filter overview

  // [ START ] handler for filter project EWP list
  const handleChangeFilterProjectEWPList = (property, value) => {
    setFilterProjectEWPList({ ...filterProjectEWPList, [property]: value });
  };
  // [ END ] handler for filter project EWP list

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    setCurrentModalStage(1);
    dispatch(resetObjPayload());
    // dispatch(resetValidationErrors());
  };

  const handleChangePayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  // [ START ] handler for modal add project RPM
  const handlePrevStage = async () => {
    setCurrentModalStage(currentModalStage - 1);
  };

  const handleNextStage = async () => {
    if (currentModalStage === 1 && !payload?.ewp_id) {
      await infoSwal("Mohon pilih proyek terlebih dahulu!");
      return;
    }

    setCurrentModalStage(currentModalStage + 1);
  };

  const handleSubmitForm = async () => {
    // const schemaMapping = {
    //   schema: overviewRPMSchema,
    //   resetErrors: resetValidationErrors,
    //   setErrors: setValidationErrors,
    // };

    // const validate = setErrorValidation(payload, dispatch, schemaMapping);

    // if (validate) {
    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/projects/init`,
      {
        ewp_id: payload?.ewp_id,
        pic_auditee: {
          pn: payload?.pic_submitter?.pn,
          nama: payload?.pic_submitter?.nama,
        },
        pic_auditor: {
          pn: payload?.pic_evaluator?.pn,
          nama: payload?.pic_evaluator?.nama,
        },
        pic_nego: {
          pn: payload?.pic_negotiator?.pn,
          nama: payload?.pic_negotiator?.nama,
        },
      }
    );
    loadingSwal("close");
    setShowModal(false);
    overviewRPMMutate();
    projectEWPListMutate();
    dispatch(resetObjPayload());
    setCurrentModalStage(1);
  };
  // [ START ] handler for modal add project RPM

  const handleClickDisableProject = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin non-aktifkan project ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/disable/${id}`,
      {}
    );
    loadingSwal("close");
  };

  const handleCloseProject = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah Anda yakin ingin finalkan project ini?"
    );
    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/close/${id}`,
      {}
    );
    loadingSwal("close");
  };
  return (
    <OverviewLayoutEWP data={approvalRPM?.data?.header}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flexitems-center mb-6">
        <PageTitle text={"RPM Kegiatan Overview"} />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-40 rounded bg-atlasian-purple">
            <ButtonField
              handler={() => setShowModal(true)}
              text={"Buat Project RPM"}
            />
          </div>
        </div>
        {/* <div className="w-24 rounded bg-atlasian-blue-light">
          <ButtonField
            icon={<IconFile primaryColor="white" />}
            isCentered={false}
            text={`Arsip`}
          />
        </div> */}
      </div>
      <div className="">
        <CardFilterOverview
          showFilter={showFilter}
          filter={filterOverview}
          setFilter={setFilterOverview}
        />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilterOverview}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {data?.length ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3 my-4">
          {data.map((v, i) => {
            return (
              <CardOverview
                key={i}
                data={v}
                pathName={`/rpm/quality-assurance`}
                handleClickDisableProject={handleClickDisableProject}
                handleCloseProject={handleCloseProject}
              />
            );
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
      <CustomPagination
        perPage={filterOverview.limit}
        defaultCurrentPage={1}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilterOverview("page", pageNow)
        }
        totalData={totalDataOverview}
      />
      <ModalAddProjectRPM
        showModal={showModal}
        dataProjectEWPList={dataProjectEWPList}
        payload={payload}
        validation={validation}
        filter={filterProjectEWPList}
        totalData={totalDataProjectEWPList}
        currentModalStage={currentModalStage}
        handleChangeFilter={handleChangeFilterProjectEWPList}
        handleCloseModal={handleCloseModal}
        handleChangePayload={handleChangePayload}
        handlePrevStage={handlePrevStage}
        handleNextStage={handleNextStage}
        handleSubmit={handleSubmitForm}
      />
      {/* End Content */}
    </OverviewLayoutEWP>
  );
};

export default index;
