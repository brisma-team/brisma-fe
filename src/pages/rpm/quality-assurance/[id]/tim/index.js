import React, { useEffect, useState } from "react";
import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useRouter } from "next/router";
import { LandingLayoutRPM } from "@/layouts/rpm";
import { useTimOverview } from "@/data/rpm/common/object-overview";
import { useProjectDetailRPM } from "@/data/rpm/common";
import _ from "lodash";
import { fetchApi, loadingSwal, setErrorValidation } from "@/helpers";
import { CardTeam } from "@/components/molecules/ewp/konsulting/perencanaan/tim-timeplan";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/rpm/quality-assurance/timOverviewRPMQualityAssuranceSlice";
import { useDispatch, useSelector } from "react-redux";
import timOverviewRPMSchema from "@/helpers/schemas/rpm/object-overview/timOverviewRPMSchema";

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { projectDetailRPM } = useProjectDetailRPM({
    id: params?.id,
    module: "qa",
  });
  const { timOverview, timOverviewMutate } = useTimOverview({
    id: params?.id,
    module: "qa",
  });

  const data = useSelector(
    (state) => state.timOverviewRPMQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.timOverviewRPMQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.timOverviewRPMQualityAssurance.validationErrors
  );

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "RPM", path: "/rpm" },
      { name: "Overview", path: "/rpm/quality-assurance" },
      {
        name: projectDetailRPM?.data?.project?.project_id?.toUpperCase(),
        path: `/rpm/quality-assurance/${params?.id}/overview`,
      },
      {
        name: "Team Management",
        path: `/rpm/quality-assurance/${params?.id}/tim`,
      },
    ]);
  }, [projectDetailRPM]);

  useEffect(() => {
    const response = timOverview?.data;
    if (response) {
      dispatch(
        setObjData({
          ..._.pick(response, ["pic_auditee", "pic_auditor", "pic_nego"]),
        })
      );
      dispatch(setObjPayload(response?.tim));
    } else {
      dispatch(resetObjData());
      dispatch(resetObjPayload());
    }
  }, [timOverview]);

  const handleAddObjectInsideArray = (property) => {
    const newTimAudit = [...payload[property]];
    newTimAudit.push({ pn: "", nama: "" });
    dispatch(setObjPayload({ ...payload, [property]: newTimAudit }));
  };

  const handleDeleteObjectInsideArray = (index, property) => {
    const newData = [...payload[property]];
    newData.splice(index, 1);
    dispatch(setObjPayload({ ...payload, [property]: newData }));
  };

  const handleChangeSelectValueObjectInsideArray = (property, index, value) => {
    const newData = [...payload[property]];
    const updated = {
      ...newData[index],
      pn: value?.pn,
      nama: value?.name,
    };
    newData[index] = updated;
    dispatch(
      setObjPayload({
        ...payload,
        [property]: newData,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: timOverviewRPMSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/qa/projects/tim/${params?.id}`,
        {
          ..._.pick(data, ["pic_auditee", "pic_auditor", "pic_nego"]),
          tim: {
            submitter: payload?.submitter?.length
              ? payload?.submitter?.map((submitter) => {
                  return {
                    ..._.pick(submitter, ["pn", "nama"]),
                    title: "submitter",
                  };
                })
              : [],
            evaluator: payload?.evaluator?.length
              ? payload?.evaluator?.map((evaluator) => {
                  return {
                    ..._.pick(evaluator, ["pn", "nama"]),
                    title: "evaluator",
                  };
                })
              : [],
          },
        }
      );
      timOverviewMutate();
      loadingSwal("close");
    }
  };

  return (
    <LandingLayoutRPM module_page={"quality-assurance"} module_data={"qa"}>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="mb-6">
        <PageTitle text={"Team Management"} />
      </div>
      <div className="flex flex-col gap-3 w-[40rem]">
        <Card>
          <div className="w-full py-3 px-5 flex gap-4">
            <CardTeam
              isUserSKAI
              data={payload}
              validation={validation}
              // withoutButton={
              //   isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
              // }
              // isDisabled={
              //   isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
              // }
              property={"submitter"}
              title={"Submitter"}
              textColorTitle={"text-atlasian-blue-light"}
              handleAdd={handleAddObjectInsideArray}
              handleDelete={handleDeleteObjectInsideArray}
              handleChangeSelect={handleChangeSelectValueObjectInsideArray}
            />
            <CardTeam
              isUserSKAI
              data={payload}
              validation={validation}
              // withoutButton={
              //   isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
              // }
              // isDisabled={
              //   isCloseSubmodule ? true : !isOnProgress ? true : !isInitiator
              // }
              property={"evaluator"}
              title={"Evaluator"}
              textColorTitle={"text-atlasian-yellow"}
              handleAdd={handleAddObjectInsideArray}
              handleDelete={handleDeleteObjectInsideArray}
              handleChangeSelect={handleChangeSelectValueObjectInsideArray}
            />
          </div>
        </Card>
        <div className="flex justify-end">
          <div className="w-36 bg-atlasian-green rounded">
            <ButtonField text={"Simpan"} handler={handleSubmit} />
          </div>
        </div>
      </div>
      {/* End Content */}
    </LandingLayoutRPM>
  );
};

export default index;
