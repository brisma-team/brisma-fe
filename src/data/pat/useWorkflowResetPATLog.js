import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowResetPATLog = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/request-reset/workflow/log?reset_pat_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowResetLog: data,
    workflowResetLogError: error,
    workflowResetLogMutate: mutate,
    workflowResetLogIsLoading: isLoading,
  };
};

export default useWorkflowResetPATLog;
