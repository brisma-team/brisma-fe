import { ButtonField, ButtonIcon, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";

const ModalWorkflowFooter = ({
  user,
  data,
  handleSubmit,
  handleChangeText,
}) => {
  let isApprover, isInitiator;
  isInitiator = user?.pn == data?.maker?.pn;
  isApprover = user?.pn == data?.on_approver?.pn;

  if (data?.status_approver === "On Progress" && isInitiator) {
    // Jika status nya on progress dan yang sedang login adalah si Initiator, maka hanya tampil button Send Approval
    return (
      <div className="flex justify-end gap-3">
        <div className="rounded w-32 bg-atlasian-blue-light">
          <ButtonField
            text={"Send Approval"}
            name="create"
            handler={handleSubmit}
          />
        </div>
      </div>
    );
  } else if (data?.status_approver === "On Approver" && isApprover) {
    // Jika status nya On Approver dan status approver nya sesuai dengan yang login, maka hanya tampil button text input alasan, button reject dan approve
    return (
      <div className="flex gap-3 items-center">
        <div className="w-full">
          <TextInput
            placeholder={"Masukkan alasan"}
            value={data.note}
            icon={
              <ButtonIcon
                handleClick={() => handleChangeText("note", "")}
                icon={<IconClose />}
              />
            }
            onChange={(e) => handleChangeText("note", e.target.value)}
          />
        </div>
        <div>
          <div className="rounded w-32 bg-atlasian-red">
            <ButtonField text={"Reject"} name="reject" handler={handleSubmit} />
          </div>
        </div>
        <div>
          <div className="rounded w-32 bg-atlasian-green">
            <ButtonField
              text={"Approve"}
              name="approve"
              handler={handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  } else if (data?.status_approver === "On Approver" && isInitiator) {
    // Jika status nya On Approver dan yang sedang login adalah seorang Initiator, maka hanya tampil button reset flow
    return (
      <div className="flex gap-3">
        <div className="rounded w-32 bg-atlasian-red">
          <ButtonField
            text={"Reset Flow"}
            name="reset"
            handler={handleSubmit}
          />
        </div>
        <div className="rounded w-32 bg-atlasian-yellow">
          <ButtonField text={"Simpan"} name="change" handler={handleSubmit} />
        </div>
      </div>
    );
  }
};

export default ModalWorkflowFooter;
