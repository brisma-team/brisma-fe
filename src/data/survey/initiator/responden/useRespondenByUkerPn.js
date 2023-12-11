import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRespondenByUkerPnSurvey = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/responden_uker/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    respondenByUkerPnSurvey: data,
    respondenByUkerPnSurveyError: error,
    respondenByUkerPnSurveyMutate: mutate,
    respondenByUkerPnSurveyIsLoading: isLoading,
  };
};

export default useRespondenByUkerPnSurvey;
