import {
  ButtonIcon,
  ErrorValidation,
  InlineEditText,
  TextInput,
} from "@/components/atoms";
import { IconCrossCircle, IconInfo, IconQuestions } from "@/components/icons";
import {
  DataNotFound,
  OrgehSelect,
  UkerTypeSelect,
} from "@/components/molecules/commons";
import { convertToNominal } from "@/helpers";
import { setUkerAssessmentData } from "@/slices/ewp/konvensional/mapa/ukerAssessmentMapaEWPSlice";
import { useDispatch, useSelector } from "react-redux";

const TableUkerAssessment = ({
  handleChange,
  setShowDescModal,
  setOpenDescIdx,
}) => {
  const dispatch = useDispatch();
  const validationErrors = useSelector(
    (state) => state.ukerAssessmentMapaEWP.validationErrors
  );
  const ukerAssessmentData = useSelector(
    (state) => state.ukerAssessmentMapaEWP.ukerAssessmentData
  );

  const handleChangeOrgeh = (value, idx) => {
    const ukerData = [...ukerAssessmentData];
    const updatedUker = { ...ukerData[idx] };
    updatedUker["ref_auditee_orgeh_kode"] = value.orgeh_kode;
    updatedUker["ref_auditee_orgeh_name"] = value.orgeh_name;
    ukerData[idx] = updatedUker;
    dispatch(setUkerAssessmentData(ukerData));
  };

  const handleDeleteUker = (idx) => {
    const newData = [...ukerAssessmentData];
    newData.splice(idx, 1);
    dispatch(setUkerAssessmentData(newData));
  };

  return (
    <div className="border-2 border-[#DFE1E6] rounded-xl overflow-y-scroll font-bold text-sm">
      <div className="flex h-14">
        <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[5%] flex items-center justify-center">
          <p>Aksi</p>
        </div>
        <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center text-justify p-3">
          <p>UKER</p>
        </div>
        <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center text-justify p-3">
          <p>ORGEH</p>
        </div>
        <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[16%] flex items-center px-2 py-3">
          <p>Tipe UKER</p>
        </div>
        <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[11%] flex items-center justify-center">
          <p>GROSS PROFIT</p>
        </div>
        <div className="border-b-2 border-[#DFE1E6] w-[8%] flex justify-center items-center">
          <p>Info</p>
        </div>
      </div>
      {ukerAssessmentData?.length ? (
        ukerAssessmentData?.map((v, i) => {
          return (
            <div className="flex" key={i}>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[5%] flex flex-col items-center justify-center gap-3">
                <ButtonIcon
                  color={"red"}
                  icon={<IconCrossCircle />}
                  handleClick={() => handleDeleteUker(i)}
                />
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex flex-col items-center justify-center text-justify px-3 py-1">
                <div className="-mb-3 -mx-2 -mt-5 w-full">
                  <InlineEditText
                    isDisabled={true}
                    value={v.ref_auditee_branch_name}
                    placeholder={v.ref_auditee_branch_name}
                  />
                </div>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex flex-col items-center justify-center text-justify px-2 py-1">
                <OrgehSelect
                  width="w-[22.5rem]"
                  handleChange={(e) => handleChangeOrgeh(e.value, i)}
                  selectedValue={{
                    label: v.ref_auditee_orgeh_name,
                    value: {
                      orgeh_kode: v.ref_auditee_orgeh_kode,
                      orgeh_name: v.ref_auditee_orgeh_name,
                    },
                  }}
                  positionAbsolute={true}
                />
                {validationErrors[`[${i}].ref_auditee_orgeh_kode`] && (
                  <div className="w-full  px-1 py-0.5">
                    <ErrorValidation
                      message={
                        validationErrors[`[${i}].ref_auditee_orgeh_kode`]
                      }
                    />
                  </div>
                )}
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[16%] flex flex-col justify-center items-center px-2 py-1">
                <UkerTypeSelect
                  width="w-[11.5rem]"
                  handleChange={(e) => handleChange("tipe_uker", i, e.value)}
                  selectedValue={v.tipe_uker}
                />
                {validationErrors[`[${i}].tipe_uker`] && (
                  <div className="w-full  px-1 py-0.5">
                    <ErrorValidation
                      message={validationErrors[`[${i}].tipe_uker`]}
                    />
                  </div>
                )}
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[11%] flex flex-col items-center justify-center px-2 py-1.5">
                <div className="w-full">
                  <TextInput
                    onChange={(e) =>
                      handleChange(
                        "gross_profit",
                        i,
                        convertToNominal(e.target.value)
                      )
                    }
                    placeholder={"Gross Profit"}
                    value={v.gross_profit}
                  />
                  {validationErrors[`[${i}].gross_profit`] && (
                    <div className="w-full px-1 py-0.5">
                      <ErrorValidation
                        message={validationErrors[`[${i}].gross_profit`]}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b-2 border-[#DFE1E6] w-[8%] flex items-center">
                <div className="flex w-full justify-center gap-1">
                  <ButtonIcon
                    color={"blue"}
                    icon={<IconQuestions />}
                    handleClick={() => (
                      setShowDescModal(true), setOpenDescIdx(i)
                    )}
                  />
                  <ButtonIcon color={"yellow"} icon={<IconInfo />} />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
          <DataNotFound />
        </div>
      )}
    </div>
  );
};

export default TableUkerAssessment;
