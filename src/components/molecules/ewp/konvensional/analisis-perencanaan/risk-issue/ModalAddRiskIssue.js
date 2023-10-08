import { Modal } from "@/components/atoms";
import { useState } from "react";
import Link from "next/link";
import { confirmationSwal, setErrorValidation, usePostData } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPayloadRiskIssue,
  resetValidationErrorsPayloadRiskIssue,
  setPayloadRiskIssue,
  setValidationErrorsRiskIssue,
} from "@/slices/ewp/konvensional/mapa/planningAnalysisMapaEWPSlice";
import { addRiskIssueMapaEWPSchema } from "@/helpers/schemas/ewp/konvensional/mapa/planningAnalysisMapaEWPSchema";
import _ from "lodash";
import {
  ModalFooter,
  ModalHeader,
  SubModalAuditCriteria,
  SubModalAuditProgram,
  SubModalRiskIssue,
} from "./modal/risk-issue";
import { useRouter } from "next/router";

const ModalAddRiskIssue = ({ showModal, setShowModal, mutate }) => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;

  const [currentModalStage, setCurrentModalStage] = useState(1);
  const payloadRiskIssue = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadRiskIssue
  );
  const riskIssueInfo = useSelector(
    (state) => state.planningAnalysisMapaEWP.riskIssueInfo
  );

  const schemaMappings = {
    schema: addRiskIssueMapaEWPSchema,
    resetErrors: resetValidationErrorsPayloadRiskIssue,
    setErrors: setValidationErrorsRiskIssue,
  };

  const items = [
    {
      id: "step-1",
      label: (
        <Link href="#" onClick={() => setCurrentModalStage(1)}>
          Risk Issue
        </Link>
      ),
      percentageComplete: currentModalStage > 1 ? 100 : 0,
      status: currentModalStage === 1 ? "current" : "unvisited",
      href: "#",
    },
    {
      id: "step-2",
      label: (
        <Link href="#" onClick={() => setCurrentModalStage(2)}>
          Program Audit
        </Link>
      ),
      percentageComplete: currentModalStage > 2 ? 100 : 0,
      status: currentModalStage === 2 ? "current" : "unvisited",
      href: "#",
    },
    {
      id: "step-3",
      label: (
        <Link href="#" onClick={() => setCurrentModalStage(3)}>
          Kriteria Audit
        </Link>
      ),
      percentageComplete: 0,
      status: currentModalStage === 3 ? "current" : "unvisited",
      href: "#",
    },
  ];

  const handleChange = (property, value) => {
    let updatedData;
    switch (property) {
      case "sub_major":
        updatedData = {
          ...payloadRiskIssue,
          ref_sub_major_kode: value.kode,
          ref_sub_major_name: value.nama,
        };
        break;
      case "risk_issue":
        updatedData = {
          ...payloadRiskIssue,
          ref_risk_issue_kode: value.kode,
          ref_risk_issue_name: value.nama,
        };
        break;
      default:
        updatedData = {
          ...payloadRiskIssue,
          [property]: value,
        };
        break;
    }
    dispatch(setPayloadRiskIssue(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...payloadRiskIssue,
      ..._.pick(riskIssueInfo, [
        "mapa_uker_id",
        "ref_sub_aktivitas_kode",
        "ref_sub_aktivitas_name",
      ]),
    };
    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/analisis_perencanaan/${id}/risk?sub_kode=${payload?.ref_sub_aktivitas_kode}&uker_id=${payload?.mapa_uker_id}`,
        payload
      );
      mutate();
      setShowModal(false);
    }
  };

  const handleNextStage = async () => {
    const validate = setErrorValidation(
      payloadRiskIssue,
      dispatch,
      schemaMappings
    );

    if (currentModalStage === 1) {
      if (validate) {
        setCurrentModalStage(currentModalStage + 1);
      }
    } else {
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

    setCurrentModalStage(1);
    setShowModal(false);
    dispatch(resetPayloadRiskIssue());
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Tambah Risk Issue"}
          progressItems={items}
          handleCloseModal={handleCloseModal}
          showModal={showModal}
        />
      }
      footer={
        <ModalFooter
          currentModalStage={currentModalStage}
          maxStage={3}
          handleNextStage={handleNextStage}
          handleSubmit={handleSubmit}
        />
      }
    >
      {currentModalStage === 1 && (
        <SubModalRiskIssue
          setCurrentModalStage={setCurrentModalStage}
          handleChange={handleChange}
        />
      )}
      {currentModalStage === 2 && (
        <SubModalAuditProgram
          setCurrentModalStage={setCurrentModalStage}
          handleChange={handleChange}
        />
      )}
      {currentModalStage === 3 && (
        <SubModalAuditCriteria
          setCurrentModalStage={setCurrentModalStage}
          handleChange={handleChange}
        />
      )}
    </Modal>
  );
};

export default ModalAddRiskIssue;
