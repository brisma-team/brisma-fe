import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSprintExecution = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sprintExecution: data,
    sprintExecutionError: error,
    sprintExecutionMutate: mutate,
    sprintExecutionIsLoading: isLoading,
  };
};

export default useSprintExecution;
