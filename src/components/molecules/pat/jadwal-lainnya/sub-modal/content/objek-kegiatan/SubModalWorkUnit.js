import {
  InlineEditText,
  ButtonField,
  ErrorValidation,
  Select,
  ButtonIcon,
  UploadButton,
} from "@/components/atoms";
import {
  IconAttachment,
  IconCrossCircle,
  IconInfo,
  IconPlus,
  IconQuestions,
} from "@/components/icons";
import {
  BranchSelect,
  CardTypeCount,
  DescriptionModal,
  OrgehSelect,
} from "@/components/molecules/commons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivityScheduleOtherData } from "@/slices/pat/activityScheduleOtherSlice";
import { useUkerType } from "@/data/reference";
import { loadingSwal, usePostFileData } from "@/helpers";
import ModalAssessmentInfo from "@/components/molecules/pat/ModalAssessmentInfo";

const SubModalWorkUnit = ({ isDisabled }) => {
  const [showModalDesc, setShowModalDesc] = useState(false);
  const [selectedIdxDesc, setSelectedIdxDesc] = useState(null);

  const [showModalAssessmentInfo, setShowModalAssessmentInfo] = useState(false);
  const [selectedIdxAssessmentInfo, setSelectedIdxAssessmentInfo] =
    useState(null);

  const [selectedIdxAttachments, setSelectedIdxAttachments] = useState(null);

  const [showBranch, setShowBranch] = useState(false);
  const [countType, setCountType] = useState([]);
  const dispatch = useDispatch();
  const activityScheduleOtherData = useSelector(
    (state) => state.activityScheduleOther.activityScheduleOtherData
  );
  const { ukerType } = useUkerType("list");
  const [optionUkerType, setOptionUkerType] = useState([]);
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

  const findUkerType = (kode) => {
    const find = ukerType?.data?.find((v) => v.kode == kode);
    return { label: find?.name, value: find?.kode };
  };

  const handleDeleteUker = (idx) => {
    const newData = [...activityScheduleOtherData.uker];
    newData.splice(idx, 1);
    dispatch(
      setActivityScheduleOtherData({
        ...activityScheduleOtherData,
        uker: newData,
      })
    );
  };

  const handleChange = (property, value, idx) => {
    const ukerData = [...activityScheduleOtherData.uker];
    const updatedUker = { ...ukerData[idx] };
    updatedUker[property] = value;
    ukerData[idx] = updatedUker;
    const updatedData = {
      ...activityScheduleOtherData,
      uker: ukerData,
    };

    dispatch(setActivityScheduleOtherData(updatedData));
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

  const handleAddUker = (e) => {
    if (e?.value) {
      const newData = [...activityScheduleOtherData.uker];
      newData.push({
        ref_auditee_orgeh_kode: "",
        ref_auditee_orgeh_name: "",
        ref_auditee_branch_kode: e?.value.branch_kode,
        ref_auditee_branch_name: e?.value.branch_name,
        tipe_uker: "",
        attachments: [""],
        deskripsi: "",
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

  const handleUpload = async (e, idx) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;

      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "pat",
      });

      handleChange("attachments", response.url, idx);
    }
    loadingSwal("close");
  };

  return (
    <div>
      <div className="w-full p-4">
        <div className="w-full flex gap-3 my-3">
          {countType.map((v, i) => {
            return (
              <CardTypeCount
                key={i}
                title={v.type?.toUpperCase()}
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
          <div className="overflow-y-scroll max-h-80">
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
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[30%] flex-row items-center text-justify p-3">
                    <OrgehSelect
                      width="w-[17rem]"
                      handleChange={(e) => handleChangeOrgeh(e.value, i)}
                      selectedValue={{
                        label: v.ref_auditee_orgeh_name,
                        value: {
                          orgeh_kode: v.ref_auditee_orgeh_kode,
                          orgeh_name: v.ref_auditee_orgeh_name,
                        },
                      }}
                      isDisabled={isDisabled}
                      positionAbsolute={true}
                    />
                    {validationErrors[`uker[${i}].ref_auditee_orgeh_kode`] && (
                      <div className="px-1 py-0.5 w-">
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
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[14%] flex-row items-center px-2 py-3">
                    <Select
                      optionValue={optionUkerType}
                      isSearchable={false}
                      onChange={(e) => handleChangeTipeUker(e.value, i)}
                      value={v.tipe_uker ? findUkerType(v.tipe_uker) : ""}
                      isDisabled={isDisabled}
                      positionAbsolute={true}
                    />
                    {validationErrors[`uker[${i}].tipe_uker`] && (
                      <div className="px-1 py-0.5">
                        <ErrorValidation
                          message={validationErrors[`uker[${i}].tipe_uker`]}
                        />
                      </div>
                    )}
                  </div>
                  <div className="border-r-2 border-b-2 border-[#DFE1E6] w-[10%] flex items-center">
                    <div className="flex w-full justify-center gap-1">
                      <ButtonIcon
                        color={"yellow"}
                        icon={<IconInfo />}
                        handleClick={() => (
                          setShowModalAssessmentInfo(true),
                          setSelectedIdxAssessmentInfo(i)
                        )}
                      />
                      <ButtonIcon
                        color={"blue"}
                        icon={<IconQuestions />}
                        handleClick={() => (
                          setShowModalDesc(true), setSelectedIdxDesc(i)
                        )}
                      />
                      <DescriptionModal
                        showModal={showModalDesc}
                        setShowModal={setShowModalDesc}
                        value={
                          activityScheduleOtherData?.uker[selectedIdxDesc]
                            ?.deskripsi
                        }
                        handleConfirm={(e) =>
                          handleChange("deskripsi", e, selectedIdxDesc)
                        }
                      />
                      <ModalAssessmentInfo
                        showModal={showModalAssessmentInfo}
                        setShowModal={setShowModalAssessmentInfo}
                      />
                    </div>
                  </div>
                  <div className="border-b-2 border-[#DFE1E6] w-[8%] flex items-center justify-center">
                    <UploadButton
                      text={
                        <ButtonIcon
                          color={"purple"}
                          icon={<IconAttachment />}
                          handleClick={() => setSelectedIdxAttachments(i)}
                        />
                      }
                      className={"border-none"}
                      handleUpload={(e) =>
                        handleUpload(e, selectedIdxAttachments)
                      }
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
                <BranchSelect
                  placeholder="Select an option"
                  handleChange={handleAddUker}
                />
              </div>
            )}
          </div>
          {validationErrors["uker"] && (
            <div className="-mt-1 mx-3 mb-2">
              <ErrorValidation message={validationErrors["uker"]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubModalWorkUnit;
