import { Modal, Spinner } from "@/components/atoms";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import DynamicTable from "@atlaskit/dynamic-table";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { ContentSampleCSV } from "./content";
import { useSampleAssignmentMapaEWP } from "@/data/ewp/konvensional/mapa/penugasan";

const ModalSetAuditor = ({ showModal, selectedUkerMcrId }) => {
  const { id } = useRouter().query;
  const { sampleAssignmentMapaEWP, sampleAssignmentMapaEWPError } =
    useSampleAssignmentMapaEWP({
      id,
      mapa_uker_mcr_id: selectedUkerMcrId,
    });

  const [currentStage, setCurrentStage] = useState(1);
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
      <div className="p-4 overflow-y-scroll max-h-[40rem] w-[70.75rem]">
        <ContentSampleCSV data={sampleAssignmentMapaEWP?.data?.csv} />
        {/* <div className></div> */}
        {/* <div className="dataTables">
          <DynamicTable
          head={dataTables.tableColumns}
          highlightedRowIndex={dataTables.tableSelectedRows}
          rows={extendRows(dataTables.tableRows, handleRowClick)}
          />
        </div> */}
      </div>
    </Modal>
  );
};

export default ModalSetAuditor;
