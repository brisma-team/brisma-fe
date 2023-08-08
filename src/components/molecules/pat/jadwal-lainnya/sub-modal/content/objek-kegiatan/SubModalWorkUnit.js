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
  InlineEditBranchSelect,
  InlineEditOrgehSelect,
} from "@/components/molecules/commons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setActivityScheduleOtherData } from "@/slices/pat/activityScheduleOtherSlice";
import { useUkerType } from "@/data/reference";

const SubModalWorkUnit = ({ typeModal }) => {
  console.log(typeModal);
  const { control } = useForm();
  const [showBranch, setShowBranch] = useState(false);
  const dispatch = useDispatch();
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
  );
  const { ukerType } = useUkerType("list");
  const [optionUkerType, setOptionUkerType] = useState([]);
  const [openTipeUkerIdx, setOpenTipeUkerIdx] = useState(null);

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
      console.log("uker => ", value);
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
          <CardTypeCount
            title={"RAO"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"BO (KC)"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"KK"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"DIVISI"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"RO (KANWIL)"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
        </div>
        <div className="w-full flex gap-3 my-3">
          <CardTypeCount
            title={"KCP"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"UNIT"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"UKLN"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
          <CardTypeCount
            title={"PA"}
            total={2}
            percent={75}
            width={"w-[12rem]"}
          />
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
                      />
                    </div>
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex items-center px-2 py-3">
                    <div
                      className={
                        i == openTipeUkerIdx ? `z-50 absolute` : `w-full`
                      }
                    >
                      {console.log(
                        "findUkerType => ",
                        findUkerType(v.tipe_uker)
                      )}
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

export default SubModalWorkUnit;
