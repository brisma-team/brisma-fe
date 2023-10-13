import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowEWP = (type, params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/workflow?sub_modul_id=${id}&sub_modul=${type}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowEWP: data,
    workflowEWPError: error,
    workflowEWPMutate: mutate,
    workflowEWPIsLoading: isLoading,
  };
};

export default useWorkflowEWP;
