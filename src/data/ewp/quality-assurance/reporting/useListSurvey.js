import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useListSurvey = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/reporting/list_survey/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    listSurvey: data,
    listSurveyError: error,
    listSurveyMutate: mutate,
    listSurveyIsLoading: isLoading,
  };
};

export default useListSurvey;
