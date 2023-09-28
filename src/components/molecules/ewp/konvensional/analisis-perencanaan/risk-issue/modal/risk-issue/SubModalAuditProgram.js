import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const SubModalAuditProgram = ({ setCurrentModalStage, handleChange }) => {
  const payloadRiskIssue = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadRiskIssue
  );
  useEffect(() => {
    setCurrentModalStage(2);
  }, []);

  return (
    <div className="h-[37.5rem]">
      <div className="px-3 pb-2 h-full">
        <p className="font-bold text-xl text-brisma">Risk Issue</p>
        <div className="my-2" />
        <div className="ckeditor-modal-set-risk-issue">
          <Editor
            contentData={payloadRiskIssue.program_audit}
            disabled={false}
            ready={true}
            onChange={(value) => handleChange("program_audit", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubModalAuditProgram;
