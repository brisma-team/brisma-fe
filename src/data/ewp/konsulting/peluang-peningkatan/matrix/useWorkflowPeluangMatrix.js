import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowMatrix = (params) => {
  const { id, type } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow?sub_modul_id=${id}&sub_modul=${type}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowMatrixData: data,
    workflowMatrixError: error,
    workflowMatrixMutate: mutate,
    workflowMatrixIsLoading: isLoading,
  };
};

export default useWorkflowMatrix;
