import { DivButton, Modal } from "@/components/atoms";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSampleAssignmentMapaEWP } from "@/data/ewp/konvensional/mapa/penugasan";

const classNavbar = `font-semibold text-base z-10 flex justify-center pb-1`;
const classNavbarActive = `border-b-[5px] border-atlasian-blue-light text-atlasian-blue-light`;

const ModalSetAuditor = ({ showModal, selectedUkerMcrId }) => {
  const { id } = useRouter().query;
  const { sampleAssignmentMapaEWP, sampleAssignmentMapaEWPError } =
    useSampleAssignmentMapaEWP({
      id,
      mapa_uker_mcr_id: selectedUkerMcrId,
    });
  const [currentModalStage, setCurrentModalStage] = useState(1);

  useEffect(() => {
    if (!sampleAssignmentMapaEWPError) {
      //   const mapping = sampleAssessmentMapaEWP?.data?
    }
  }, [sampleAssignmentMapaEWP]);
  return (
    <Modal
      showModal={showModal}
      header={<ModalHeader headerText={"Pilih Auditor"} />}
      footer={<ModalFooter />}
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
          <div className="border-b-2 pt-4 w-full mb-4">
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
