import { Breadcrumbs } from "@/components/atoms";
import {
  CardContentHeaderFooter,
  DataNotFound,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { useAuditInfo } from "@/data/ewp/common/info";
import LandingLayoutEWPAgile from "@/layouts/ewp/LandingLayoutEWPAgile";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  CardContent,
  ModalCKEditor,
} from "@/components/molecules/ewp/agile/initiation/audit-canvas";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useDispatch, useSelector } from "react-redux";
import {
  setObjDataValue,
  setObjDataEvent,
  setObjDataFormatOfCommunication,
  setObjDataSettingExpectations,
  setObjDataEscalationPoints,
  setObjDataOtherMatters,
  setObjDataRoles,
  setObjPayloadValue,
  setObjPayloadEvent,
  setObjPayloadFormatOfCommunication,
  setObjPayloadSettingExpectations,
  setObjPayloadEscalationPoints,
  setObjPayloadOtherMatters,
  resetObjDataRoles,
  resetObjPayloadValue,
  resetObjPayloadEvent,
  resetObjPayloadFormatOfCommunication,
  resetObjPayloadSettingExpectations,
  resetObjPayloadEscalationPoints,
  resetObjPayloadOtherMatters,
} from "@/slices/ewp/agile/initiation/workingAgreementsEWPAgileSlice";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
// import _ from "lodash";
import { useWorkingAgreements } from "@/data/ewp/agile/initiation/working-agreements";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const routes = [
  {
    name: "Audit Canvas",
    slug: "audit-canvas",
  },
  {
    name: "Working Agrements",
    slug: "working-agreements",
  },
  { name: "Documents", slug: "dokumen" },
];

