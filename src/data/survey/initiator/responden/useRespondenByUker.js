import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useRespondenByUkerSurvey = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey/uker/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    respondenByUkerSurvey: data,
    respondenByUkerSurveyError: error,
    respondenByUkerSurveyMutate: mutate,
    respondenByUkerSurveyIsLoading: isLoading,
  };
};

export default useRespondenByUkerSurvey;
