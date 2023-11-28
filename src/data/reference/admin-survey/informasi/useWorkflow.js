import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflow = (params) => {
  const { sub_modul, sub_modul_id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/workflow?sub_modul=${sub_modul}&sub_modul_id=${sub_modul_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflow: data,
    workflowError: error,
    workflowMutate: mutate,
    workflowIsLoading: isLoading,
  };
};

export default useWorkflow;
