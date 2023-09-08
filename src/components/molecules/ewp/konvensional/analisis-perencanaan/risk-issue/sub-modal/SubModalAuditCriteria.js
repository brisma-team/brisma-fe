import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});
const SubModalAuditCriteria = ({ setCurrentModalStage, handleChange }) => {
  const payloadRiskIssue = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadRiskIssue
  );
  useEffect(() => {
    setCurrentModalStage(3);
  }, []);

  return (
    <div className="h-[37.5rem]">
      <div className="px-3 pb-2 h-full">
        <p className="font-bold text-xl text-brisma">Kriteria Audit</p>
        <div className="my-2" />
        <Editor
          contentData={payloadRiskIssue.kriteria}
          disabled={false}
          ready={true}
          onChange={(value) => handleChange("kriteria", value)}
        />
      </div>
    </div>
  );
};

export default SubModalAuditCriteria;
