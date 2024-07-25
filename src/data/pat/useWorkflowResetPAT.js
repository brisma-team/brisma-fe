import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowResetPAT = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/request-reset/workflow?reset_pat_id=${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowReset: data,
    workflowResetError: error,
    workflowResetMutate: mutate,
    workflowResetIsLoading: isLoading,
  };
};

export default useWorkflowResetPAT;
