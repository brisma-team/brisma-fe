import { ButtonField } from "@/components/atoms";
import { PekerjaSelect } from "../commons";
import { useDispatch, useSelector } from "react-redux";
import { setProjectOverviewData } from "@/slices/ewp/projectOverviewEWPSlice";

const ModalFooter = ({
  currentModalStage,
  handleSubmit,
  handlePrevStage,
  handleNextStage,
  maxStage,
  isDisabled,
  differentKTA,
  isPat,
}) => {
  const dispatch = useDispatch();
  const projectOverviewData = useSelector(
    (state) => state.projectOverviewEWP.projectOverviewData
  );

  const handleChange = (e) => {
    dispatch(
      setProjectOverviewData({
        ...projectOverviewData,
        pn_approver: e.value.pn,
        nama_approver: e.value.name,
      })
    );
  };

  return (
    <form
      className="w-full flex justify-center items-center gap-3 -my-1"
      onSubmit={handleSubmit}
    >
      {differentKTA && isPat && currentModalStage === maxStage && (
        // Jika yang login bukan KTA dan tipe jadwalnya PAT
        <div className="w-full">
          <PekerjaSelect
            placeholder="Masukan PN/Nama KTA Manajer Audit atau EVP"
            handleChange={handleChange}
            selectedValue={
              projectOverviewData.pn_approver !== ""
                ? {
                    label: `${projectOverviewData.pn_approver} - ${projectOverviewData.nama_approver}`,
                    value: {
                      pn: projectOverviewData.pn_approver,
                      name: projectOverviewData.nama_approver,
                    },
                  }
                : ""
            }
            isDisabled={isDisabled}
            isRequired={true}
          />
        </div>
      )}
      {currentModalStage > 1 && (
        <div className="rounded w-28 bg-atlasian-blue-light flex items-center">
          <ButtonField
            text={"Kembali"}
            disabled={isDisabled}
            handler={handlePrevStage}
            name={"prevButton"}
          />
        </div>
      )}
      {currentModalStage === maxStage ? (
        differentKTA && isPat ? (
          // Jika yang login bukan KTA dan tipe jadwalnya PAT
          <div className="rounded w-32 bg-atlasian-green flex items-center">
            <ButtonField
              text={"Send Approval"}
              handler={handleSubmit}
              type={"submit"}
              name={"sendApprovalButton"}
            />
          </div>
        ) : (
          <div className="rounded w-28 bg-atlasian-green flex items-center">
            <ButtonField
              text={"Buat E.W.P"}
              handler={handleSubmit}
              type={"submit"}
              name={"saveButton"}
            />
          </div>
        )
      ) : (
        currentModalStage > 1 && (
          <div className="rounded w-28 bg-atlasian-green flex items-center">
            <ButtonField
              text={"Lanjut"}
              handler={handleNextStage}
              type={"submit"}
              name={"nextButton"}
            />
          </div>
        )
      )}
    </form>
  );
};

export default ModalFooter;