const index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const baseUrl = `/ewp/agile/${params?.id}/initiation`;

  const [dataProjectId, setDataProjectId] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [showModalValue, setShowModalValue] = useState(false);
  const [showModalEvent, setShowModalEvent] = useState(false);
  const [showModalFormatOfCommunication, setShowModalFormatOfCommunication] =
    useState(false);
  const [showModalSettingExpectations, setShowModalSettingExpectations] =
    useState(false);
  const [showModalEscalationPoints, setShowModalEscalationPoints] =
    useState(false);
  const [showModalOtherMatters, setShowModalOtherMatters] = useState(false);

  const dataValue = useSelector(
    (state) => state.workingAgreementsEWPAgile.objDataValue
  );
  const dataEvent = useSelector(
    (state) => state.workingAgreementsEWPAgile.objDataEvent
  );
  const dataFormatOfCommunication = useSelector(
    (state) => state.workingAgreementsEWPAgile.objDataFormatOfCommunication
  );
  const dataSettingExpectations = useSelector(
    (state) => state.workingAgreementsEWPAgile.objDataSettingExpectations
  );
  const dataEscalationPoints = useSelector(
    (state) => state.workingAgreementsEWPAgile.objDataEscalationPoints
  );
  const dataOtherMatters = useSelector(
    (state) => state.workingAgreementsEWPAgile.objDataOtherMatters
  );
  const dataRoles = useSelector(
    (state) => state.workingAgreementsEWPAgile.objDataRoles
  );
  const payloadValue = useSelector(
    (state) => state.workingAgreementsEWPAgile.objPayloadValue
  );
  const payloadEvent = useSelector(
    (state) => state.workingAgreementsEWPAgile.objPayloadEvent
  );
  const payloadFormatOfCommunication = useSelector(
    (state) => state.workingAgreementsEWPAgile.objPayloadFormatOfCommunication
  );
  const payloadSettingExpectations = useSelector(
    (state) => state.workingAgreementsEWPAgile.objPayloadSettingExpectations
  );
  const payloadEscalationPoints = useSelector(
    (state) => state.workingAgreementsEWPAgile.objPayloadEscalationPoints
  );
  const payloadOtherMatters = useSelector(
    (state) => state.workingAgreementsEWPAgile.objPayloadOtherMatters
  );

  const { auditInfo } = useAuditInfo({
    id: params?.id,
    module: "agile",
  });
  const { workingAgreements, workingAgreementsMutate } = useWorkingAgreements({
    id: params?.id,
  });

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    if (auditInfo?.data) {
      setBreadcrumbs([
        { name: "Menu", path: "/dashboard" },
        { name: "EWP", path: "/ewp" },
        { name: "Overview", path: "/ewp/agile" },
        {
          name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()}`,
          path: `/ewp/agile/${params?.id}/info`,
        },
        { name: "Project Initiation", path: baseUrl },
        { name: "Working Agreements", path: `${baseUrl}/working-agreements` },
      ]);
    } else {
      setBreadcrumbs([]);
    }
  }, [auditInfo]);

  useEffect(() => {
    if (auditInfo?.data) {
      setDataProjectId(auditInfo?.data?.project_info?.project_id);
    } else {
      setDataProjectId("");
    }
  }, [auditInfo]);

  useEffect(() => {
    const response = workingAgreements?.data?.working_aggreements;
    dispatch(setObjDataValue(response?.value || ""));
    dispatch(setObjDataEvent(response?.event || ""));
    dispatch(
      setObjDataFormatOfCommunication(response?.format_communication || "")
    );
    dispatch(
      setObjDataSettingExpectations(response?.setting_exppectations || "")
    );
    dispatch(setObjDataEscalationPoints(response?.escalation_points || ""));
    dispatch(setObjDataOtherMatters(response?.other_matters || ""));

    if (workingAgreements?.data?.mapa_tim_audit?.length) {
      const mappingData = workingAgreements?.data?.mapa_tim_audit?.map((v) => {
        let role;
        switch (v?.stc_auditor_type_team_kode) {
          case "ma":
            role = "Audit Product Owner";
            break;
          case "kta":
            role = "Audit Scrum Master";
            break;
          case "ata":
            role = "Audit Scrum Team";
            break;
        }
        return {
          role,
          pic: {
            pn: v?.pn_auditor,
            nama: v?.nama_auditor,
          },
        };
      });
      dispatch(setObjDataRoles(mappingData));
    } else {
      dispatch(resetObjDataRoles());
    }
  }, [workingAgreementsMutate]);

  // [ START ] handler for content BMC
  const handleEditValue = () => {
    setShowModalValue(true);
    dispatch(setObjPayloadValue(dataValue));
  };

  const handleEditEvent = () => {
    setShowModalEvent(true);
    dispatch(setObjPayloadEvent(dataEvent));
  };

  const handleEditFormatOfCommunication = () => {
    setShowModalFormatOfCommunication(true);
    dispatch(setObjPayloadFormatOfCommunication(dataFormatOfCommunication));
  };

  const handleEditSettingExpectations = () => {
    setShowModalSettingExpectations(true);
    dispatch(setObjPayloadSettingExpectations(dataSettingExpectations));
  };

  const handleEditEscalationPoints = () => {
    setShowModalEscalationPoints(true);
    dispatch(setObjPayloadEscalationPoints(dataEscalationPoints));
  };

  const handleEditOtherMatters = () => {
    setShowModalOtherMatters(true);
    dispatch(setObjPayloadOtherMatters(dataOtherMatters));
  };
  // [ END ] handler for content BMC

  // [ START ] handler for modal CKEditor
  const handleCloseModalCKEditor = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    dispatch(resetObjPayloadValue());
    dispatch(resetObjPayloadEvent());
    dispatch(resetObjPayloadFormatOfCommunication());
    dispatch(resetObjPayloadSettingExpectations());
    dispatch(resetObjPayloadEscalationPoints());
    dispatch(resetObjPayloadOtherMatters());
    setShowModalValue(false);
    setShowModalEvent(false);
    setShowModalFormatOfCommunication(false);
    setShowModalSettingExpectations(false);
    setShowModalEscalationPoints(false);
    setShowModalOtherMatters(false);
  };

  const handleChangeValue = (value) => {
    dispatch(setObjPayloadValue(value));
  };

  const handleChangeEvent = (value) => {
    dispatch(setObjPayloadEvent(value));
  };

  const handleChangeFormatOfCommunication = (value) => {
    dispatch(setObjPayloadFormatOfCommunication(value));
  };

  const handleChangeSettingExpectations = (value) => {
    dispatch(setObjPayloadSettingExpectations(value));
  };

  const handleChangeEscalationPoints = (value) => {
    dispatch(setObjPayloadEscalationPoints(value));
  };

  const handleChangeOtherMatters = (value) => {
    dispatch(setObjPayloadOtherMatters(value));
  };

  const handleSubmitCKEditor = async (type) => {
    const payload = { id: params?.id };
    let url = type.toLowerCase().replace(/ /g, "_");
    switch (type) {
      case "Value":
        payload.value = payloadValue;
        break;
      case "Event":
        payload.event = payloadEvent;
        break;
      case "Format of Communication":
        payload.format_communication = payloadFormatOfCommunication;
        break;
      case "Setting Expectations":
        payload.setting_exppectations = payloadSettingExpectations;
        break;
      case "Escalation Points":
        payload.escalation_points = payloadEscalationPoints;
        break;
      case "Other Matters":
        payload.other_matters = payloadOtherMatters;
        break;
    }

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/working_aggreements/${url}`,
      payload
    );
    workingAgreementsMutate();
    setShowModalValue(false);
    setShowModalEvent(false);
    setShowModalFormatOfCommunication(false);
    setShowModalSettingExpectations(false);
    setShowModalEscalationPoints(false);
    setShowModalOtherMatters(false);
    loadingSwal("close");
  };
  // [ END ] handler for modal CKEditor

  return (
    <LandingLayoutEWPAgile>
      <div className="!w-[100rem]">
        {/* Start Breadcrumbs */}
        <Breadcrumbs data={breadcrumbs} />
        {/* End Breadcrumbs */}
        <div className="flex justify-end items-center mb-7">
          <PrevNextNavigation
            baseUrl={baseUrl}
            routes={routes}
            prevUrl={"/audit-canvas"}
            nextUrl={"/dokumen"}
            marginLeft={"-70px"}
          />
        </div>
        {/* Start Content */}
        <CardContentHeaderFooter
          header={
            <div className="p-3 font-semibold text-xl w-full flex items-center">
              Working Agreements : {dataProjectId?.toUpperCase() || ""}
            </div>
          }
        >
          <div className="p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="w-2/3 flex flex-col gap-3">
                <CardContent title={"Value"} handleClickEdit={handleEditValue}>
                  <div className="py-1.5">
                    <div
                      className="min-h-[10.5rem] max-h-[10.5rem] overflow-y-scroll px-2"
                      dangerouslySetInnerHTML={{
                        __html: dataValue,
                      }}
                    />
                  </div>
                </CardContent>
                <div className="flex gap-3">
                  <CardContent
                    title={"Event"}
                    handleClickEdit={handleEditEvent}
                  >
                    <div className="py-1.5">
                      <div
                        className="min-h-[10.5rem] max-h-[10.5rem] overflow-y-scroll px-2"
                        dangerouslySetInnerHTML={{
                          __html: dataEvent,
                        }}
                      />
                    </div>
                  </CardContent>
                  <CardContent
                    title={"Format of Communication"}
                    handleClickEdit={handleEditFormatOfCommunication}
                  >
                    <div className="py-1.5">
                      <div
                        className="min-h-[10.5rem] max-h-[10.5rem] overflow-y-scroll px-2"
                        dangerouslySetInnerHTML={{
                          __html: dataFormatOfCommunication,
                        }}
                      />
                    </div>
                  </CardContent>
                </div>
              </div>
              {/* [ START ] Value */}
              <div className="w-1/3">
                <CardContent title={"Roles"} withoutButton>
                  <div className="p-3">
                    <TableTree>
                      <Headers>
                        <Header
                          width="35%"
                          className="border-x border-t cell-custom-dataTables rounded-ss-lg"
                        >
                          <div
                            className={`custom-table-header text-sm font-semibold`}
                          >
                            Role
                          </div>
                        </Header>
                        <Header
                          width="65%"
                          className="border-t border-r cell-custom-dataTables rounded-se-lg"
                        >
                          <div className="custom-table-header text-sm font-semibold">
                            PN & Name
                          </div>
                        </Header>
                      </Headers>
                      {dataRoles?.length ? (
                        <div className="min-h-[21.5rem] max-h-[21.5rem] overflow-y-scroll">
                          <Rows
                            items={dataRoles}
                            render={({ role, pic }) => (
                              <Row>
                                <Cell
                                  width="35%"
                                  className={`border-x ${customCell}`}
                                >
                                  <div className="cell-custom-dataTables-padding-0">
                                    <p className="text-base">{role}</p>
                                  </div>
                                </Cell>
                                <Cell
                                  width="65%"
                                  className={`border-r ${customCell}`}
                                >
                                  <div className="cell-custom-dataTables-padding-0">
                                    <p className="text-base">{`${pic?.pn} - ${pic?.nama}`}</p>
                                  </div>
                                </Cell>
                              </Row>
                            )}
                          />
                        </div>
                      ) : (
                        <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
                          <DataNotFound />
                        </div>
                      )}
                    </TableTree>
                  </div>
                </CardContent>
              </div>
            </div>
            <div className="flex gap-3">
              {/* [ START ] Setting Expectations */}
              <CardContent
                title={"Setting Expectations"}
                handleClickEdit={handleEditSettingExpectations}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[25rem] max-h-[25rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataSettingExpectations,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Setting Expectations */}
              {/* [ START ] Escalation Points*/}
              <CardContent
                title={"Escalation Points"}
                handleClickEdit={handleEditEscalationPoints}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[25rem] max-h-[25rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataEscalationPoints,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Escalation Points*/}
              {/* [ START ] Other Matters*/}
              <CardContent
                title={"Other Matters"}
                handleClickEdit={handleEditOtherMatters}
              >
                <div className="py-1.5">
                  <div
                    className="min-h-[25rem] max-h-[25rem] overflow-y-scroll px-2"
                    dangerouslySetInnerHTML={{
                      __html: dataOtherMatters,
                    }}
                  />
                </div>
              </CardContent>
              {/* [ END ] Other Matters*/}
            </div>
          </div>
        </CardContentHeaderFooter>
        <ModalCKEditor
          title={"Value"}
          showModal={showModalValue}
          data={dataValue}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeValue}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Event"}
          showModal={showModalEvent}
          data={dataEvent}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeEvent}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Format of Communication"}
          showModal={showModalFormatOfCommunication}
          data={dataFormatOfCommunication}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeFormatOfCommunication}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Setting Expectations"}
          showModal={showModalSettingExpectations}
          data={dataSettingExpectations}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeSettingExpectations}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Escalation Points"}
          showModal={showModalEscalationPoints}
          data={dataEscalationPoints}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeEscalationPoints}
          handleSubmit={handleSubmitCKEditor}
        />
        <ModalCKEditor
          title={"Other Matters"}
          showModal={showModalOtherMatters}
          data={dataOtherMatters}
          handleCloseModal={handleCloseModalCKEditor}
          handleChange={handleChangeOtherMatters}
          handleSubmit={handleSubmitCKEditor}
        />
        {/* End Content */}
      </div>
    </LandingLayoutEWPAgile>
  );
};

export default index;
