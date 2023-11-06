import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import CustomSelect from "@/components/molecules/commons/CustomSelect";

const CardFilterAssignment = ({ showFilter, data, handleChangeFilter }) => {
  return (
    showFilter && (
      <div className="max-w-fit mt-3">
        <Card>
          <div className="flex gap-3 py-1 px-3">
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Aktivitas Kode"
                  onChange={(e) =>
                    handleChangeFilter("sub_aktivitas_kode", e.target.value)
                  }
                  value={data.sub_aktivitas_kode}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() =>
                        handleChangeFilter("sub_aktivitas_kode", "")
                      }
                    />
                  }
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Aktivitas Name"
                  onChange={(e) =>
                    handleChangeFilter("sub_aktivitas_name", e.target.value)
                  }
                  value={data.sub_aktivitas_name}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() =>
                        handleChangeFilter("sub_aktivitas_name", "")
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Major Kode"
                  onChange={(e) =>
                    handleChangeFilter("sub_major_kode", e.target.value)
                  }
                  value={data.sub_major_kode}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() =>
                        handleChangeFilter("sub_major_kode", "")
                      }
                    />
                  }
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Sub-Major Name"
                  onChange={(e) =>
                    handleChangeFilter("sub_major_name", e.target.value)
                  }
                  value={data.sub_major_name}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() =>
                        handleChangeFilter("sub_major_name", "")
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Risk Issue Kode"
                  onChange={(e) =>
                    handleChangeFilter("risk_issue_kode", e.target.value)
                  }
                  value={data.risk_issue_kode}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() =>
                        handleChangeFilter("risk_issue_kode", "")
                      }
                    />
                  }
                />
              </div>
              <div className="w-48">
                <TextInput
                  placeholder="Risk Issue Name"
                  onChange={(e) =>
                    handleChangeFilter("risk_issue_name", e.target.value)
                  }
                  value={data.risk_issue_name}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() =>
                        handleChangeFilter("risk_issue_name", "")
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-48">
                <TextInput
                  placeholder="Risk ID"
                  onChange={(e) => handleChangeFilter("mcr_id", e.target.value)}
                  value={data.mcr_id}
                  icon={
                    <ButtonIcon
                      icon={<IconClose size="medium" />}
                      handleClick={() => handleChangeFilter("mcr_id", "")}
                    />
                  }
                />
              </div>
              <div className="w-48">
                <CustomSelect
                  handleChange={(e) =>
                    handleChangeFilter("risk_assigned", e.value)
                  }
                  isSearchable={false}
                  selectedValue={
                    data.risk_assigned
                      ? {
                          label: data.risk_assigned,
                          value: data.risk_assigned,
                        }
                      : null
                  }
                  placeholder={"Risk Assigned"}
                  optionValue={[
                    { label: "Completed", value: "Completed" },
                    { label: "Uncompleted", value: "Uncompleted" },
                  ]}
                  customIcon={
                    <ButtonIcon
                      icon={<IconClose />}
                      handleClick={() =>
                        handleChangeFilter("risk_assigned", "")
                      }
                    />
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterAssignment;
