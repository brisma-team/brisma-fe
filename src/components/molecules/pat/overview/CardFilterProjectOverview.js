import { ButtonIcon, Card, Select, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { PekerjaSelect } from "../../commons";

const CardFilterProjectOverview = ({ openFilter, filter, setFilter }) => {
  const handleChangePekerja = (e) => {
    setFilter({ ...filter, status_approver: e.value.pn });
  };

  const handleStatusPAT = (e) => {
    setFilter({ ...filter, status_pat: e?.value });
  };

  const handleYear = (e) => {
    setFilter({ ...filter, year: e.target.value });
  };

  const handleProjectName = (e) => {
    setFilter({ ...filter, project_name: e.target.value });
  };

  const setNullYear = () => {
    setFilter({ ...filter, year: "" });
  };

  const setNullProjectName = () => {
    setFilter({ ...filter, project_name: "" });
  };

  return (
    openFilter && (
      <div>
        <Card>
          <div className="px-2">
            <div className="flex m-2 w-[26rem] gap-4">
              <div className="w-1/2">
                <TextInput
                  placeholder="Nama Proyek"
                  icon={
                    <ButtonIcon
                      handleClick={setNullProjectName}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={handleProjectName}
                  value={filter.project_name}
                />
              </div>
              <div className="w-1/2">
                <Select
                  optionValue={[
                    { label: "Final", value: "Final" },
                    { label: "On Progress", value: "On_Progress" },
                    { label: "On Approver", value: "On_Approver" },
                    { label: "On Addendum", value: "On_Addendum" },
                  ]}
                  placeholder="Status PAT"
                  onChange={handleStatusPAT}
                  isSearchable={false}
                />
              </div>
            </div>
            <div className="flex m-2 w-[26rem] gap-4">
              <div className="w-1/2">
                <TextInput
                  placeholder="Tahun"
                  icon={
                    <ButtonIcon
                      handleClick={setNullYear}
                      icon={<IconClose size="large" />}
                    />
                  }
                  onChange={handleYear}
                  value={filter.year}
                />
              </div>
              <div className="w-1/2">
                <PekerjaSelect handleChange={handleChangePekerja} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterProjectOverview;
