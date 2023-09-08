import { Card, TextAreaField } from "@/components/atoms";
import {
  FormWithLabel,
  RiskIssueSelect,
  SubMajorSelect,
} from "@/components/molecules/commons";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SubModalRiskIssue = ({ setCurrentModalStage, handleChange }) => {
  const payloadRiskIssue = useSelector(
    (state) => state.planningAnalysisMapaEWP.payloadRiskIssue
  );

  useEffect(() => {
    setCurrentModalStage(1);
  }, []);

  return (
    <div className="w-[31rem]">
      <div className="px-3 pb-2">
        <p className="font-bold text-xl text-brisma">Risk Issue</p>
        <div className="my-2" />
        <Card>
          <div className="px-6 w-full">
            <FormWithLabel
              form={
                <SubMajorSelect
                  handleChange={(e) => handleChange("sub_major", e.value)}
                  selectedValue={{
                    label: payloadRiskIssue.ref_sub_major_kode,
                    value: {
                      kode: payloadRiskIssue.ref_sub_major_kode,
                      nama: payloadRiskIssue.ref_sub_major_nama,
                    },
                  }}
                />
              }
              label="Sub-Major"
              widthLabel={"w-2/5"}
              widthForm={"w-1/3"}
            />
            <FormWithLabel
              form={
                <RiskIssueSelect
                  handleChange={(e) => handleChange("risk_issue", e.value)}
                  selectedValue={{
                    label: payloadRiskIssue.ref_risk_issue_kode,
                    value: {
                      kode: payloadRiskIssue.ref_risk_issue_kode,
                      nama: payloadRiskIssue.ref_risk_issue_name,
                    },
                  }}
                  kode={payloadRiskIssue.ref_sub_major_kode}
                />
              }
              label="Risk Issue"
              widthLabel={"w-2/5"}
              widthForm={"w-1/3"}
            />
            <FormWithLabel
              form={
                <TextAreaField
                  handleChange={(e) =>
                    handleChange("deskripsi", e.target.value)
                  }
                  value={payloadRiskIssue.deskripsi}
                  placeholder="Tambahkan deskripsi.."
                  resize="auto"
                />
              }
              label="Deskripsi Risk Issue"
              widthLabel={"w-2/5"}
              widthForm={"w-3/5"}
              labelPositionTop={true}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SubModalRiskIssue;
