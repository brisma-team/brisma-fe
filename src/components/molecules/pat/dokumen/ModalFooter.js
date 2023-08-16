import { ButtonField, ButtonIcon, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";

const ModalFooter = ({
  user,
  data,
  status,
  handleSubmit,
  handleChangeText,
}) => {
  let findApproval;
  if (data?.statusApprover) {
    findApproval = user.pn === data?.statusApprover?.pn;
  }
  if (status === "On Progress") {
    // Jika status PAT nya on progress, maka hanya tampil button Send Approval
    return (
      <div className="flex justify-end gap-3">
        <div className="rounded w-32 bg-atlasian-blue-light">
          <ButtonField
            text={"Send Approval"}
            name="sendApproval"
            handler={handleSubmit}
          />
        </div>
      </div>
    );
  } else if (status === "On Approver" && findApproval) {
    // Jika status PAT nya On Approver dan status approver nya sesuai dengan yang login, maka hanya tampil button text input alasan, button reject dan approve
    return (
      <div className="flex gap-3">
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
        <div className="rounded w-32 bg-atlasian-red">
          <ButtonField text={"Reject"} name="reject" handler={handleSubmit} />
        </div>
        <div className="rounded w-32 bg-atlasian-green">
          <ButtonField text={"Approve"} name="approve" handler={handleSubmit} />
        </div>
      </div>
    );
  } else if (status === "On Approver" && data?.maker === user?.pn) {
    // Jika status PAT nya On Approver dan yang sedang login adalah seorang maker PAT, maka hanya tampil button reset flow
    return (
      <div className="flex gap-3">
        <div className="rounded w-32 bg-atlasian-red">
          <ButtonField
            text={"Reset Flow"}
            name="reset"
            handler={handleSubmit}
          />
        </div>
      </div>
    );
  }
};

export default ModalFooter;
