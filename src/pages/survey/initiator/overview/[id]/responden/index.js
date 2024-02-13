import { Breadcrumbs, ButtonField, PageTitle } from "@/components/atoms";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { LandingLayoutSurvey } from "@/layouts/survey";
import {
  CardContentHeaderFooter,
  ModalWorkflow,
  NavigationTab,
} from "@/components/molecules/commons";
import {
  useRespondenByPnSurvey,
  useRespondenByUkerPnSurvey,
  useRespondenByUkerSurvey,
} from "@/data/survey/initiator/responden";
import {
  resetDataTables,
  resetDataWorkflow,
  resetDataHistoryWorkflow,
  resetPayloadNewResponden,
  resetPayloadNewUker,
  resetPayloadNewRespondenPnByUker,
  resetValidationErrorsWorkflow,
  setDataTables,
  setDataWorkflow,
  setDataHistoryWorkflow,
  setPayloadNewResponden,
  setPayloadNewUker,
  setPayloadNewRespondenPnByUker,
  setValidationErrorsWorkflow,
} from "@/slices/survey/initiator/respondenSurveySlice";
import {
  confirmationSwal,
  convertDate,
  errorSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import {
  TableRespondenPn,
  TableRespondenPnByUker,
  TableUker,
} from "@/components/molecules/survey/initiator/responden";
import { workflowSchema } from "@/helpers/schemas/survey/createSurveySchema";
import { useWorkflowSurvey } from "@/data/survey/initiator/buat-survey";
import { useInformation } from "@/data/survey/initiator/informasi";
import _ from "lodash";
import useUser from "@/data/useUser";

const index = () => {
  const dispatch = useDispatch();
  const { id, is_request_manage_responden } = useRouter().query;
  const navigationTabItems = [
    { idx: 1, title: "PN Responden" },
    { idx: 2, title: "UKER Responden" },
  ];
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "Survei", path: "/survey" },
    { name: "Overview", path: "/survey/initiator/overview" },
    {
      name: `Buat Survei / Template Kuesioner`,
      path: `/survey/initiator/overview/${id}`,
    },
    {
      name: `Responden`,
      path: `/survey/initiator/overview/${id}/responden`,
    },
  ];

  const [currentContentStage, setCurrentContentStage] = useState(1);
  const [isAddNewRowResponden, setIsAddNewRowResponden] = useState(false);
  const [isAddNewRowUker, setIsAddNewRowUker] = useState(false);
  const [isAddNewRowUkerPn, setIsAddNewRowUkerPn] = useState(false);
  const [isDisabledSaveRespondenPnByUker, setIsDisabledSaveRespondenPnByUker] =
    useState(false);
  const [isRefreshWorkflow, setIsRefreshWorkflow] = useState(false);

  const [showModalApproval, setShowModalApproval] = useState(false);
  const [selectedUkerId, setSelectedUkerId] = useState(0);
  const [statusApproval, setStatusApproval] = useState("On Progress");
  const [statusApprovalResponden, setStatusApprovalResponden] =
    useState("On Progress");

  const dataTables = useSelector((state) => state.respondenSurvey.dataTables);
  const dataWorkflow = useSelector(
    (state) => state.respondenSurvey.dataWorkflow
  );
  const dataHistoryWorkflow = useSelector(
    (state) => state.respondenSurvey.dataHistoryWorkflow
  );
  const payloadNewResponden = useSelector(
    (state) => state.respondenSurvey.payloadNewResponden
  );
  const payloadNewUker = useSelector(
    (state) => state.respondenSurvey.payloadNewUker
  );
  const payloadNewRespondenPnByUker = useSelector(
    (state) => state.respondenSurvey.payloadNewRespondenPnByUker
  );
  const validationErrorsWorkflow = useSelector(
    (state) => state.respondenSurvey.validationErrorsWorkflow
  );

  const { information, informationError } = useInformation({
    id,
  });
  const { respondenByPnSurvey, respondenByPnSurveyMutate } =
    useRespondenByPnSurvey({
      id,
    });
  const { respondenByUkerSurvey, respondenByUkerSurveyMutate } =
    useRespondenByUkerSurvey({
      id,
    });
  const {
    respondenByUkerPnSurvey,
    respondenByUkerPnSurveyError,
    respondenByUkerPnSurveyMutate,
  } = useRespondenByUkerPnSurvey({
    id: selectedUkerId,
  });
  const { workflowSurvey, workflowSurveyMutate } = useWorkflowSurvey(
    "catatan_manage_responden",
    {
      id: information?.data?.catatan_manage_responden[0]?.id,
    }
  );
  const { user } = useUser();

  useEffect(() => {
    if (!informationError) {
      setStatusApproval(information?.data?.status_persetujuan);
    }
  }, [information]);

  useEffect(() => {
    if (workflowSurvey?.data) {
      const workflowInfo = workflowSurvey?.data?.info;
      const maker = workflowInfo?.create_by;
      const approvers = workflowSurvey?.data?.approver;

      const newWorkflowData = {
        ...dataWorkflow,
        status_approver: workflowInfo?.status_persetujuan,
        on_approver: workflowInfo?.status_approver,
      };

      newWorkflowData.ref_tim_audit_maker = `${maker?.pn} - ${
        maker?.nama || maker?.fullName
      }`;
      newWorkflowData.maker = maker;

      newWorkflowData.ref_tim_audit_approver = approvers?.length
        ? approvers.map(({ pn, nama, is_signed }) => ({ pn, nama, is_signed }))
        : [];

      if (workflowSurvey?.data?.log?.length) {
        const mapping = workflowSurvey?.data?.log?.map((v) => {
          return {
            children: v?.children?.length
              ? v?.children?.map((child) => ({
                  role: "child",
                  pic: child?.from?.pn + " - " + child?.from?.nama,
                  alasan: child?.note,
                  status:
                    child?.is_signed === true
                      ? "Approved"
                      : child?.is_signed === false
                      ? "Rejected"
                      : child?.note || "",
                  tanggal: convertDate(v?.createdAt, "-", "d"),
                }))
              : [],
            id: v?.id,
            role: "parent",
            pic:
              v?.create_by?.pn +
              " - " +
              (v?.create_by?.nama || v?.create_by?.fullName),
            alasan: "",
            status: "",
            tanggal: convertDate(v?.createdAt, "-", "d"),
          };
        });
        dispatch(setDataHistoryWorkflow(mapping));
      }
      setStatusApprovalResponden(workflowInfo?.status_persetujuan);
      dispatch(setDataWorkflow(newWorkflowData));
    } else {
      const newWorkflowData = {
        status_approver: "On Progress",
        on_approver: "",
        ref_tim_audit_maker: `${user?.data?.pn} - ${user?.data?.fullName}`,
        maker: _.pick(user?.data, ["pn", "fullName"]),
        ref_tim_audit_approver: [],
      };

      dispatch(setDataWorkflow(newWorkflowData));
    }
    setIsRefreshWorkflow(false);
  }, [workflowSurvey, isRefreshWorkflow, user]);

  useEffect(() => {
    if (respondenByPnSurvey?.data?.length) {
      const filterData = respondenByPnSurvey.data.filter((v) => v.is_active);
      const mapping = filterData.map((responden, index) => {
        const { id, pn_responden, nama_responden, keterangan } = responden;
        return {
          index,
          id,
          pn_responden,
          nama_responden,
          keterangan,
          is_edit: false,
          is_new: false,
        };
      });
      dispatch(setDataTables({ ...dataTables, respondenPn: mapping }));
    } else {
      dispatch(setDataTables({ ...dataTables, respondenPn: [] }));
    }
    setIsAddNewRowResponden(false);
    dispatch(resetPayloadNewResponden());
  }, [respondenByPnSurvey, currentContentStage]);

  useEffect(() => {
    if (respondenByUkerSurvey?.data?.length) {
      const mapping = respondenByUkerSurvey.data.map((responden, index) => {
        const { id, orgeh_kode, orgeh_name, jumlah, keterangan } = responden;
        return {
          index,
          id,
          orgeh_kode,
          orgeh_name,
          jumlah,
          keterangan,
          is_edit: false,
          is_new: false,
        };
      });
      dispatch(setDataTables({ ...dataTables, respondenUker: mapping }));
    } else {
      dispatch(setDataTables({ ...dataTables, respondenUker: [] }));
    }
    setIsAddNewRowUker(false);
    dispatch(resetPayloadNewUker());
  }, [respondenByUkerSurvey]);

  useEffect(() => {
    if (!respondenByUkerPnSurveyError) {
      const mappingDataTablesResponden =
        respondenByUkerPnSurvey?.data?.ref_responden?.map(
          (responden, index) => {
            const { pernr, sname } = responden;
            return {
              index,
              pn_responden: pernr,
              nama_responden: sname,
            };
          }
        );

      const mappingSelectedResponden =
        respondenByUkerPnSurvey?.data?.responden?.map((responden, index) => {
          const { pn_responden, nama_responden, keterangan } = responden;
          return {
            index,
            pn_responden,
            nama_responden,
            keterangan,
          };
        });

      dispatch(
        setDataTables({
          ...dataTables,
          respondenUkerPn: mappingDataTablesResponden,
        })
      );
      dispatch(setPayloadNewRespondenPnByUker(mappingSelectedResponden));
    } else {
      dispatch(setDataTables({ ...dataTables, respondenUkerPn: [] }));
      dispatch(resetPayloadNewRespondenPnByUker());
    }
    setIsAddNewRowUkerPn(false);
    dispatch(resetPayloadNewResponden());
  }, [respondenByUkerPnSurvey]);

  useEffect(() => {
    setIsDisabledSaveRespondenPnByUker(!payloadNewRespondenPnByUker?.length);
  }, [payloadNewRespondenPnByUker]);

  // [START] Handler for responden
  const handleClickAddRowResponden = () => {
    if (currentContentStage === 1) {
      if (!isAddNewRowResponden) {
        const newDataTables = JSON.parse(JSON.stringify(dataTables));
        newDataTables.respondenPn.push({
          index: newDataTables.respondenPn.length,
          id: "",
          pn_responden: "",
          nama_responden: "",
          keterangan: "",
          is_edit: true,
          is_new: true,
        });
        dispatch(setDataTables(newDataTables));
        respondenByPnSurveyMutate();
        setIsAddNewRowResponden(true);
      }
    } else if (currentContentStage === 2) {
      if (!isAddNewRowUkerPn) {
        const newDataTables = JSON.parse(JSON.stringify(dataTables));
        newDataTables.respondenUkerPn.push({
          index: newDataTables.respondenUkerPn.length,
          id: "",
          pn_responden: "",
          nama_responden: "",
          keterangan: "",
          is_edit: true,
          is_new: true,
        });
        dispatch(setDataTables(newDataTables));
        respondenByUkerPnSurveyMutate();
        setIsAddNewRowUkerPn(true);
      }
    }
  };

  const handleClickDeleteResponden = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/responden/pn/${id}`,
      {}
    );
    setSelectedUkerId(0);
    respondenByPnSurveyMutate();
    respondenByUkerPnSurveyMutate();
    loadingSwal("close");
  };

  const handleClickSaveResponden = async () => {
    loadingSwal();
    if (!payloadNewResponden.pn) {
      await errorSwal("Silahkan pilih responden terlebih dahulu");
      return;
    }

    let path = "";
    const payload = {
      pn_responden: payloadNewResponden.pn,
      nama_responden: payloadNewResponden.name,
      keterangan: payloadNewResponden.keterangan,
    };

    if (currentContentStage === 1) {
      path = `responden/pn/${id}`;
    } else {
      if (!selectedUkerId) {
        await errorSwal("Silahkan pilih UKER terlebih dahulu");
        return;
      }

      path = `responden_uker/${selectedUkerId}`;
      payload.survey_uker_id = selectedUkerId;
    }

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/${path}`,
      payload
    );
    respondenByPnSurveyMutate();
    respondenByUkerSurveyMutate();
    respondenByUkerPnSurveyMutate();
    dispatch(resetPayloadNewResponden());
    setIsAddNewRowResponden(false);
    loadingSwal("close");
  };

  const handleChangeResponden = (value) => {
    const newPayload = {
      ...payloadNewResponden,
      pn: value.pn,
      name: value.name,
    };

    dispatch(setPayloadNewResponden(newPayload));
  };

  const handleChangeTextResponden = (props, value) => {
    const newPayload = {
      ...payloadNewResponden,
      [props]: value,
    };

    dispatch(setPayloadNewResponden(newPayload));
  };
  // [END] Handler for responden

  // [START] Handler for uker
  const handleClickAddRowUker = () => {
    if (!isAddNewRowUker) {
      const newDataTables = JSON.parse(JSON.stringify(dataTables));
      newDataTables.respondenUker.push({
        index: newDataTables.respondenUker.length,
        id: "",
        orgeh_kode: "",
        orgeh_name: "",
        jumlah: 0,
        keterangan: "",
        is_edit: true,
        is_new: true,
      });
      dispatch(setDataTables(newDataTables));
      respondenByPnSurveyMutate();
      setIsAddNewRowUker(true);
    }
  };

  const handleClickDeleteUker = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus data ini?"
    );

    if (!confirm.value) {
      return;
    }
    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/uker/${id}`,
      {}
    );

    respondenByPnSurveyMutate();
    respondenByUkerPnSurveyMutate();
    respondenByUkerSurveyMutate();
    setSelectedUkerId(0);
    setIsDisabledSaveRespondenPnByUker(true);
    dispatch(resetDataTables());
    loadingSwal("close");
  };

  const handleClickSaveUker = async () => {
    loadingSwal();
    if (!payloadNewUker.orgeh_kode) {
      await errorSwal("Silahkan pilih uker terlebih dahulu");
      return;
    }
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/uker`,
      {
        survey_id: id,
        orgeh_kode: payloadNewUker.orgeh_kode,
        orgeh_name: payloadNewUker.orgeh_name,
        keterangan: payloadNewUker.keterangan,
      }
    );
    respondenByUkerSurveyMutate();
    respondenByUkerPnSurveyMutate();
    dispatch(resetDataTables());
    setSelectedUkerId(0);
    setIsAddNewRowUker(false);
    loadingSwal("close");
  };

  const handleChangeUker = (value) => {
    const newPayload = {
      ...payloadNewUker,
      orgeh_kode: value.orgeh_kode,
      orgeh_name: value.orgeh_name,
    };

    dispatch(setPayloadNewUker(newPayload));
  };

  const handleChangeTextUker = (props, value) => {
    const newPayload = {
      ...payloadNewUker,
      [props]: value,
    };

    dispatch(setPayloadNewUker(newPayload));
  };

  const handleSelectedUker = (id) => {
    dispatch(resetPayloadNewRespondenPnByUker());
    setSelectedUkerId(id);
  };
  // [END] Handler for uker

  // [START] Handler add responden by uker pn
  const handleChangeChecboxByUkerPn = (isChecked, responden) => {
    const updatedData = [...payloadNewRespondenPnByUker];

    if (isChecked) {
      const findId = updatedData.some(
        (value) => value?.pn_responden === responden?.pn_responden
      );

      if (!findId) {
        updatedData.push({
          pn_responden: responden?.pn_responden,
          nama_responden: responden.nama_responden,
        });
      }
    } else {
      const filter = updatedData.filter(
        (value) => value?.pn_responden !== responden?.pn_responden
      );
      dispatch(setPayloadNewRespondenPnByUker(filter));
      return;
    }

    dispatch(setPayloadNewRespondenPnByUker(updatedData));
  };

  const handleClickSaveRespondenUkerPn = async () => {
    loadingSwal();
    const payload = payloadNewRespondenPnByUker?.map((responden) => {
      const { pn_responden, nama_responden } = responden;
      return {
        survey_id: id,
        survey_uker_id: selectedUkerId,
        pn_responden,
        nama_responden,
      };
    });

    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/responden_uker/${selectedUkerId}`,
      payload
    );

    respondenByPnSurveyMutate();
    respondenByUkerPnSurveyMutate();
    respondenByUkerSurveyMutate();
    loadingSwal("close");
  };
  // [END] Handler add responden by uker pn

  // [ START ] Handler for modal approval
  const handleClickOpenModalApproval = () => {
    setShowModalApproval(true);
  };

  const handleCloseModalApproval = () => {
    dispatch(resetDataHistoryWorkflow());
    dispatch(resetDataWorkflow());
    setIsRefreshWorkflow(true);
  };

  const handleAdd = (property) => {
    const newData = [...dataWorkflow[property]];
    newData.push({
      pn: "",
      nama: "",
      is_signed: false,
    });
    dispatch(setDataWorkflow({ ...dataWorkflow, [property]: newData }));
  };

  const handleDelete = (property, idx) => {
    const newData = [...dataWorkflow[property]];
    newData.splice(idx, 1);
    dispatch(setDataWorkflow({ ...dataWorkflow, [property]: newData }));
  };

  const handleChangeText = (property, value) => {
    dispatch(
      setDataWorkflow({
        ...dataWorkflow,
        [property]: value,
      })
    );
  };

  const handleChangeSelect = (property, index, e) => {
    const newData = [...dataWorkflow[property]];
    const updated = { ...newData[index] };
    updated["pn"] = e?.value?.pn;
    updated["nama"] = e?.value?.name;
    newData[index] = updated;
    dispatch(
      setDataWorkflow({
        ...dataWorkflow,
        [property]: newData,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: workflowSchema,
      resetErrors: resetValidationErrorsWorkflow,
      setErrors: setValidationErrorsWorkflow,
    };
    const validate = setErrorValidation(dataWorkflow, dispatch, schemaMapping);

    if (validate) {
      const actionType = e.target.offsetParent.name;
      const data = {
        sub_modul: "catatan_manage_responden",
        sub_modul_id: information?.data?.catatan_manage_responden[0]?.id,
      };

      const signedCount = dataWorkflow?.ref_tim_audit_approver?.filter(
        (item) => item.is_signed
      ).length;

      switch (actionType) {
        case "change":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          break;
        case "create":
          data.approvers = dataWorkflow.ref_tim_audit_approver;
          break;
        case "reject":
          if (!dataWorkflow.note) {
            await errorSwal("Silahkan berikan alasan!");
            return;
          }
          data.note = dataWorkflow.note;
          break;
        case "approve":
          if (signedCount >= dataWorkflow?.ref_tim_audit_approver?.length) {
            data.data = "<p>pirli test</p>";
          }
          data.note = dataWorkflow.note;
          break;
      }

      if (actionType === "reset") {
        const confirm = await confirmationSwal(
          "Terkait dengan workflow ini, apakah Anda yakin ingin melakukan pengaturan ulang?"
        );
        if (!confirm.value) {
          return;
        }
      }

      if (actionType === "change") {
        await fetchApi(
          "PATCH",
          `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow/change`,
          data
        );
      } else {
        await fetchApi(
          "POST",
          `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow/${actionType}`,
          data
        );
      }

      workflowSurveyMutate();
      dispatch(resetDataWorkflow());
      setShowModalApproval(false);
    }
    workflowSurveyMutate();
  };
  // [ END ] Handler for modal approval

  useEffect(() => {
    console.log("statusApproval => ", statusApproval);
  }, [statusApproval]);

  useEffect(() => {
    console.log("statusApprovalResponden => ", statusApprovalResponden);
  }, [statusApprovalResponden]);
  return (
    <LandingLayoutSurvey withoutRightSidebar overflowY>
      <div className={is_request_manage_responden ? `w-[83rem]` : `w-[71rem]`}>
        <div className="pl-0.5 pt-4 pr-4 pb-6">
          <Breadcrumbs data={breadcrumbs} />
          <PageTitle text={"Responden"} />
          <div className="mb-4" />
          <NavigationTab
            items={navigationTabItems}
            currentStage={currentContentStage}
            setCurrentStage={setCurrentContentStage}
            width={"w-64"}
          />
          <div className="flex gap-4">
            {currentContentStage === 1 ? (
              <TableRespondenPn
                data={dataTables.respondenPn}
                newResponden={payloadNewResponden}
                isDisabled={
                  information?.data?.status_kode == "8"
                    ? statusApprovalResponden !== "On Progress"
                    : statusApproval !== "On Progress"
                }
                handleChangeText={handleChangeTextResponden}
                handleChangeResponden={handleChangeResponden}
                handleClickAddRow={handleClickAddRowResponden}
                handleClickDelete={handleClickDeleteResponden}
                handleClickSave={handleClickSaveResponden}
              />
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <TableUker
                  data={dataTables.respondenUker}
                  newUker={payloadNewUker}
                  selectedUkerId={selectedUkerId}
                  isDisabled={
                    information?.data?.status_kode == "8"
                      ? statusApprovalResponden !== "On Progress"
                      : statusApproval !== "On Progress"
                  }
                  handleChangeTextUker={handleChangeTextUker}
                  handleChangeUker={handleChangeUker}
                  handleClickAddRow={handleClickAddRowUker}
                  handleClickDelete={handleClickDeleteUker}
                  handleClickSave={handleClickSaveUker}
                  handleSelectedUker={handleSelectedUker}
                />
                <TableRespondenPnByUker
                  data={dataTables.respondenUkerPn}
                  selectedResponden={payloadNewRespondenPnByUker}
                  selectedUkerId={selectedUkerId}
                  isDisabled={
                    information?.data?.status_kode == "8"
                      ? statusApprovalResponden !== "On Progress"
                      : statusApproval !== "On Progress"
                  }
                  isDisabledButtonSave={isDisabledSaveRespondenPnByUker}
                  handleChangeChecbox={handleChangeChecboxByUkerPn}
                  handleClickSave={handleClickSaveRespondenUkerPn}
                />
              </div>
            )}
            {is_request_manage_responden ? (
              <CardContentHeaderFooter width={"w-fit"} className={"p-4"}>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xl">Tindakan</p>
                  <div className="w-36 bg-atlasian-green rounded">
                    <ButtonField
                      text={"Approval"}
                      handler={handleClickOpenModalApproval}
                    />
                  </div>
                </div>
              </CardContentHeaderFooter>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <ModalWorkflow
        workflowData={dataWorkflow}
        historyWorkflow={dataHistoryWorkflow}
        validationErrors={validationErrorsWorkflow}
        setShowModal={setShowModalApproval}
        showModal={showModalApproval}
        headerTitle={"Approval Survey"}
        handleChangeText={handleChangeText}
        handleChangeSelect={handleChangeSelect}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModalApproval}
        widthHeader={`w-[42rem]`}
        withoutSigner
        isLogTableTree
      />
      {/* End Content */}
    </LandingLayoutSurvey>
  );
};

export default index;
