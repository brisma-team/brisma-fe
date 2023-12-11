import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkflowSurvey = (type, params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/workflow?sub_modul_id=${id}&sub_modul=${type}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workflowSurvey: data,
    workflowSurveyError: error,
    workflowSurveyMutate: mutate,
    workflowSurveyIsLoading: isLoading,
  };
};

export default useWorkflowSurvey;
