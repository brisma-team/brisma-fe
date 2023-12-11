import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRespondenByPnSurvey = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/responden/pn/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    respondenByPnSurvey: data,
    respondenByPnSurveyError: error,
    respondenByPnSurveyMutate: mutate,
    respondenByPnSurveyIsLoading: isLoading,
  };
};

export default useRespondenByPnSurvey;
