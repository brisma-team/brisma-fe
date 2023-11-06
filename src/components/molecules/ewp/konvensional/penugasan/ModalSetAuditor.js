import { DivButton, Modal } from "@/components/atoms";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSampleAssignmentMapaEWP } from "@/data/ewp/konvensional/mapa/penugasan";
import {
  confirmationSwal,
  errorSwal,
  setErrorValidation,
  usePostData,
} from "@/helpers";
import { ContentSampleCSV } from "./content";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalDataTables,
  setPayloadAssignment,
  setPayloadSample,
  setValidationErrors,
  resetValidationErrors,
  resetPayloadAssignment,
  resetPayloadSample,
} from "@/slices/ewp/konvensional/mapa/assignmentMapaEWPSlice";
import assignmentMapaEWPSchema from "@/helpers/schemas/ewp/konvensional/mapa/assignmentMapaEWPSchema";

const classNavbar = `font-semibold text-base z-10 flex justify-center pb-1`;
const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;

const ModalSetAuditor = ({
  showModal,
  setShowModal,
  headerTitle,
  tableMutate,
  selectedUkerMcrId,
}) => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const { sampleAssignmentMapaEWP, sampleAssignmentMapaEWPMutate } =
    useSampleAssignmentMapaEWP({
      id,
      mapa_uker_mcr_id: selectedUkerMcrId,
    });

  const [sample, setSample] = useState({
    file: [],
    csv: [],
    frd: [],
    monber: [],
  });
  const [currentModalStage, setCurrentModalStage] = useState(1);

  const dataTables = useSelector(
    (state) => state.assignmentMapaEWP.modalDataTables
  );
  const payloadSample = useSelector(
    (state) => state.assignmentMapaEWP.payloadSample
  );
  const payloadAssignment = useSelector(
    (state) => state.assignmentMapaEWP.payloadAssignment
  );
  const validationErrors = useSelector(
    (state) => state.assignmentMapaEWP.validationErrors
  );

  const schemaMappings = {
    schema: assignmentMapaEWPSchema,
    resetErrors: resetValidationErrors,
    setErrors: setValidationErrors,
  };

  useEffect(() => {
    if (sampleAssignmentMapaEWP?.data) {
      setSample({
        file: sampleAssignmentMapaEWP.data.file,
        csv: sampleAssignmentMapaEWP.data.csv,
        frd: sampleAssignmentMapaEWP.data.frd,
        monber: sampleAssignmentMapaEWP.data.monber,
      });
    }
  }, [sampleAssignmentMapaEWP, showModal]);

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  const extendRows = (rows, sampleIndex, onClick) => {
    return rows.map((row, index) => ({
      ...row,
      onClick: (e) => onClick(e, sampleIndex, row?.cells[0]?.content, index),
    }));
  };

  // Untuk pilih sample data yang ada di DynamicTable yang mana samplenya akan di upload
  const handleRowClick = (e, sampleIndex, key, index) => {
    const newDataTables = JSON.parse(JSON.stringify(dataTables));
    const objData = [...newDataTables[sampleIndex].tableData];
    const updateDataTables = [...newDataTables[sampleIndex].tableSelectedRows];

    const updatePayloadSample = [...payloadSample];
    const existingIndex = updateDataTables.findIndex((item) => {
      return item === index;
    });

    if (existingIndex > -1) {
      updatePayloadSample.splice(existingIndex, 1);
      updateDataTables.splice(existingIndex, 1);
    } else {
      updatePayloadSample.push({ id: objData[index].ID });
      updateDataTables.push(index);
    }

    newDataTables[sampleIndex].tableSelectedRows = updateDataTables;

    dispatch(setModalDataTables(newDataTables));
    dispatch(setPayloadSample(updatePayloadSample));
  };

  const handleChangeSelect = (e) => {
    dispatch(
      setPayloadAssignment({
        ...payloadAssignment,
        pn: e.value,
        name: e.label,
      })
    );
  };

  const handleChangeText = (value) => {
    dispatch(
      setPayloadAssignment({
        ...payloadAssignment,
        mandays: value,
      })
    );
  };

  const handleSubmit = async () => {
    const validate = setErrorValidation(
      payloadAssignment,
      dispatch,
      schemaMappings
    );

    if (!payloadSample.length) {
      await errorSwal("Minimal ada 1 sample yang dipilih");
    }

    if (validate) {
      const dataFixed = payloadSample.map((v) => {
        return {
          id: v.id,
          pn_auditor: payloadAssignment.pn,
          name_auditor: payloadAssignment.name,
          mandays: payloadAssignment.mandays,
        };
      });

      await usePostData(
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/mapa/penugasan/${id}/${selectedUkerMcrId}/sample`,
        dataFixed
      );

      tableMutate();
      sampleAssignmentMapaEWPMutate();
      dispatch(resetPayloadAssignment());
      dispatch(resetPayloadSample());
    }
  };

  return (
    <Modal
      showModal={showModal}
      header={
        <ModalHeader
          headerText={"Pilih Auditor"}
          title={headerTitle}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
        <ModalFooter
          value={payloadAssignment}
          validationErrors={validationErrors}
          handleSubmit={handleSubmit}
          handleChangeSelect={handleChangeSelect}
          handleChangeText={handleChangeText}
        />
      }
      widthFullFooter={true}
    >
      <div className="w-[70.75rem]">
        <div
          className="w-full rounded flex flex-col items-center h-full border-slate-700"
          style={{
            borderRadius: "10px",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="border-b-2 pt-4 w-full">
            <div className="px-10 flex justify-between w-full">
              <DivButton
                className={`${classNavbar} ${
                  currentModalStage === 1 && classNavbarActive
                }`}
                handleClick={() => setCurrentModalStage(1)}
              >
                Sample CSV
              </DivButton>
              <DivButton
                className={`${classNavbar} ${
                  currentModalStage === 2 && classNavbarActive
                }`}
                handleClick={() => setCurrentModalStage(2)}
              >
                Sample File
              </DivButton>
              <DivButton
                className={`${classNavbar} ${
                  currentModalStage === 3 && classNavbarActive
                }`}
                handleClick={() => setCurrentModalStage(3)}
              >
                Sample FRD
              </DivButton>
              <DivButton
                className={`${classNavbar} ${
                  currentModalStage === 4 && classNavbarActive
                }`}
                handleClick={() => setCurrentModalStage(4)}
              >
                Sample Monber
              </DivButton>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full p-4">
            <ContentSampleCSV
              data={sample}
              extendRows={extendRows}
              handleRowClick={handleRowClick}
            />
          </div>
          {/* {currentModalStage === 1 &&
            sampleAssignmentMapaEWP?.data?.csv?.length &&
            sampleAssignmentMapaEWP?.data?.csv?.map(v) => {
              return
            }} */}
          {/* <DynamicTable
                  head={dataTables.tableColumns}
                  highlightedRowIndex={dataTables.tableSelectedRows}
                  rows={extendRows(dataTables.tableRows, handleRowClick)}
                  rowsPerPage={50}
                  defaultPage={1}
                /> */}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSetAuditor;
