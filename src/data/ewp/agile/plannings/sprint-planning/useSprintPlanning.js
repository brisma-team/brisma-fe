import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSprintPlanning = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/sprint_planning/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sprintPlanning: data,
    sprintPlanningError: error,
    sprintPlanningMutate: mutate,
    sprintPlanningIsLoading: isLoading,
  };
};

export default useSprintPlanning;
