import { Card, Select, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { UserSKAISelect } from "../../commons";
import { useForm } from "react-hook-form";
import { setSearchParam } from "@/slices/pat/projectOverviewSlice";
import { useSelector, useDispatch } from "react-redux";

const CardFilterProjectOverview = ({ openFilter }) => {
  const dispatch = useDispatch();
  const projectOverviewState = useSelector(
    (state) => state.projectOverview.searchParam
  );

  const { control } = useForm();

  const onChangeUserSKAI = (e) => {
    dispatch(
      setSearchParam({ ...projectOverviewState, status_approver: e?.pn })
    );
  };

  const handleStatusPAT = (e) => {
    dispatch(setSearchParam({ ...projectOverviewState, status_pat: e.value }));
  };

  const handleYear = (e) => {
    dispatch(setSearchParam({ ...projectOverviewState, year: e.target.value }));
  };

  const handleProjectName = (e) => {
    dispatch(
      setSearchParam({ ...projectOverviewState, project_name: e.target.value })
    );
  };

  const setNullYear = () => {
    dispatch(setSearchParam({ ...projectOverviewState, year: "" }));
  };

  const setNullProjectName = () => {
    dispatch(setSearchParam({ ...projectOverviewState, project_name: "" }));
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
                    <button
                      className="justify-center"
                      onClick={setNullProjectName}
                    >
                      <span>
                        <IconClose size="large" />
                      </span>
                    </button>
                  }
                  onChange={handleProjectName}
                  value={projectOverviewState.project_name}
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
                    <button className="justify-center" onClick={setNullYear}>
                      <span>
                        <IconClose size="large" />
                      </span>
                    </button>
                  }
                  onChange={handleYear}
                  value={projectOverviewState.year}
                />
              </div>
              <div className="w-1/2">
                <UserSKAISelect control={control} change={onChangeUserSKAI} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  );
};

export default CardFilterProjectOverview;
