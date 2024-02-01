import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { StatusApprovalSelect } from "@/components/molecules/commons";

const CardFilterTableOverview = ({
  data,
  showFilter,
  handleChangeSelect,
  handleChangeText,
}) => {
  return (
    showFilter && (
      <div className="rounded bg-white w-fit">
        <Card>
          <div className="px-3 py-1 flex gap-2">
            <div className="flex flex-col justify-between gap-2">
              <div className="w-48">
                <TextInput
                  placeholder="Auditor"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText("auditor", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChangeText("auditor", e.target.value)}
                  value={data?.auditor}
                />
              </div>
              <div className="w-48">
                <StatusApprovalSelect
                  handleChange={(e) => handleChangeSelect("status", e.value)}
                  handleReset={() => handleChangeSelect("status", "")}
                  placeholder={"Status"}
                  selectedValue={
                    data?.status
                      ? { label: data?.status?.name, value: data?.status }
                      : ""
                  }
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Risk Issue Kode"
                  icon={
                    <ButtonIcon
                      handleClick={() =>
                        handleChangeText("risk_issue_kode", "")
                      }
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("risk_issue_kode", e.target.value)
                  }
                  value={data?.risk_issue_kode}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Risk Issue Name"
                  icon={
                    <ButtonIcon
                      handleClick={() =>
                        handleChangeText("risk_issue_name", "")
                      }
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("risk_issue_name", e.target.value)
                  }
                  value={data?.risk_issue_name}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Major Kode"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText("sub_major_kode", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("sub_major_kode", e.target.value)
                  }
                  value={data?.sub_major_kode}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Major Name"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText("sub_major_name", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("sub_major_name", e.target.value)
                  }
                  value={data?.sub_major_name}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Aktivitas Kode"
                  icon={
                    <ButtonIcon
                      handleClick={() =>
                        handleChangeText("sub_aktivitas_kode", "")
                      }
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("sub_aktivitas_kode", e.target.value)
                  }
                  value={data?.sub_aktivitas_kode}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Aktivitas Name"
                  icon={
                    <ButtonIcon
                      handleClick={() =>
                        handleChangeText("sub_aktivitas_name", "")
                      }
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("sub_aktivitas_name", e.target.value)
                  }
                  value={data?.sub_aktivitas_name}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Aktivitas Kode"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText("aktivitas_kode", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("aktivitas_kode", e.target.value)
                  }
                  value={data?.aktivitas_kode}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Aktivitas Name"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText("aktivitas_name", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) =>
                    handleChangeText("aktivitas_name", e.target.value)
                  }
                  value={data?.aktivitas_name}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Branch"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText("branch", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChangeText("branch", e.target.value)}
                  value={data?.branch}
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Orgeh"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleChangeText("orgeh", "")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={(e) => handleChangeText("orgeh", e.target.value)}
                  value={data?.orgeh}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterTableOverview;
