import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowSurveyTerminateRequest = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow?sub_modul_id=${id}&sub_modul=catatan_pemberhentian`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowSurveyTerminateRequest: data,
    workflowSurveyTerminateRequestError: error,
    workflowSurveyTerminateRequestMutate: mutate,
    workflowSurveyTerminateRequestIsLoading: isLoading,
  };
};

export default useWorkflowSurveyTerminateRequest;
