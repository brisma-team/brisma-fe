import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkingPaperTaskList = (params) => {
  const { id, task_type } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/working_paper/tasking/list/${id}?task_type=${task_type}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workingPaperTaskList: data,
    workingPaperTaskListError: error,
    workingPaperTaskListMutate: mutate,
    workingPaperTaskListIsLoading: isLoading,
  };
};

export default useWorkingPaperTaskList;
