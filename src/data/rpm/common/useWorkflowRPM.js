import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowRPM = (params) => {
  const { id, type } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/workflow?sub_modul_id=${id}&sub_modul=${type}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowRPM: data,
    workflowRPMError: error,
    workflowRPMMutate: mutate,
    workflowRPMIsLoading: isLoading,
  };
};

export default useWorkflowRPM;
