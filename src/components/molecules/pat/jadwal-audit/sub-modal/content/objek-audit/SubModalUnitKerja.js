import {
  InlineEditText,
  LinkIcon,
  ButtonField,
  ReactSelect,
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
  InlineEditOrgehSelect,
  InlineEditBranchSelect,
} from "@/components/molecules/commons";
import { useDispatch, useSelector } from "react-redux";
import { setAuditScheduleData } from "@/slices/pat/auditScheduleSlice";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUkerType } from "@/data/reference";

const SubModalUnitKerja = ({ isDisabled }) => {
  const { control } = useForm();
  const [showBranch, setShowBranch] = useState(false);
  const [countType, setCountType] = useState([]);
  const dispatch = useDispatch();
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );
  const { ukerType } = useUkerType("list");
  const [optionUkerType, setOptionUkerType] = useState([]);
  const [openTipeUkerIdx, setOpenTipeUkerIdx] = useState(null);

  useEffect(() => {
    const totalCount = auditScheduleData?.uker?.length;
    if (totalCount) {
      const typeCounts = {};
      auditScheduleData?.uker?.forEach((item) => {
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
  }, [auditScheduleData]);

  useEffect(() => {
    const mapping = ukerType?.data?.map((v) => {
      return { label: v.name, value: v.kode };
    });
    setOptionUkerType(mapping);
  }, [ukerType]);

  const handleDeleteUker = (idx) => {
    const newData = [...auditScheduleData.uker];
    if (auditScheduleData.uker.length > 1) {
      newData.splice(idx, 1);
      dispatch(setAuditScheduleData({ ...auditScheduleData, uker: newData }));
    }
  };

  const handleChangeOrgeh = (value, idx) => {
    const ukerData = [...auditScheduleData.uker];
    const updatedUker = { ...ukerData[idx] };
    updatedUker["ref_auditee_orgeh_kode"] = value.orgeh_kode;
    updatedUker["ref_auditee_orgeh_name"] = value.orgeh_name;
    ukerData[idx] = updatedUker;
    const updatedData = {
      ...auditScheduleData,
      uker: ukerData,
    };

    dispatch(setAuditScheduleData(updatedData));
  };

  const handleChangeTipeUker = (value, idx) => {
    const ukerData = [...auditScheduleData.uker];
    const updatedUker = { ...ukerData[idx] };
    updatedUker["tipe_uker"] = value;
    ukerData[idx] = updatedUker;
    const updatedData = {
      ...auditScheduleData,
      uker: ukerData,
    };

    dispatch(setAuditScheduleData(updatedData));
  };

  const handleAddUker = (value) => {
    if (value) {
      const newData = [...auditScheduleData.uker];
      newData.push({
        ref_auditee_orgeh_kode: "",
        ref_auditee_orgeh_name: "",
        ref_auditee_branch_kode: value.branch_kode,
        ref_auditee_branch_name: value.branch_name,
        tipe_uker: "",
        attachments: [""],
      });
      dispatch(setAuditScheduleData({ ...auditScheduleData, uker: newData }));
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
        <div className="w-full flex flex-wrap my-1">
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
            {auditScheduleData?.uker?.map((v, i) => {
              return (
                <div className="flex" key={i}>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                    <LinkIcon
                      href={"#"}
                      color={"red"}
                      icon={<IconCrossCircle />}
                      handler={() => handleDeleteUker(i)}
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
                        control={control}
                        value={{
                          label: v.ref_auditee_orgeh_name,
                          value: {
                            orgeh_kode: v.ref_auditee_orgeh_kode,
                            orgeh_name: v.ref_auditee_orgeh_name,
                          },
                        }}
                        isDisabled={isDisabled}
                      />
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
                    <div
                      className={
                        i == openTipeUkerIdx ? `z-50 absolute` : `w-full`
                      }
                    >
                      <ReactSelect
                        control={control}
                        handleChange={(e) => handleChangeTipeUker(e.value, i)}
                        options={optionUkerType}
                        value={
                          v.tipe_uker !== "" ? findUkerType(v.tipe_uker) : ""
                        }
                        isSearchable={false}
                        handleMenuOpen={() => handleMenuOpen(i)}
                        handleMenuClose={handleMenuClose}
                        isDisabled={isDisabled}
                      />
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[10%] flex items-center">
                    <div className="flex w-full justify-center gap-1">
                      <LinkIcon
                        href={"#"}
                        color={"yellow"}
                        icon={<IconInfo />}
                      />
                      <LinkIcon
                        href={"#"}
                        color={"blue"}
                        icon={<IconQuestions />}
                      />
                    </div>
                  </div>
                  <div className="border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                    <LinkIcon
                      href={"#"}
                      color={"purple"}
                      icon={<IconAttachment />}
                    />
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
                disabled={isDisabled}
              />
            </div>
            {showBranch && (
              <div className="w-40 mb-2">
                <InlineEditBranchSelect
                  control={control}
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

export default SubModalUnitKerja;
