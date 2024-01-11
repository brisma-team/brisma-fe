import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowSurveyExtensionRequest = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow?sub_modul_id=${id}&sub_modul=catatan_perpanjangan`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowSurveyExtensionRequest: data,
    workflowSurveyExtensionRequestError: error,
    workflowSurveyExtensionRequestMutate: mutate,
    workflowSurveyExtensionRequestIsLoading: isLoading,
  };
};

export default useWorkflowSurveyExtensionRequest;
