const checkRoleApprovalLog = (note, is_signed) => {
  if (note === "Send Approval" || note === "Reset Approval") {
    return "Proposer";
  } else if (is_signed === true || is_signed === false) {
    return "Approver";
  } else {
    return "";
  }
};

export default checkRoleApprovalLog;
