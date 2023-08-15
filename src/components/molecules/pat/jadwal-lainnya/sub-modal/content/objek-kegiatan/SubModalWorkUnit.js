import {
  InlineEditText,
  ButtonField,
  ErrorValidation,
  Select,
  ButtonIcon,
} from "@/components/atoms";
import {
  IconAttachment,
  IconCrossCircle,
  IconInfo,
  IconPlus,
  IconQuestions,
} from "@/components/icons";
import {
  CardTypeCount,
  InlineEditBranchSelect,
  InlineEditOrgehSelect,
} from "@/components/molecules/commons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivityScheduleOtherData } from "@/slices/pat/activityScheduleOtherSlice";
import { useUkerType } from "@/data/reference";

const SubModalWorkUnit = ({ isDisabled }) => {
  const [showBranch, setShowBranch] = useState(false);
  const [countType, setCountType] = useState([]);
  const dispatch = useDispatch();
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
  );
  const { ukerType } = useUkerType("list");
  const [optionUkerType, setOptionUkerType] = useState([]);
  const [openTipeUkerIdx, setOpenTipeUkerIdx] = useState(null);
  const validationErrors = useSelector(
    (state) => state.activityScheduleOther.validationErrorsAO
  );

  useEffect(() => {
    const totalCount = activityScheduleOtherData?.uker?.length;
    if (totalCount) {
      const typeCounts = {};
      activityScheduleOtherData?.uker?.forEach((item) => {
        const type = item.tipe_uker;
        if (type) {
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        }
      });

      const total = Object.values(typeCounts).reduce(
        (acc, count) => acc + count,
        0
      );

      const result = Object.keys(typeCounts).map((type) => {
        const count = typeCounts[type];
        const percent = ((count / total) * 100).toFixed(0);
        return { type, count, percent };
      });

      setCountType(result);
    }
  }, [activityScheduleOtherData]);

  useEffect(() => {
    const mapping = ukerType?.data?.map((v) => {
      return { label: v.name, value: v.kode };
    });
    setOptionUkerType(mapping);
  }, [ukerType]);

  const handleDeleteUker = (idx) => {
    const newData = [...activityScheduleOtherData.uker];
    if (activityScheduleOtherData.uker.length > 1) {
      newData.splice(idx, 1);
      dispatch(
        setActivityScheduleOtherData({
          ...activityScheduleOtherData,
          uker: newData,
        })
      );
    }
  };

  const handleChangeOrgeh = (value, idx) => {
    const ukerData = [...activityScheduleOtherData.uker];
    const updatedUker = { ...ukerData[idx] };
    updatedUker["ref_auditee_orgeh_kode"] = value.orgeh_kode;
    updatedUker["ref_auditee_orgeh_name"] = value.orgeh_name;
    ukerData[idx] = updatedUker;
    const updatedData = {
      ...activityScheduleOtherData,
      uker: ukerData,
    };

    dispatch(setActivityScheduleOtherData(updatedData));
  };

  const handleChangeTipeUker = (value, idx) => {
    const ukerData = [...activityScheduleOtherData.uker];
    const updatedUker = { ...ukerData[idx] };
    updatedUker["tipe_uker"] = value;
    ukerData[idx] = updatedUker;
    const updatedData = {
      ...activityScheduleOtherData,
      uker: ukerData,
    };

    dispatch(setActivityScheduleOtherData(updatedData));
  };

  const handleAddUker = (value) => {
    if (value) {
      const newData = [...activityScheduleOtherData.uker];
      newData.push({
        ref_auditee_orgeh_kode: "",
        ref_auditee_orgeh_name: "",
        ref_auditee_branch_kode: value.branch_kode,
        ref_auditee_branch_name: value.branch_name,
        tipe_uker: "",
        attachments: [""],
      });
      dispatch(
        setActivityScheduleOtherData({
          ...activityScheduleOtherData,
          uker: newData,
        })
      );
      setShowBranch(false);
    }
  };

  const handleMenuOpen = (idx) => {
    setOpenTipeUkerIdx(idx);
  };

  const handleMenuClose = () => {
    setOpenTipeUkerIdx(null);
  };

  const findUkerType = (kode) => {
    const find = ukerType?.data?.find((v) => v.kode == kode);
    return { label: find?.name, value: find?.kode };
  };

  return (
    <div>
      <div className="w-full p-4">
        <div className="w-full flex gap-3 my-3">
          {countType.map((v, i) => {
            return (
              <CardTypeCount
                key={i}
                title={v.type}
                total={v.count}
                percent={v.percent}
                width={"w-[12rem]"}
                style={"m-1"}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full font-bold text-sm px-4">
        <div className="border-2 border-[#DFE1E6] rounded-xl">
          <div className="overflow-y-scroll max-h-56">
            <div className="flex h-14">
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                <p>Aksi</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center text-justify p-3">
                <p>Branch</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center text-justify p-3">
                <p>Orgeh</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
                <p>Tipe UKER</p>
              </div>
              <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[10%] flex items-center">
                <p className="ml-3">Info</p>
              </div>
              <div className="border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                <p>Lampiran</p>
              </div>
            </div>
            {activityScheduleOtherData?.uker?.map((v, i) => {
              return (
                <div className="flex" key={i}>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                    <ButtonIcon
                      href={"#"}
                      color={"red"}
                      icon={<IconCrossCircle />}
                      handleClick={() => handleDeleteUker(i)}
                    />
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center justify-center text-justify p-3">
                    <div className="-mb-3 -mx-2 -mt-5 w-full">
                      <InlineEditText
                        isDisabled={true}
                        value={v.ref_auditee_branch_name}
                        placeholder={v.ref_auditee_branch_name}
                      />
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex items-center justify-center text-justify p-3">
                    <div className="-mb-3 -mx-2 -mt-5 w-full">
                      <InlineEditOrgehSelect
                        placeholder="Select an option"
                        handleConfirm={(e) => handleChangeOrgeh(e, i)}
                        value={{
                          label: v.ref_auditee_orgeh_name,
                          value: {
                            orgeh_kode: v.ref_auditee_orgeh_kode,
                            orgeh_name: v.ref_auditee_orgeh_name,
                          },
                        }}
                        isDisabled={isDisabled}
                      />
                      {validationErrors[
                        `uker[${i}].ref_auditee_orgeh_kode`
                      ] && (
                        <div className="px-1 py-0.5">
                          <ErrorValidation
                            message={
                              validationErrors[
                                `uker[${i}].ref_auditee_orgeh_kode`
                              ]
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
                    <div
                      className={
                        i == openTipeUkerIdx ? `z-50 absolute` : `w-full`
                      }
                    >
                      <Select
                        optionValue={optionUkerType}
                        isSearchable={false}
                        onChange={(e) => handleChangeTipeUker(e.value, i)}
                        value={
                          v.tipe_uker !== "" ? findUkerType(v.tipe_uker) : ""
                        }
                        isDisabled={isDisabled}
                        handleMenuOpen={() => handleMenuOpen(i)}
                        handleMenuClose={handleMenuClose}
                      />
                      {validationErrors[`uker[${i}].tipe_uker`] && (
                        <div className="px-1 py-0.5">
                          <ErrorValidation
                            message={validationErrors[`uker[${i}].tipe_uker`]}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[10%] flex items-center">
                    <div className="flex w-full justify-center gap-1">
                      <ButtonIcon color={"yellow"} icon={<IconInfo />} />
                      <ButtonIcon color={"blue"} icon={<IconQuestions />} />
                    </div>
                  </div>
                  <div className="border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                    <ButtonIcon color={"purple"} icon={<IconAttachment />} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-40 text-sm font-semibold p-2 my-1">
              <ButtonField
                iconAfter={
                  <div className="text-atlasian-purple">
                    <IconPlus size="medium" />
                  </div>
                }
                text={"Tambah Uker"}
                textColor={"purple"}
                handler={() => setShowBranch(true)}
              />
            </div>
            {showBranch && (
              <div className="w-40 mb-2">
                <InlineEditBranchSelect
                  placeholder="Select an option"
                  handleConfirm={handleAddUker}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubModalWorkUnit;
