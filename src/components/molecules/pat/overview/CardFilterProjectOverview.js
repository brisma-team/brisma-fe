import { ButtonIcon, Card, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { CustomSelect, PekerjaSelect } from "../../commons";

const CardFilterProjectOverview = ({ openFilter, filter, setFilter }) => {
  const handleStatusPAT = (e) => {
    setFilter({ ...filter, status_pat: { kode: e.value, nama: e.label } });
  };

  const handleYear = (e) => {
    setFilter({ ...filter, year: e.target.value });
  };

  const handleProjectName = (e) => {
    setFilter({ ...filter, project_name: e.target.value });
  };

  const handleStatusApprover = (e) => {
    setFilter({ ...filter, status_approver: e.value });
  };

  const handleResetFilter = (props) => {
    setFilter({ ...filter, [props]: "" });
  };

  return (
    openFilter && (
      <div className="mt-4">
        <Card>
          <div className="px-2">
            <div className="flex items-center m-2 w-[30rem] gap-3">
              <div className="w-1/2">
                <TextInput
                  placeholder="Nama Proyek"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleResetFilter("project_name")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={handleProjectName}
                  value={filter.project_name}
                />
              </div>
              <div className="w-1/2">
                <CustomSelect
                  optionValue={[
                    { label: "Final", value: "Final" },
                    { label: "On Progress", value: "On_Progress" },
                    { label: "On Approver", value: "On_Approver" },
                    { label: "On Addendum", value: "On_Addendum" },
                  ]}
                  customIcon={
                    <ButtonIcon
                      handleClick={() => handleResetFilter("status_pat")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  selectedValue={
                    filter.status_pat
                      ? {
                          label: filter.status_pat.nama,
                          value: filter.status_pat,
                        }
                      : ""
                  }
                  placeholder="Status PAT"
                  handleChange={handleStatusPAT}
                  isSearchable={false}
                />
              </div>
            </div>
            <div className="flex items-center m-2 w-[30rem] gap-3">
              <div className="w-1/2">
                <TextInput
                  placeholder="Tahun"
                  icon={
                    <ButtonIcon
                      handleClick={() => handleResetFilter("year")}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={handleYear}
                  value={filter.year}
                />
              </div>
              <div className="w-1/2">
                <PekerjaSelect
                  handleChange={handleStatusApprover}
                  selectedValue={
                    filter?.status_approver
                      ? {
                          label: filter?.status_approver?.name,
                          value: filter?.status_approver,
                        }
                      : ""
                  }
                  placeholder={"Status Approver"}
                  customIcon={
                    <ButtonIcon
                      handleClick={() => handleResetFilter("status_approver")}
                      icon={<IconClose size="large" />}
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

export default CardFilterProjectOverview;
