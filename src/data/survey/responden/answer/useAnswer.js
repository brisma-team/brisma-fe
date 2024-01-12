import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAnswerSurvey = (params) => {
  const { id, pn } = params;
  let query = "";
  if (pn) query = `?pn=${pn}`;

  const path = `${process.env.NEXT_PUBLIC_API_URL_SURVEY}/survey_responden/kuesioner/jawaban/${id}${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    answerSurvey: data,
    answerSurveyError: error,
    answerSurveyMutate: mutate,
    answerSurveyIsLoading: isLoading,
  };
};

export default useAnswerSurvey;
