import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSurveyType = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_jenis_survey/all`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    surveyType: data,
    surveyTypeError: error,
    surveyTypeMutate: mutate,
    surveyTypeIsLoading: isLoading,
  };
};

export default useSurveyType;
