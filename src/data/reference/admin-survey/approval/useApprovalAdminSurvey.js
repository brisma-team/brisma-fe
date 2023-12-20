import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useApprovalAdminSurvey = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/approval`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    approvalAdminSurvey: data,
    approvalAdminSurveyError: error,
    approvalAdminSurveyMutate: mutate,
    approvalAdminSurveyIsLoading: isLoading,
  };
};

export default useApprovalAdminSurvey;
